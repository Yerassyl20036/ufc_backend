import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fight } from './fight.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  location: string;

  @OneToMany(() => Fight, fight => fight.event)
  fights: Fight[];
}