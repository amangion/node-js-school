import { Observer } from './displays/interfaces/observer';
import EventEmitter = NodeJS.EventEmitter;

export interface Subject {
    registerObserver(o: Observer): void;

    removeObserver(o: Observer): void;

    notifyObservers(): void;
}