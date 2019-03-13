import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Length } from 'class-validator';
import { User } from './user';

@Entity("books")
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 80
    })
    @Length(5, 80)
    name: string;

    @Column({
        length: 200
    })
    @Length(10, 200)
    description: string;

    @Column({
        type: "date",
        nullable: false
    })
    date: Date;

    @ManyToOne(type => User, user => user.books, {
        nullable: false
    })
    user: User;
}
