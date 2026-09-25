import React from 'react';
import { X, ArrowUpDown } from 'lucide-react';
import { Region, FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalCount: number;
}

const REGIONS: Region[] = ['All', 'North', 'South', 'West', 'East', 'Central', 'International'];

const MOODS = [
  'All Moods',
  'Slow & Peaceful',
  'Adventurous',
  'Romantic',
  'Cultural',
  'Wellness',
  'Solo Reflection',
];

const TYPES = [
  'All Types',
  'Beach',
  'Mountains',
  'Heritage',
  'Nature',
  'Spiritual',
  'Slow Travel',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  totalCount,
}) => {
  const isFiltered =
    filters.region !== 'All' ||
    filters.mood !== 'All Moods' ||
    filters.type !== 'All Types' ||
    filters.search !== '' ||
    filters.maxBudget < 100000;

  const handleResetFilters = () => {
    setFilters({
      search: '',
      region: 'All',
      maxBudget: 100000,
      mood: 'All Moods',
      type: 'All Types',
      duration: 'all',
      sortBy: 'recommended',
    });
  };

  return (
    <div id="destination-filter-bar" className="w-full space-y-4 mb-8">
      {/* Primary Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-[#2b2728]/10 shadow-sm">
        {/* Left: Region Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          <span className="text-xs font-mono-code text-[#4a4542] uppercase mr-2 shrink-0 hidden sm:inline font-semibold">
            Territory:
          </span>
          {REGIONS.map((r) => (
            <button
              key={r}
              id={`filter-region-${r.toLowerCase()}`}
              onClick={() => setFilters((prev) => ({ ...prev, region: r }))}
              className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all whitespace-nowrap ${
                filters.region === r
                  ? 'bg-[#8c956a] text-white font-semibold shadow-xs'
                  : 'bg-[#f8f6f1] border border-[#2b2728]/10 text-[#4a4542] hover:text-[#2b2728]'
              }`}
            >
              {r === 'All' ? 'All' : r}
            </button>
          ))}
        </div>

        {/* Right: Dropdowns & Sort */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap justify-between md:justify-end">
          {/* Mood Select */}
          <select
            id="filter-mood-select"
            value={filters.mood}
            onChange={(e) => setFilters((prev) => ({ ...prev, mood: e.target.value }))}
            className="bg-[#f8f6f1] border border-[#2b2728]/10 rounded-xl px-3 py-1.5 text-xs text-[#2b2728] outline-none focus:border-[#8c956a]"
          >
            {MOODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          {/* Type Select */}
          <select
            id="filter-type-select"
            value={filters.type}
            onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
            className="bg-[#f8f6f1] border border-[#2b2728]/10 rounded-xl px-3 py-1.5 text-xs text-[#2b2728] outline-none focus:border-[#8c956a]"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 bg-[#f8f6f1] border border-[#2b2728]/10 rounded-xl px-3 py-1.5 text-xs text-[#2b2728]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#8c956a] shrink-0" />
            <select
              id="filter-sort-select"
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as FilterState['sortBy'],
                }))
              }
              className="bg-transparent outline-none text-xs text-[#2b2728] cursor-pointer"
            >
              <option value="recommended">Curated Match</option>
              <option value="budget-asc">Budget: Low to High</option>
              <option value="budget-desc">Budget: High to Low</option>
            </select>
          </div>

          {/* Clear Filters */}
          {isFiltered && (
            <button
              id="filter-reset-btn"
              onClick={handleResetFilters}
              className="p-1.5 px-3 rounded-xl bg-[#fff5f2] hover:bg-[#ffece6] text-xs text-[#a66f5b] flex items-center gap-1 transition-colors border border-[#a66f5b]/30 font-medium"
              title="Reset all filters"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between px-2 text-xs font-mono-code text-[#4a4542]">
        <span>Showing {totalCount} curated destinations</span>
        {filters.search && <span>Filtered by: "{filters.search}"</span>}
      </div>
    </div>
  );
};
