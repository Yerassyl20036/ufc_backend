import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Fighter } from './fighter.entity';
import { WeightClass } from './weight-class.entity';

@ObjectType()
@Entity()
export class Ranking {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter)
  fighter: Fighter;

  @Field(() => WeightClass)
  @ManyToOne(() => WeightClass)
  weightClass: WeightClass;

  @Field(() => Int)
  @Column()
  rank: number;

  @Field(() => Date)
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}