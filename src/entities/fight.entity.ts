import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Event } from './event.entity';
import { WeightClass } from './weight-class.entity';
import { FightResult } from './fight-result.entity';

@Entity()
export class Fight {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, event => event.fights)
  event: Event;

  @Column()
  roundCount: number;

  @ManyToOne(() => WeightClass, weightClass => weightClass.fights)
  weightClass: WeightClass;

  @OneToMany(() => FightResult, fightResult => fightResult.fight)
  fightResults: FightResult[];

  @Column()
  method: string;

  @Column({ nullable: true })
  duration: string;
}