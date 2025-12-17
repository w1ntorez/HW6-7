export interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface CurrentWeather {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  humidity: number;
  apparentTemperature: number;
  isDay: boolean;
}

export interface DailyForecast {
  time: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  sunrise: string;
  sunset: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  weatherCode: number;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
  hourly: HourlyForecast[];
}
