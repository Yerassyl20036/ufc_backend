import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Fighter } from './fighter.entity';

@Entity()
export class FighterStats {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Fighter, fighter => fighter.stats)
  @JoinColumn()
  fighter: Fighter;

  @Column({ default: 0 })
  wins: number;

  @Column({ default: 0 })
  losses: number;

  @Column({ default: 0 })
  draws: number;

  @Column({ default: 0 })
  knockouts: number;

  @Column({ default: 0 })
  submissions: number;

  @Column({ default: 0 })
  decisions: number;
}