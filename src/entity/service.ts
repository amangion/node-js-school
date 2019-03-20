import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Step } from './step';

@Entity('Services')
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Step, step => step.service, {
        cascade: true,
    })
    steps: Step[];
}
