import { useState, useEffect } from 'react';
import { getLocationFilterOptions } from '../services/filterDataService';
import './LocationFilterBar.scss';

interface LocationFilterBarProps {
  onFilterChange: (filters: { name?: string; type?: string; dimension?: string }) => void;
  initialFilters?: { name?: string; type?: string; dimension?: string };
}

function LocationFilterBar({ onFilterChange, initialFilters = {} }: LocationFilterBarProps) {
  const [name, setName] = useState(initialFilters.name || '');
  const [type, setType] = useState(initialFilters.type || '');
  const [dimension, setDimension] = useState(initialFilters.dimension || '');
  const [filterOptions, setFilterOptions] = useState<{ types: string[]; dimensions: string[] }>({ 
    types: [], 
    dimensions: [] 
  });
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const options = await getLocationFilterOptions();
        setFilterOptions(options);
      } catch (error) {
        console.error('Failed to load filter options:', error);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ name, type, dimension });
  };

  const handleClearFilters = () => {
    setName('');
    setType('');
    setDimension('');
    onFilterChange({ name: '', type: '', dimension: '' });
  };

  const hasActiveFilters = name || type || dimension;

  return (
    <div className="filter-bar location-filter-bar">
      <form onSubmit={handleSearch} className="filter-form">
        <div className="filter-group">
          <label htmlFor="location-name-search">Search Locations</label>
          <input
            id="location-name-search"
            type="text"
            placeholder="Search by name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="type-select">Type</label>
          <select
            id="type-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="filter-select"
            disabled={loadingOptions}
          >
            <option value="">All Types</option>
            {filterOptions.types.map((typeOption) => (
              <option key={typeOption} value={typeOption}>
                {typeOption}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="dimension-select">Dimension</label>
          <select
            id="dimension-select"
            value={dimension}
            onChange={(e) => setDimension(e.target.value)}
            className="filter-select"
            disabled={loadingOptions}
          >
            <option value="">All Dimensions</option>
            {filterOptions.dimensions.map((dimOption) => (
              <option key={dimOption} value={dimOption}>
                {dimOption}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-actions">
          <button type="submit" className="btn-primary">
            Search
          </button>
          {hasActiveFilters && (
            <button type="button" onClick={handleClearFilters} className="btn-secondary">
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default LocationFilterBar;

