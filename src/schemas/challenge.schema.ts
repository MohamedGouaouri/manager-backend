import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ _id: false })
export class FunctionInputDef {
  @Prop({ required: true })
  name: string;

  @Prop()
  type?: string;
}

export const FunctionInputDefSchema =
  SchemaFactory.createForClass(FunctionInputDef);

@Schema({ _id: false })
export class FunctionInputValue {
  @Prop({ required: true })
  name: string;

  @Prop()
  value?: object;
}

export const FunctionInputValueSchema =
  SchemaFactory.createForClass(FunctionInputValue);

@Schema()
export class TestCase {
  @Prop({ required: true })
  weight: number;

  @Prop({ type: [FunctionInputValueSchema] })
  inputs: FunctionInputValue[];

  @Prop()
  output: object;
}

export const TestCaseSchema = SchemaFactory.createForClass(TestCase);

@Schema()
export class CodeText {
  @Prop({ required: true })
  text: string;

  @Prop({ default: 'js' })
  language: string;
}

export const CodeTextSchema = SchemaFactory.createForClass(CodeText);

@Schema()
export class Code {
  @Prop({ required: true })
  function_name: string;

  @Prop({ type: [CodeTextSchema] })
  code_text: CodeText[];

  @Prop({ type: [FunctionInputDefSchema] })
  inputs: FunctionInputDef[];
}

export const CodeSchema = SchemaFactory.createForClass(Code);

@Schema()
export class Challenge {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  level: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Manager' })
  creator: MongooseSchema.Types.ObjectId;

  @Prop({ type: CodeSchema })
  code: Code;

  @Prop({ type: [TestCaseSchema] })
  tests: TestCase[];
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
