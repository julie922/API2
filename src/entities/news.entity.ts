import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column('text')
  contenu: string;

  @Column()
  auteur: string;

  @CreateDateColumn()
  datePublication: Date;
}
