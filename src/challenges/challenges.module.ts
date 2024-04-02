import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { Challenges } from './challenges';

@Module({
  controllers: [ChallengesController],
  providers: [Challenges],
})
export class ChallengesModule {}
