import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

@InputType()
export class CreateEventInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @Field()
  @IsNotEmpty()
  @IsString()
  location: string;
}