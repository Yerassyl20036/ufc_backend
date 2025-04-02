import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FightResult } from '../entities/fight-result.entity';
import { RankingsService } from '../rankings/rankings.service';

@Injectable()
export class FightResultsService {
  constructor(
    @InjectRepository(FightResult)
    private fightResultRepository: Repository<FightResult>,
    private rankingsService: RankingsService,
  ) {}

  async create(createFightResultInput: any): Promise<FightResult> {
    const fightResult = await this.fightResultRepository.save(createFightResultInput);
    
    if (fightResult.isWinner) {
      await this.rankingsService.updateRankingsAfterFight(fightResult);
    }
    
    return fightResult;
  }
}