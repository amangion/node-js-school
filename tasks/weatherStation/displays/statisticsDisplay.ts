import { AbstractDisplay } from './abstractDisplay';

export class StatisticsDisplay extends AbstractDisplay {
    display(): void {
        console.log(`Statistic display: temperature=${this.temperature} humidity=${this.humidity} pressure=${this.pressure}`);
    }
}