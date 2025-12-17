import { useEffect, useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { Forecast } from './components/Forecast';
import type { GeoLocation } from './types/weather';
import { Loader2, MapPin } from 'lucide-react';

function App() {
  const { weather, loading, error, fetchWeather } = useWeather();
  const [location, setLocation] = useState<GeoLocation | null>(null);

  useEffect(() => {
    const defaultLocation = {
      id: 2643743,
      name: 'London',
      latitude: 51.5085,
      longitude: -0.1257,
      country: 'United Kingdom'
    };
    setLocation(defaultLocation);
    fetchWeather(defaultLocation.latitude, defaultLocation.longitude);
  }, [fetchWeather]);

  useEffect(() => {
    if (!weather) return;

    const code = weather.current.weatherCode;
    const isDay = weather.current.isDay;

    let gradient = 'var(--bg-gradient-day)';
    if (!isDay) gradient = 'var(--bg-gradient-night)';
    else if (code >= 95 || code >= 60) gradient = 'var(--bg-gradient-rain)';
    else if (code >= 51 || code >= 45) gradient = 'var(--bg-gradient-cloudy)';

    document.body.style.background = gradient;
  }, [weather]);

  const handleCitySelect = (city: GeoLocation) => {
    setLocation(city);
    fetchWeather(city.latitude, city.longitude);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-10">
      {/* Centered Container */}
      <div className="w-full max-w-6xl flex flex-col gap-8">

        {/* Header Row: City Name & Search */}
        <header className="flex justify-between items-center gap-8">
          {/* City Name Badge */}
          {location && (
            <div className="glass-card px-14 py-8 flex items-center gap-8">
              <MapPin className="w-8 h-8 text-white/70" />
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-bold text-white">{location.name}</span>
                <span className="text-lg text-white/50">{location.country}</span>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <SearchBar onCitySelect={handleCitySelect} />
        </header>

        {/* Error State */}
        {error && (
          <div className="p-6 rounded-2xl bg-red-500/15 border border-red-400/20 text-white/90 text-center text-lg animate-fade-in">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="glass-card p-24 flex flex-col justify-center items-center gap-6">
            <Loader2 className="w-14 h-14 animate-spin text-white/40" />
            <span className="text-white/40 text-lg">Loading weather data...</span>
          </div>
        )}

        {/* Weather Content */}
        {!loading && weather && (
          <div className="flex flex-col gap-8 animate-fade-in">
            {/* Today's Weather */}
            <CurrentWeather data={weather.current} />

            {/* Forecasts */}
            <Forecast daily={weather.daily} hourly={weather.hourly} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
