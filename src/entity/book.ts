import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user';
import { IsDate } from 'class-validator';

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

    @ManyToOne(type => User, user => user.books, { nullable: true })
    @JoinColumn({ name: 'owner_id' })
    owner: User
}
