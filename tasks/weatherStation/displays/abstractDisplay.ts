import { Observer } from './interfaces/observer';
import { DisplayElement } from './interfaces/displayElement';

export abstract class AbstractDisplay implements Observer, DisplayElement {
    protected temperature: number;
    protected humidity: number;
    protected pressure: number;

    abstract display();

    public update(temperature, humidity, pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.display();
    }
}
