import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FighterStats } from '../entities/fighter-stats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FighterStats])],
  exports: [TypeOrmModule]
})
export class FighterStatsModule {}