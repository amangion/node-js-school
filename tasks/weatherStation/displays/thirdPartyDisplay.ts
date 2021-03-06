import { AbstractDisplay } from './abstractDisplay';

export class ThirdPartyDisplay extends AbstractDisplay {
    display(): void {
        console.log(`Third party display: temperature=${this.temperature} humidity=${this.humidity} pressure=${this.pressure}`);
    }
}