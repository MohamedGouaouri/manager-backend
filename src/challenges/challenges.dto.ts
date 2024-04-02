import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FunctionInputValDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: string;
}

export class TestCaseDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  weight: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  inputs: FunctionInputValDto[];

  @IsNotEmpty()
  @ApiProperty()
  output: object;
}
export class FunctionInputDefDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: string;
}

export class CodeTextDto {
  text: string;
  language: string;
}
export class CodeDto {
  function_name: string;
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  code_text: CodeTextDto[];

  @IsArray()
  @ValidateNested({ each: true })
  inputs: FunctionInputDefDto[];
}

export class CreateChallengeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  category: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  level: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: CodeDto;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @ApiProperty()
  tests: TestCaseDto[];
}

export class UpdateChallengeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  category?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  level?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code?: CodeDto;
  tests?: TestCaseDto[];
}

export class QueryChallengeDto {
  title?: string;
  category?: string;
  level?: string;
  creator?: string;
}
