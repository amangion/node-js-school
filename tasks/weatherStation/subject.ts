import { Observer } from './displays/interfaces/observer';

export interface Subject {
    registerObserver(o: Observer): void;

    removeObserver(o: Observer): void;

    notifyObservers(): void;
}