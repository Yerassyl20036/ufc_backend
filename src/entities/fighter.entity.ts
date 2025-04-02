import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { WeightClass } from './weight-class.entity';
import { Team } from './team.entity';
import { FighterStats } from './fighter-stats.entity';
import { FightResult } from './fight-result.entity';
import { Ranking } from './ranking.entity';

@ObjectType()
@Entity()
export class Fighter {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  fullName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nickname: string;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  birthDate: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nationality: string;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', nullable: true })
  heightCm: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', nullable: true })
  reachCm: number;

  @ManyToOne(() => WeightClass, weightClass => weightClass.fighters)
  weightClass: WeightClass;

  @ManyToOne(() => Team, team => team.fighters, { nullable: true })
  team: Team;

  @OneToOne(() => FighterStats, stats => stats.fighter)
  stats: FighterStats;

  @OneToMany(() => FightResult, fightResult => fightResult.fighter)
  fightResults: FightResult[];

  @OneToMany(() => Ranking, ranking => ranking.fighter)
  rankings: Ranking[];
}