import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { WeightClass } from './weight-class.entity';
import { Team } from './team.entity';
import { FighterStats } from './fighter-stats.entity';
import { FightResult } from './fight-result.entity';

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

  @Field(() => Date, { nullable: true })
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

  @Field(() => WeightClass)
  @ManyToOne(() => WeightClass, weightClass => weightClass.fighters)
  weightClass: WeightClass;

  @Field(() => Team, { nullable: true })
  @ManyToOne(() => Team, team => team.fighters)
  team: Team;

  @Field(() => FighterStats, { nullable: true })
  @OneToOne(() => FighterStats, stats => stats.fighter)
  stats: FighterStats;

  @Field(() => [FightResult], { nullable: true })
  @OneToMany(() => FightResult, fightResult => fightResult.fighter)
  fightResults: FightResult[];
}