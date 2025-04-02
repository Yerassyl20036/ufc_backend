import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from '../entities/fighter.entity';
import { FightersResolver } from './fighters.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter])],
  providers: [FightersResolver],
})
export class FightersModule {}