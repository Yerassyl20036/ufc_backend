import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeightClass } from '../../entities/weight-class.entity';
import { Fighter } from '../../entities/fighter.entity';
import { Event } from '../../entities/event.entity';
import { SeedService } from './seed.service';
import { SeedCommand } from './seed.command';

@Module({
  imports: [TypeOrmModule.forFeature([WeightClass, Fighter, Event])],
  providers: [SeedService, SeedCommand],
})
export class SeedModule {}