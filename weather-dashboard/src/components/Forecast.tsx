import React from 'react';
import type { DailyForecast, HourlyForecast } from '../types/weather';
import { getWeatherInfo, formatTemp } from '../utils/weatherUtils';

interface ForecastProps {
    daily: DailyForecast[];
    hourly: HourlyForecast[];
}

export const Forecast: React.FC<ForecastProps> = ({ daily, hourly }) => {
    return (
        <div className="flex flex-col gap-6">

            {/* Weekly Forecast - 7 days in a single row */}
            <div className="glass-card p-12">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-10 pl-2">
                    7-Day Forecast
                </h3>
                <div className="grid grid-cols-7 gap-6">
                    {daily.slice(0, 7).map((day, idx) => {
                        const { icon: Icon, label } = getWeatherInfo(day.weatherCode, true);
                        const date = new Date(day.time);
                        const dayName = idx === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });

                        return (
                            <div
                                key={idx}
                                title={label}
                                className="flex flex-col items-center gap-4 py-6 px-2 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-default"
                            >
                                <span className="text-sm font-semibold text-white/70">{dayName}</span>
                                <Icon className="w-10 h-10 text-white/90" />
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-2xl font-bold text-white">{formatTemp(day.maxTemp)}°</span>
                                    <span className="text-base text-white/40">{formatTemp(day.minTemp)}°</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Hourly Forecast - Full scroll with all 24 hours visible */}
            <div className="glass-card p-12">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-10 pl-4">
                    Hourly Forecast
                </h3>
                <div className="overflow-x-auto pb-8">
                    <div className="flex gap-4" style={{ width: 'max-content' }}>
                        {hourly.slice(0, 24).map((hour, idx) => {
                            const date = new Date(hour.time);
                            const isDay = date.getHours() > 6 && date.getHours() < 20;
                            const { icon: Icon, label } = getWeatherInfo(hour.weatherCode, isDay);
                            const timeLabel = idx === 0 ? 'Now' : `${date.getHours()}:00`;

                            return (
                                <div
                                    key={idx}
                                    title={label}
                                    className="flex flex-col items-center justify-between gap-3 py-4 px-4 min-w-[5.5rem] rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-default"
                                >
                                    <span className="text-xs font-semibold text-white/50">{timeLabel}</span>
                                    <Icon className="w-8 h-8 text-white/80" />
                                    <span className="text-xl font-bold text-white">{formatTemp(hour.temperature)}°</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
