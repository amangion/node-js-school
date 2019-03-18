import { Subject } from './subject';
import { Observer } from './displays/interfaces/observer';
import { EventEmitter } from 'events';


export const UPDATE_EVENT = 'update_event';

export class WeatherDataEmitter extends EventEmitter implements Subject {

    private temperature: number;
    private humidity: number;
    private pressure: number;

    public notifyObservers(): void {
        this.emit(UPDATE_EVENT, this.temperature, this.humidity, this.pressure);
    }

    public registerObserver(observer: Observer): void {
        this.on(UPDATE_EVENT, observer.getHandler());
    }

    public removeObserver(observer: Observer): void {
        this.off(UPDATE_EVENT, observer.getHandler());
    }

    public setMeasurements(temperature, humidity, pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.notifyObservers();
    }


}