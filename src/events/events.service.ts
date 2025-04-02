import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Event } from '../entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async create(createEventInput: CreateEventInput): Promise<Event> {
    const event = this.eventRepository.create(createEventInput);
    return await this.eventRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find({
      relations: ['fights'],
    });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['fights', 'fights.fightResults', 'fights.weightClass'],
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: number, updateEventInput: UpdateEventInput): Promise<Event> {
    const event = await this.findOne(id);
    Object.assign(event, updateEventInput);
    return await this.eventRepository.save(event);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.eventRepository.delete(id);
    return result.affected > 0;
  }

  async getUpcomingEvents(): Promise<Event[]> {
    return await this.eventRepository.find({
      where: {
        date: MoreThan(new Date()),
      },
      relations: ['fights', 'fights.weightClass'],
      order: {
        date: 'ASC',
      },
    });
  }
}