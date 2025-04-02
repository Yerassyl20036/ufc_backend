import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fighter } from './fighter.entity';

@ObjectType()
@Entity()
export class Team {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location: string;

  @Field(() => [Fighter], { nullable: true })
  @OneToMany(() => Fighter, fighter => fighter.team)
  fighters: Fighter[];
}