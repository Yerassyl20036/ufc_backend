import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Event } from './event.entity';
import { WeightClass } from './weight-class.entity';
import { FightResult } from './fight-result.entity';

@ObjectType()
@Entity()
export class Fight {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Event)
  @ManyToOne(() => Event, event => event.fights)
  event: Event;

  @Field(() => Int)
  @Column()
  roundCount: number;

  @Field(() => WeightClass)
  @ManyToOne(() => WeightClass, weightClass => weightClass.fights)
  weightClass: WeightClass;

  @Field(() => [FightResult], { nullable: true })
  @OneToMany(() => FightResult, fightResult => fightResult.fight)
  fightResults: FightResult[];

  @Field()
  @Column()
  method: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  duration: string;

  @Field(() => Date)
  @Column({ type: 'timestamp' })
  date: Date;
}