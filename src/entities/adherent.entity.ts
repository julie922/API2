import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Match } from './match.entity';

export enum Role {
  COACH = 'coach',
  CONTRIBUTEUR = 'contributeur',
  JOUEUR = 'joueur',
}

@Entity()
export class Adherent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ unique: true })
  email: string;

  @Column()
  motDePasse: string;

  @Column({ type: 'text', default: Role.JOUEUR })
  role: Role;

  @Column({ default: false })
  valide: boolean;

  @CreateDateColumn()
  dateInscription: Date;

  @ManyToMany(() => Match, (match) => match.participants)
  @JoinTable({ name: 'adherent_matchs' })
  matchs: Match[];
}
