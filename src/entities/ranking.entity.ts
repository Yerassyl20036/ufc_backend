import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn } from 'typeorm';
import { WeightClass } from './weight-class.entity';
import { Fighter } from './fighter.entity';

@Entity()
export class Ranking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WeightClass, weightClass => weightClass.rankings)
  weightClass: WeightClass;

  @ManyToOne(() => Fighter, fighter => fighter.rankings)
  fighter: Fighter;

  @Column()
  rank: number;

  @UpdateDateColumn()
  updatedAt: Date;
}