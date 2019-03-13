import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Length, IsNumberString } from 'class-validator';
import { User } from './user';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 80
    })
    @Length(10, 80)
    name: string;

    @Column({
        length: 300
    })
    @Length(10, 300)
    description: string;

    @Column({
        length: 13
    })

    @Length(13, 13)
    @IsNumberString()
    date: string;

    @ManyToOne(type => User, user => user.books, { onDelete: 'CASCADE' })
    user: User;
}
