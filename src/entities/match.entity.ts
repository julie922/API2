import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Adherent } from './adherent.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  equipeAdverse: string;

  @Column()
  date: string;

  @Column()
  lieu: string;

  @Column({ nullable: true })
  score: string;

  @ManyToMany(() => Adherent, (adherent) => adherent.matchs)
  participants: Adherent[];
}
