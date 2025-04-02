import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FightResult } from '../entities/fight-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FightResult])],
  exports: [TypeOrmModule]
})
export class FightResultsModule {}