import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Length, MaxLength } from 'class-validator';
import { User } from './user';

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 80
    })
    @Length(5, 80)
    name: string;

    @Column({
        type: 'text'
    })
    @MaxLength(4096)
    description: string;

    @ManyToOne(type => User, user => user.books)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    date: Date;
}
