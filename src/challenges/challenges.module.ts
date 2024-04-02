import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { Challenges } from './challenges';
import { MongooseModule } from '@nestjs/mongoose';
import { Challenge, ChallengeSchema } from 'src/schemas/challenge.schema';
import { Coder, CoderSchema } from 'src/schemas/coder.schema';
import { Manager, ManagerSchema } from 'src/schemas/manager.schema';
import { Submission, SubmissionSchema } from 'src/schemas/submission.schema';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ChallengesController],
  providers: [Challenges],
  imports: [
    MongooseModule.forFeature([
      { name: Challenge.name, schema: ChallengeSchema },
      { name: Coder.name, schema: CoderSchema },
      { name: Manager.name, schema: ManagerSchema },
      { name: Submission.name, schema: SubmissionSchema },
    ]),
    AuthModule,
    JwtModule.register({
      secret: 'secret',
    }),
  ],
})
export class ChallengesModule {}
