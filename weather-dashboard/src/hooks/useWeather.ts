import { useState, useCallback } from 'react';
import type { WeatherData } from '../types/weather';
import { getWeather } from '../services/weatherService';

export const useWeather = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = useCallback(async (lat: number, lon: number) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getWeather(lat, lon);
            setWeather(data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch weather data');
            setWeather(null);
        } finally {
            setLoading(false);
        }
    }, []);

    return { weather, loading, error, fetchWeather };
};
