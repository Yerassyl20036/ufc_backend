import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fight } from '../entities/fight.entity';
import { FightsService } from './fights.service';
import { FightsResolver } from './fights.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Fight])],
  providers: [FightsService, FightsResolver],
  exports: [FightsService]
})
export class FightsModule {}