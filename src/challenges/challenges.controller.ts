import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  CreateChallengeDto,
  QueryChallengeDto,
  UpdateChallengeDto,
} from './challenges.dto';
import { Challenges } from './challenges';
import { Response } from 'express';
import { User } from 'src/auth/roles';
import { AuthenticatedUser, Roles } from 'src/auth/decorators/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('challenges')
@Roles('manager')
@UseGuards(AuthGuard)
export class ChallengesController {
  constructor(private readonly challengesService: Challenges) {}
  @Get()
  async findAll(
    @Query() filters: QueryChallengeDto,
    @Res() res: Response,
    @AuthenticatedUser() user: User,
  ) {
    const response = await this.challengesService.getAll(user, filters);
    return res
      .status(response.getHttpStatus())
      .json(response.getHttpResponse());
  }

  @Get(':id')
  async findOne(
    @AuthenticatedUser() user: User,
    @Param('id') challengeId: string,
    @Res() res: Response,
  ) {
    const response = await this.challengesService.getChallengeById(
      challengeId,
      user,
    );
    return res
      .status(response.getHttpStatus())
      .json(response.getHttpResponse());
  }

  @Post()
  async create(
    @AuthenticatedUser() user: User,
    @Body() createChallengeDto: CreateChallengeDto,
    @Res() res: Response,
  ) {
    const response = await this.challengesService.createChallenge(
      createChallengeDto,
      user.id,
    );
    return res
      .status(response.getHttpStatus())
      .json(response.getHttpResponse());
  }

  @Put(':id')
  async update(
    @Param('id') challengeId: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
    @Res() res: Response,
  ) {
    const response = await this.challengesService.updateChallenge(
      challengeId,
      updateChallengeDto,
    );
    return res
      .status(response.getHttpStatus())
      .json(response.getHttpResponse());
  }

  @Delete(':id')
  async remove(@Param('id') challengeId: string, @Res() res: Response) {
    const response = await this.challengesService.deleteChallenge(challengeId);
    return res
      .status(response.getHttpStatus())
      .json(response.getHttpResponse());
  }
}
