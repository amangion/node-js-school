import { CurrentConditionsDisplay } from './displays/currentConditionsDisplay';
import { ThirdPartyDisplay } from './displays/thirdPartyDisplay';
import { StatisticsDisplay } from './displays/statisticsDisplay';
import { ForecastDisplay } from './displays/forecastDisplay';
import { UPDATE_EVENT, WeatherDataEmitter } from './weatherDataEmitter';

const weatherData = new WeatherDataEmitter();

weatherData.on(UPDATE_EVENT, new CurrentConditionsDisplay().getHandler());

const statisticsDisplay = new StatisticsDisplay();
statisticsDisplay.subscribe(weatherData);

weatherData.registerObserver(new ThirdPartyDisplay());

const forecastDisplay = new ForecastDisplay();
weatherData.on(UPDATE_EVENT, forecastDisplay.getHandler());


weatherData.setMeasurements(29, 65, 745);
weatherData.off(UPDATE_EVENT, forecastDisplay.getHandler());
weatherData.removeObserver(statisticsDisplay);
console.log('---');
weatherData.emit(UPDATE_EVENT, 39, 70, 760);

