import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';
import { CreateFighterInput } from './create-fighter.input';

@InputType()
export class UpdateFighterInput extends PartialType(OmitType(CreateFighterInput, [])) {
  // Remove the id field from here as it will be provided as a separate argument
}