
import { DisplayElement } from './interfaces/displayElement';
import { AbstractDisplay } from './abstractDisplay';

export class CurrentConditionsDisplay extends AbstractDisplay implements DisplayElement {
    display(): void {
        console.log(`Current condition display: temperature=${this.temperature} humidity=${this.humidity} pressure=${this.pressure}`);
    }
}