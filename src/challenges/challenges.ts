import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, User } from 'src/auth/roles';
import { Challenge } from 'src/schemas/challenge.schema';
import {
  CreateChallengeDto,
  QueryChallengeDto,
  UpdateChallengeDto,
} from './challenges.dto';
import {
  ServiceResponseFailure,
  ServiceResponseSuccess,
} from 'src/common/services.response';
import {
  DBOperationException,
  ResourceNotFoundException,
  ResourceRestriction,
} from 'src/common/exceptions';
import { Manager } from 'src/schemas/manager.schema';

@Injectable()
export class Challenges {
  private logger = new Logger('ChallengesService');
  constructor(
    @InjectModel(Challenge.name)
    private readonly challengeModel: Model<Challenge>,
    @InjectModel(Manager.name)
    private readonly managerModel: Model<Manager>,
  ) {}

  async getAll(user: User, filters: QueryChallengeDto) {
    const { id, role } = user;
    const { category } = filters;
    let challenges: any;
    let query = {};
    if (category && category !== 'All') {
      query = { ...query, category };
    }
    switch (role) {
      case Role.Manager:
        query = { ...query, creator: id };
        challenges = await this.challengeModel
          .find(query)
          .select(['title', 'category', 'description', 'level', 'creator'])
          .exec();
        return new ServiceResponseSuccess(challenges || []);

      default:
        return new ServiceResponseFailure(
          new ResourceRestriction('Only managers are allowed to use this app'),
        );
    }
  }

  async createChallenge(challenge: CreateChallengeDto, creator: string) {
    try {
      const newChallenge = new this.challengeModel(challenge);
      const manager = await this.managerModel.findById(creator);
      if (!manager) {
        return new ServiceResponseSuccess(
          new ResourceNotFoundException('Manager not found'),
        );
      }
      newChallenge.creator = manager._id;
      await newChallenge.save();
      return new ServiceResponseSuccess(newChallenge, true);
    } catch (e) {
      this.logger.error(e);
      return new ServiceResponseSuccess(new DBOperationException());
    }
  }

  async updateChallenge(challegenId: string, challenge: UpdateChallengeDto) {
    try {
      const updatedChallenge = await this.challengeModel.findByIdAndUpdate(
        challegenId,
        {
          $set: challenge,
        },
        {
          new: true,
        },
      );
      return new ServiceResponseSuccess(updatedChallenge);
    } catch (error) {
      this.logger.error(error);
      return new ServiceResponseFailure(new DBOperationException());
    }
  }

  async getChallengeById(challengeId: string, user: User) {
    try {
      const challenge = await this.challengeModel
        .findById(challengeId, '-__v')
        .exec();
      if (!challenge)
        return new ServiceResponseFailure(
          new ResourceNotFoundException('Challenge not found'),
        );
      switch (user.role) {
        case Role.Manager:
          return new ServiceResponseSuccess(challenge);

        default:
          return new ServiceResponseFailure(
            new ResourceRestriction(
              'Only managers are allowed to use this app',
            ),
          );
      }
    } catch (e) {
      this.logger.error(e);
      return new ServiceResponseFailure(new DBOperationException());
    }
  }

  async getChallengesByCategory(category: string) {
    try {
      const challenges = await this.challengeModel.find({ category });
      return new ServiceResponseSuccess(challenges);
    } catch (e) {
      this.logger.error(e);
      return new ServiceResponseFailure(new DBOperationException());
    }
  }
  async deleteChallenge(challengeId: string) {
    try {
      const deleteResult = await this.challengeModel.deleteOne({
        _id: challengeId,
      });
      if (deleteResult.deletedCount == 1) {
        return new ServiceResponseSuccess('Challenge deleted');
      }
      return new ServiceResponseFailure(new DBOperationException());
    } catch (e) {
      this.logger.error(e);
      return new ServiceResponseFailure(new DBOperationException());
    }
  }
}
