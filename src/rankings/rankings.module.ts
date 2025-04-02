import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranking } from '../entities/ranking.entity';
import { Fighter } from '../entities/fighter.entity';
import { RankingsService } from './rankings.service';
import { RankingsResolver } from './rankings.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ranking, Fighter])
  ],
  providers: [RankingsService, RankingsResolver],
  exports: [RankingsService]
})
export class RankingsModule {}