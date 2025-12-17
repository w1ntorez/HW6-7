import React from 'react';
import type { WeatherData } from '../types/weather';
import { getWeatherInfo, formatTemp } from '../utils/weatherUtils';
import { Wind, Droplets, Thermometer } from 'lucide-react';

interface CurrentWeatherProps {
    data: WeatherData['current'];
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
    const { label, icon: WeatherIcon } = getWeatherInfo(data.weatherCode, data.isDay);

    return (
        <div className="glass-card p-14 w-full">
            {/* Main Content - Centered */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-16">

                {/* Weather Icon */}
                <div className="relative">
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl scale-150" />
                    <WeatherIcon className="w-36 h-36 md:w-44 md:h-44 text-white/90 relative z-10 drop-shadow-2xl" />
                </div>

                {/* Temperature & Condition */}
                <div className="flex flex-col items-center md:items-start gap-3">
                    <div className="flex items-baseline gap-2">
                        <span className="text-9xl md:text-[10rem] font-extralight tracking-tighter text-white">
                            {formatTemp(data.temperature)}
                        </span>
                        <span className="text-5xl font-light text-white/40">°C</span>
                    </div>
                    <p className="text-2xl text-white/60 font-medium mt-2">{label}</p>
                </div>

                {/* Stats - Vertical divider on desktop */}
                <div className="flex gap-16 md:flex-col md:gap-12 md:pl-20 md:border-l md:border-white/10">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                            <Wind className="w-8 h-8 text-white/60" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-2xl font-bold text-white">{data.windSpeed}</span>
                            <span className="text-base text-white/40">km/h</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                            <Droplets className="w-8 h-8 text-white/60" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-2xl font-bold text-white">{data.humidity}%</span>
                            <span className="text-base text-white/40">Humidity</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                            <Thermometer className="w-8 h-8 text-white/60" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-2xl font-bold text-white">{formatTemp(data.apparentTemperature)}°</span>
                            <span className="text-base text-white/40">Feels like</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
