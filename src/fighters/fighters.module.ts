import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from '../entities/fighter.entity';
import { FightResult } from '../entities/fight-result.entity';
import { FightersService } from './fighters.service';
import { FightersResolver } from './fighters.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fighter, FightResult])
  ],
  providers: [FightersService, FightersResolver],
  exports: [FightersService]
})
export class FightersModule {}