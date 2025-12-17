import {
    Sun,
    CloudSun,
    Cloud,
    CloudFog,
    CloudDrizzle,
    CloudRain,
    CloudSnow,
    CloudLightning,
    Moon
} from 'lucide-react';

export const getWeatherInfo = (code: number, isDay: boolean = true) => {
    // WMO Weather interpretation codes (WW)
    // https://open-meteo.com/en/docs

    // 0: Clear sky
    if (code === 0) {
        return {
            label: 'Clear Sky',
            icon: isDay ? Sun : Moon,
            color: isDay ? 'text-yellow-400' : 'text-slate-400'
        };
    }

    // 1, 2, 3: Mainly clear, partly cloudy, and overcast
    if ([1, 2, 3].includes(code)) {
        return {
            label: code === 1 ? 'Mainly Clear' : code === 2 ? 'Partly Cloudy' : 'Overcast',
            icon: isDay && code === 1 ? CloudSun : Cloud,
            color: 'text-gray-200'
        };
    }

    // 45, 48: Fog
    if ([45, 48].includes(code)) {
        return { label: 'Foggy', icon: CloudFog, color: 'text-slate-300' };
    }

    // 51, 53, 55: Drizzle
    if ([51, 53, 55].includes(code)) {
        return { label: 'Drizzle', icon: CloudDrizzle, color: 'text-blue-300' };
    }

    // 61, 63, 65: Rain
    if ([61, 63, 65].includes(code)) {
        return { label: 'Rain', icon: CloudRain, color: 'text-blue-400' };
    }

    // 71, 73, 75: Snow fall
    if ([71, 73, 75].includes(code)) {
        return { label: 'Snow', icon: CloudSnow, color: 'text-sky-100' };
    }

    // 80, 81, 82: Rain showers
    if ([80, 81, 82].includes(code)) {
        return { label: 'Rain Showers', icon: CloudRain, color: 'text-blue-400' };
    }

    // 95, 96, 99: Thunderstorm
    if ([95, 96, 99].includes(code)) {
        return { label: 'Thunderstorm', icon: CloudLightning, color: 'text-purple-400' };
    }

    // Default
    return { label: 'Unknown', icon: Cloud, color: 'text-gray-400' };
};

export const formatTemp = (temp: number) => Math.round(temp);
