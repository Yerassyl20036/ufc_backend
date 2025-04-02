import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fighter } from './fighter.entity';
import { Ranking } from './ranking.entity';
import { Fight } from './fight.entity';


@ObjectType()
@Entity()
export class WeightClass {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Float)
  @Column('float')
  weightLimit: number;

  @Field(() => [Fighter], { nullable: true })
  @OneToMany(() => Fighter, fighter => fighter.weightClass)
  fighters: Fighter[];

  @Field(() => [Ranking], { nullable: true })
  @OneToMany(() => Ranking, ranking => ranking.weightClass)
  rankings: Ranking[];

  @Field(() => [Fight], { nullable: true })
  @OneToMany(() => Fight, fight => fight.weightClass)
  fights: Fight[];
}