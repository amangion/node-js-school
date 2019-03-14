import {
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Entity,
  Column,
} from 'typeorm';
import { IsDateString } from 'class-validator';

import { User } from './user';


@Entity({ name: 'Books'})
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('date')
  @IsDateString()
  date: string;

  @Column()
  description: string;

  @Column({ nullable: false })
  ownerId: number;

  @JoinColumn()
  @ManyToOne(type => User, user => user.books, {
    nullable: false
  })
  owner: User;
}
