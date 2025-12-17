import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import type { GeoLocation } from '../types/weather';
import { searchCities } from '../services/weatherService';

interface SearchBarProps {
    onCitySelect: (city: GeoLocation) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<GeoLocation[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length >= 2) {
                setIsLoading(true);
                try {
                    const locations = await searchCities(query);
                    setResults(locations);
                    setIsOpen(true);
                } catch (error) {
                    console.error("Search failed", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 350);
        return () => clearTimeout(timer);
    }, [query]);

    const clearSearch = () => {
        setQuery('');
        setResults([]);
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-sm">
            <div className="relative flex items-center">
                {/* Search Icon - Fixed position with proper spacing */}
                <Search className="absolute left-5 text-white/50 w-5 h-5 pointer-events-none" />

                <input
                    type="text"
                    className="w-full bg-white/10 backdrop-blur-md border border-white/15 text-white placeholder-white/40 rounded-2xl py-4 pl-14 pr-12 text-base font-medium outline-none focus:bg-white/15 focus:border-white/25 transition-all"
                    placeholder="Search location..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => query.length >= 2 && setIsOpen(true)}
                />

                {/* Clear button */}
                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-5 text-white/40 hover:text-white/70 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Dropdown */}
            {isOpen && results.length > 0 && (
                <div className="absolute right-0 left-0 mt-3 bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 animate-scale-in origin-top">
                    {results.map((city) => (
                        <button
                            key={city.id}
                            className="w-full text-left px-5 py-4 hover:bg-white/10 transition-colors flex items-center gap-4 border-b border-white/5 last:border-0"
                            onClick={() => {
                                onCitySelect(city);
                                setQuery(`${city.name}`);
                                setIsOpen(false);
                            }}
                        >
                            <MapPin className="w-5 h-5 text-white/50 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-white text-base">{city.name}</div>
                                <div className="text-sm text-white/40 truncate">
                                    {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Loading state */}
            {isOpen && isLoading && (
                <div className="absolute right-0 left-0 mt-3 bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center text-white/40 text-base">
                    Searching...
                </div>
            )}

            {/* No results */}
            {isOpen && !isLoading && query.length >= 2 && results.length === 0 && (
                <div className="absolute right-0 left-0 mt-3 bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center text-white/40 text-base">
                    No locations found
                </div>
            )}
        </div>
    );
};
