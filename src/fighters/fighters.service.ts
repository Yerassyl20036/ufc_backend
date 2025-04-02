import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from '../entities/fighter.entity';
import { FightResult } from '../entities/fight-result.entity';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';

@Injectable()
export class FightersService {
  constructor(
    @InjectRepository(Fighter)
    private fighterRepository: Repository<Fighter>,
    @InjectRepository(FightResult)
    private fightResultRepository: Repository<FightResult>,
  ) {}

  async create(createFighterInput: CreateFighterInput): Promise<Fighter> {
    const fighter = this.fighterRepository.create(createFighterInput);
    return await this.fighterRepository.save(fighter);
  }

  async findAll(): Promise<Fighter[]> {
    return await this.fighterRepository.find({
      relations: ['stats', 'weightClass', 'team'],
    });
  }

  async findOne(id: number): Promise<Fighter> {
    const fighter = await this.fighterRepository.findOne({
      where: { id },
      relations: ['stats', 'weightClass', 'team', 'fightResults'],
    });
    if (!fighter) {
      throw new NotFoundException(`Fighter with ID ${id} not found`);
    }
    return fighter;
  }

  async update(id: number, updateFighterInput: UpdateFighterInput): Promise<Fighter> {
    const fighter = await this.findOne(id);
    Object.assign(fighter, updateFighterInput);
    return await this.fighterRepository.save(fighter);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.fighterRepository.delete(id);
    return result.affected > 0;
  }

  async getFighterStatistics(id: number) {
    const fighter = await this.fighterRepository.findOne({
      where: { id },
      relations: ['stats', 'fightResults', 'fightResults.fight', 'fightResults.fight.event'],
    });

    if (!fighter) {
      throw new NotFoundException(`Fighter with ID ${id} not found`);
    }

    const fightResults = await this.fightResultRepository.find({
      where: { fighter: { id } },
      relations: ['fight', 'fight.event'],
      order: { 
        fight: { 
          event: { 
            date: 'DESC' 
          } 
        } 
      },
      take: 5,
    });

    const stats = {
      fighter,
      totalFights: fighter.fightResults.length,
      wins: fighter.fightResults.filter(fr => fr.isWinner).length,
      losses: fighter.fightResults.filter(fr => !fr.isWinner).length,
      knockouts: fighter.fightResults.filter(fr => fr.isWinner && fr.method === 'KO/TKO').length,
      submissions: fighter.fightResults.filter(fr => fr.isWinner && fr.method === 'Submission').length,
      recentFights: fightResults,
    };

    return stats;
  }
}