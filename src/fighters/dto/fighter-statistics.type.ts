import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Fighter } from '../../entities/fighter.entity';
import { FightResult } from '../../entities/fight-result.entity';

@ObjectType()
export class FighterStatistics {
  @Field(() => Fighter)
  fighter: Fighter;

  @Field(() => Int)
  totalFights: number;

  @Field(() => Int)
  wins: number;

  @Field(() => Int)
  losses: number;

  @Field(() => Int)
  knockouts: number;

  @Field(() => Int)
  submissions: number;

  @Field(() => [FightResult])
  recentFights: FightResult[];
}