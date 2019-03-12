import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Length } from 'class-validator';
import { User } from './user';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 80
  })
  @Length(3, 80)
  name: string;

  @Column({
    length: 80
  })
  @Length(10, 80)
  description: string;

  @ManyToOne(type => User, user => user.books)
  user: User;
}
