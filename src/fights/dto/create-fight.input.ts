import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

@InputType()
export class CreateFightInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  eventId: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  roundCount: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  weightClassId: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  method: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  duration?: string;
}