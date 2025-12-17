import type { WeatherData, GeoLocation } from '../types/weather';

const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

export const searchCities = async (query: string): Promise<GeoLocation[]> => {
    if (query.length < 2) return [];

    const response = await fetch(
        `${GEO_API_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
    );

    const data = await response.json();

    if (!data.results) return [];

    return data.results.map((item: any) => ({
        id: item.id,
        name: item.name,
        latitude: item.latitude,
        longitude: item.longitude,
        country: item.country,
        admin1: item.admin1,
    }));
};

export const getWeather = async (lat: number, lon: number): Promise<WeatherData> => {
    const params = new URLSearchParams({
        latitude: lat.toString(),
        longitude: lon.toString(),
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m',
        hourly: 'temperature_2m,weather_code',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset',
        timezone: 'auto',
    });

    const response = await fetch(`${WEATHER_API_URL}?${params.toString()}`);
    const data = await response.json();

    return {
        current: {
            temperature: data.current.temperature_2m,
            weatherCode: data.current.weather_code,
            windSpeed: data.current.wind_speed_10m,
            humidity: data.current.relative_humidity_2m,
            apparentTemperature: data.current.apparent_temperature,
            isDay: data.current.is_day === 1,
        },
        daily: data.daily.time.map((time: string, index: number) => ({
            time,
            maxTemp: data.daily.temperature_2m_max[index],
            minTemp: data.daily.temperature_2m_min[index],
            weatherCode: data.daily.weather_code[index],
            sunrise: data.daily.sunrise[index],
            sunset: data.daily.sunset[index],
        })),
        hourly: data.hourly.time.slice(0, 24).map((time: string, index: number) => ({
            time,
            temperature: data.hourly.temperature_2m[index],
            weatherCode: data.hourly.weather_code[index],
        })),
    };
};
