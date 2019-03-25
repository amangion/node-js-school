import { WeatherData } from './weatherData';
import { CurrentConditionsDisplay } from './displays/currentConditionsDisplay';
import { ThirdPartyDisplay } from './displays/thirdPartyDisplay';
import { StatisticsDisplay } from './displays/statisticsDisplay';
import { ForecastDisplay } from './displays/forecastDisplay';

const weatherData = new WeatherData();

weatherData.registerObserver(new CurrentConditionsDisplay());
weatherData.registerObserver(new StatisticsDisplay());
weatherData.registerObserver(new ThirdPartyDisplay());
const forecastDisplay = new ForecastDisplay();
weatherData.registerObserver(forecastDisplay);


weatherData.setMeasurements(29, 65, 745);
weatherData.removeObserver(forecastDisplay);
console.log('---');
weatherData.setMeasurements(39, 70, 760);
