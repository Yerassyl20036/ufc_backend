import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Fight } from './fight.entity';
import { Fighter } from './fighter.entity';

@ObjectType()
@Entity()
export class FightResult {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Fight)
  @ManyToOne(() => Fight, fight => fight.fightResults)
  fight: Fight;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter, fighter => fighter.fightResults)
  fighter: Fighter;

  @Field()
  @Column()
  isWinner: boolean;

  @Field()
  @Column()
  method: string;

  @Field(() => Int)
  @Column()
  round: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  timeInRound: string;
}