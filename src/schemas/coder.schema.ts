import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'coders' })
export class Coder extends Document {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  about?: string;

  @Prop({ default: 0 })
  score?: number;

  @Prop({ default: '' })
  avatar_url?: string;

  @Prop({ default: false })
  is_verified?: boolean;
}

export const CoderSchema = SchemaFactory.createForClass(Coder);
