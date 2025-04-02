import { Resolver, Query } from '@nestjs/graphql';
import { Fighter } from '../entities/fighter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(() => Fighter)
export class FightersResolver {
  constructor(
    @InjectRepository(Fighter)
    private fightersRepository: Repository<Fighter>,
  ) {}

  @Query(() => [Fighter], { name: 'fighters' })
  async getFighters() {
    return this.fightersRepository.find();
  }
}