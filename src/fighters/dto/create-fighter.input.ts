import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

@InputType()
export class CreateFighterInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  nickname?: string;

  @Field({ nullable: true })
  birthDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  nationality?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  heightCm?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  reachCm?: number;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  weightClassId: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  teamId?: number;
}