import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import { Book } from './book';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 80
    })
    @Length(10, 80)
    name: string;

    @Column({
        length: 100
    })
    @Length(10, 100)
    @IsEmail()
    email: string;

    @OneToMany(type => Book, book => book.user)
    books: Book[];
}
