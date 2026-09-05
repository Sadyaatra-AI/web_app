import React from 'react';
import { Filter, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Region, FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalCount: number;
}

const REGIONS: Region[] = ['All', 'South', 'North', 'West', 'East', 'International'];

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
    <div id="sanctuary-filter-bar" className="w-full space-y-4 mb-8">
      {/* Primary Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#1e1b19] border border-[#2d2927]">
        {/* Left: Region Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          <span className="text-xs font-mono-code text-[#cfc4c6]/70 uppercase mr-2 shrink-0 hidden sm:inline">
            Territory:
          </span>
          {REGIONS.map((r) => (
            <button
              key={r}
              id={`filter-region-${r.toLowerCase()}`}
              onClick={() => setFilters((prev) => ({ ...prev, region: r }))}
              className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all whitespace-nowrap ${
                filters.region === r
                  ? 'bg-[#9EB094] text-[#100e0c] font-semibold'
                  : 'bg-[#151311] border border-[#2d2927] text-[#cfc4c6] hover:text-[#e8e1de]'
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
            className="bg-[#151311] border border-[#2d2927] rounded-xl px-3 py-1.5 text-xs text-[#e8e1de] outline-none focus:border-[#9EB094]"
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
            className="bg-[#151311] border border-[#2d2927] rounded-xl px-3 py-1.5 text-xs text-[#e8e1de] outline-none focus:border-[#9EB094]"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 bg-[#151311] border border-[#2d2927] rounded-xl px-3 py-1.5 text-xs text-[#e8e1de]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#9EB094] shrink-0" />
            <select
              id="filter-sort-select"
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as FilterState['sortBy'],
                }))
              }
              className="bg-transparent outline-none text-xs text-[#e8e1de] cursor-pointer"
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
              className="p-1.5 rounded-xl bg-[#221f1d] hover:bg-[#2d2927] text-xs text-[#ffb4ab] flex items-center gap-1 transition-colors"
              title="Reset all filters"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between px-2 text-xs font-mono-code text-[#cfc4c6]/70">
        <span>Showing {totalCount} curated sanctuaries</span>
        {filters.search && <span>Filtered by: "{filters.search}"</span>}
      </div>
    </div>
  );
};
