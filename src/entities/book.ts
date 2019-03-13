import {
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Entity,
  Column,
} from 'typeorm';
import { IsDate } from 'class-validator';

import { User } from './user';


@Entity({ name: 'Books'})
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
      length: 100
  })
  name: string;

  @Column('date')
  @IsDate()
  date: Date;

  @Column()
  description: string;

  @ManyToOne(type => User, user => user.books, { 
    nullable: true
  })
  @JoinColumn({ name: 'owner_id' })
  owner: User;
}
