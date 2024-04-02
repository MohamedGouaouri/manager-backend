import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import {
  CreateChallengeDto,
  QueryChallengeDto,
  UpdateChallengeDto,
} from './challenges.dto';
import { Challenges } from './challenges';
import { Request, Response } from 'express';
import { User } from 'src/auth/roles';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: Challenges) {}
  @Get()
  async findAll(
    @Query() filters: QueryChallengeDto,
    @Req() req: Request & { user: User },
    @Res() res: Response,
  ) {
    const response = await this.challengesService.getAll(req.user, filters);
    return res
      .status(response.getHttpStatus())
      .json(response.getHttpResponse());
  }

  @Get(':id')
  async findOne(
    @Param('id') challengeId: string,
    @Req() req: Request & { user: User },
    @Res() res: Response,
  ) {
    const response = await this.challengesService.getChallengeById(
      challengeId,
      req.user,
    );
    return res
      .status(response.getHttpStatus())
      .json(response.getHttpResponse());
  }

  @Post()
  async create(
    @Body() createChallengeDto: CreateChallengeDto,
    @Req() req: Request & { user: User },
    @Res() res: Response,
  ) {
    const response = await this.challengesService.createChallenge(
      createChallengeDto,
      req.user.id,
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
