import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Fight } from './fight.entity';
import { Fighter } from './fighter.entity';

@Entity()
export class FightResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Fight, fight => fight.fightResults)
  fight: Fight;

  @ManyToOne(() => Fighter, fighter => fighter.fightResults)
  fighter: Fighter;

  @Column()
  isWinner: boolean;

  @Column({ nullable: true })
  method: string;

  @Column({ nullable: true })
  round: number;

  @Column({ nullable: true })
  time: string;
}