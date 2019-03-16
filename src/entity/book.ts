import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Length } from 'class-validator';
import { User } from '../entity/user';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 80
    })
    @Length(5, 80)
    name: string;

    @Column({
        length: 1000
    })
    @Length(5, 1000)
    description: string;

    @CreateDateColumn()
    date = Date;

    @ManyToOne(type => User, user => user.books)
    user: User;
}
