import { Observer } from './interfaces/Observer';
import { DisplayElement } from './interfaces/displayElement';
import { AbstractDisplay } from './abstractDisplay';

export class ForecastDisplay extends AbstractDisplay {
    display(): void {
        console.log(`Forecast display: temperature=${this.temperature} humidity=${this.humidity} pressure=${this.pressure}`);
    }
}