import { Subject } from './subject';
import { Observer } from './displays/interfaces/observer';

export class WeatherData implements Subject {
    private temperature: number;
    private humidity: number;
    private pressure: number;

    private observers: Set<Observer> = new Set();

    public notifyObservers(): void {
        this.observers.forEach(observer => observer.update(this.temperature, this.humidity, this.pressure));
    }

    public registerObserver(observer: Observer): void {
        this.observers.add(observer);
    }

    public removeObserver(observer: Observer): void {
        this.observers.delete(observer);
    }

    public setMeasurements(temperature, humidity, pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.notifyObservers();
    }
}