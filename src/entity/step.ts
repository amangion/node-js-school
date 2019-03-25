import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsPositive } from 'class-validator';
import { Service } from './service';

@Entity('Step')
export class Step {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    action: string;

    @Column()
    @IsPositive()
    queuePosition: number;

    @ManyToOne(type => Service, service => service.steps, { onDelete: 'CASCADE' })
    service: Service;
}
