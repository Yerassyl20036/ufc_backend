import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fighter } from './fighter.entity';
import { Ranking } from './ranking.entity';
import { Fight } from './fight.entity';

@Entity()
export class WeightClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Fighter, fighter => fighter.weightClass)
  fighters: Fighter[];

  @OneToMany(() => Ranking, ranking => ranking.weightClass)
  rankings: Ranking[];

  @OneToMany(() => Fight, fight => fight.weightClass)
  fights: Fight[];
}