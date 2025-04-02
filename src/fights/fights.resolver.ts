import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Fight } from '../entities/fight.entity';
import { FightsService } from './fights.service';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';

@Resolver(() => Fight)
export class FightsResolver {
  constructor(private readonly fightsService: FightsService) {}

  @Query(() => [Fight])
  fights() {
    return this.fightsService.findAll();
  }

  @Query(() => Fight)
  fight(@Args('id', { type: () => Int }) id: number) {
    return this.fightsService.findOne(id);
  }

  @Mutation(() => Fight)
  createFight(@Args('createFightInput') createFightInput: CreateFightInput) {
    return this.fightsService.create(createFightInput);
  }

  @Mutation(() => Fight)
  updateFight(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateFightInput') updateFightInput: UpdateFightInput,
  ) {
    return this.fightsService.update(id, updateFightInput);
  }

  @Mutation(() => Boolean)
  removeFight(@Args('id', { type: () => Int }) id: number) {
    return this.fightsService.remove(id);
  }
}