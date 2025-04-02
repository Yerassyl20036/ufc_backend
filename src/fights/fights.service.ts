import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fight } from '../entities/fight.entity';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';

@Injectable()
export class FightsService {
  constructor(
    @InjectRepository(Fight)
    private fightRepository: Repository<Fight>,
  ) {}

  async create(createFightInput: CreateFightInput): Promise<Fight> {
    const fight = this.fightRepository.create(createFightInput);
    return await this.fightRepository.save(fight);
  }

  async findAll(): Promise<Fight[]> {
    return await this.fightRepository.find({
      relations: ['event', 'weightClass', 'fightResults'],
    });
  }

  async findOne(id: number): Promise<Fight> {
    const fight = await this.fightRepository.findOne({
      where: { id },
      relations: ['event', 'weightClass', 'fightResults'],
    });
    if (!fight) {
      throw new NotFoundException(`Fight with ID ${id} not found`);
    }
    return fight;
  }

  async update(id: number, updateFightInput: UpdateFightInput): Promise<Fight> {
    const fight = await this.findOne(id);
    Object.assign(fight, updateFightInput);
    return await this.fightRepository.save(fight);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.fightRepository.delete(id);
    return result.affected > 0;
  }
}