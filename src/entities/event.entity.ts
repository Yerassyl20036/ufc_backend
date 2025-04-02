import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fight } from './fight.entity';

@ObjectType()
@Entity()
export class Event {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: 'timestamp' })
  date: Date;

  @Field()
  @Column()
  location: string;

  @Field(() => [Fight], { nullable: true })
  @OneToMany(() => Fight, fight => fight.event)
  fights: Fight[];
}