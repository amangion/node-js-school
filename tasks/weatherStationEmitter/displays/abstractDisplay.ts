import { Observer } from './interfaces/observer';
import { DisplayElement } from './interfaces/displayElement';
import EventEmitter = NodeJS.EventEmitter;
import { Subject } from '../subject';
import { UPDATE_EVENT } from '../weatherDataEmitter';

export abstract class AbstractDisplay implements Observer, DisplayElement {
    protected temperature: number;
    protected humidity: number;
    protected pressure: number;

    private handler;

    abstract display();

    public update(temperature, humidity, pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.display();
    }

    public getHandler() {
        if (!this.handler) {
            this.handler = (temperature, humidity, pressure) => this.update(temperature, humidity, pressure);
        }

        return this.handler;
    }

    public subscribe(weatherData: EventEmitter) {
        weatherData.on(UPDATE_EVENT, this.getHandler());
    }

    public unSubscribe(weatherData: EventEmitter) {
        weatherData.off(UPDATE_EVENT, this.getHandler());
    }
}
