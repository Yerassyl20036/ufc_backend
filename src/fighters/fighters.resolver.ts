import { Resolver, Query, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Fighter } from '../entities/fighter.entity';
import { FightersService } from './fighters.service';
import { FighterStatistics } from './dto/fighter-statistics.type';

@Resolver(() => Fighter)
export class FightersResolver {
  constructor(private readonly fightersService: FightersService) {}

  @Query(() => [Fighter])
  async fighters() {
    return this.fightersService.findAll();
  }

  @Query(() => Fighter)
  async fighter(@Args('id', { type: () => Int }) id: number) {
    return this.fightersService.findOne(id);
  }

  @Query(() => FighterStatistics)
  async fighterStatistics(@Args('id', { type: () => Int }) id: number) {
    return this.fightersService.getFighterStatistics(id);
  }
}