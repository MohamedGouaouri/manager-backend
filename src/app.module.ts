import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChallengesModule } from './challenges/challenges.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ChallengesModule,
    MongooseModule.forRoot('mongodb://localhost/dev'),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
