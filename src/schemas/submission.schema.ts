import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Coder } from './coder.schema';
import { Challenge, CodeText } from './challenge.schema';

@Schema()
export class Submission extends Document {
  @Prop({ type: Coder })
  coder: Coder;

  @Prop({ type: Challenge })
  challenge: Challenge;

  @Prop({ type: CodeText })
  code: CodeText;

  @Prop({ default: new Date() })
  submittedAt?: Date;

  @Prop({ default: 0 })
  grade?: number;

  @Prop({ default: false })
  isPassed?: boolean;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
