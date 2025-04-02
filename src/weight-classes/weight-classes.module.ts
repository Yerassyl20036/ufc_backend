import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeightClass } from '../entities/weight-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeightClass])],
  exports: [TypeOrmModule]
})
export class WeightClassesModule {}