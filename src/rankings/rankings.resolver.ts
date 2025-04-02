import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Ranking } from '../entities/ranking.entity';
import { RankingsService } from './rankings.service';

@Resolver(() => Ranking)
export class RankingsResolver {
  constructor(private readonly rankingsService: RankingsService) {}

  @Query(() => [Ranking])
  async rankingsByWeightClass(@Args('weightClassId', { type: () => Int }) weightClassId: number) {
    return this.rankingsService.getRankingsByWeightClass(weightClassId);
  }
}