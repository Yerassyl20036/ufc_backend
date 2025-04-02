import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Fighter } from './fighter.entity';

@ObjectType()
@Entity()
export class FighterStats {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ default: 0 })
  wins: number;

  @Field(() => Int)
  @Column({ default: 0 })
  losses: number;

  @Field(() => Int)
  @Column({ default: 0 })
  draws: number;

  @Field(() => Int)
  @Column({ default: 0 })
  knockouts: number;

  @Field(() => Int)
  @Column({ default: 0 })
  submissions: number;

  @Field(() => Fighter)
  @OneToOne(() => Fighter, fighter => fighter.stats)
  @JoinColumn()
  fighter: Fighter;
}