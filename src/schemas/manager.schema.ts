import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'managers' })
export class Manager extends Document {
  @Prop({ required: true, unique: true })
  first_name: string;

  @Prop({ required: true, unique: true })
  last_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const ManagerSchema = SchemaFactory.createForClass(Manager);
