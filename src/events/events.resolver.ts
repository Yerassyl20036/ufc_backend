import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Event } from '../entities/event.entity';
import { EventsService } from './events.service';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Query(() => [Event])
  events() {
    return this.eventsService.findAll();
  }

  @Query(() => Event)
  event(@Args('id', { type: () => Int }) id: number) {
    return this.eventsService.findOne(id);
  }

  @Query(() => [Event])
  async upcomingEvents() {
    return this.eventsService.getUpcomingEvents();
  }

  @Mutation(() => Event)
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventsService.create(createEventInput);
  }

  @Mutation(() => Event)
  updateEvent(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
  ) {
    return this.eventsService.update(id, updateEventInput);
  }

  @Mutation(() => Boolean)
  removeEvent(@Args('id', { type: () => Int }) id: number) {
    return this.eventsService.remove(id);
  }
}