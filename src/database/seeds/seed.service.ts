import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeightClass } from '../../entities/weight-class.entity';
import { Fighter } from '../../entities/fighter.entity';
import { Event } from '../../entities/event.entity';
import { weightClassesData } from './weight-classes.seed';
import { fightersData } from './fighters.seed';
import { eventsData } from './events.seed';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(WeightClass)
    private weightClassRepository: Repository<WeightClass>,
    @InjectRepository(Fighter)
    private fighterRepository: Repository<Fighter>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async seed() {
    await this.seedWeightClasses();
    await this.seedFighters();
    await this.seedEvents();
  }

  private async seedWeightClasses() {
    for (const weightClassData of weightClassesData) {
      const exists = await this.weightClassRepository.findOne({
        where: { name: weightClassData.name },
      });
      if (!exists) {
        await this.weightClassRepository.save(weightClassData);
      }
    }
  }

  private async seedFighters() {
    for (const fighterData of fightersData) {
      const exists = await this.fighterRepository.findOne({
        where: { fullName: fighterData.fullName },
      });
      if (!exists) {
        const weightClass = await this.weightClassRepository.findOne({
          where: { id: fighterData.weightClassId },
        });
        await this.fighterRepository.save({
          ...fighterData,
          weightClass,
        });
      }
    }
  }

  private async seedEvents() {
    for (const eventData of eventsData) {
      const exists = await this.eventRepository.findOne({
        where: { name: eventData.name },
      });
      if (!exists) {
        await this.eventRepository.save(eventData);
      }
    }
  }
}