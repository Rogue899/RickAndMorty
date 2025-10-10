import { useState } from 'react';
import './LocationFilterBar.scss';

interface LocationFilterBarProps {
  onFilterChange: (filters: { name?: string; type?: string; dimension?: string }) => void;
  initialFilters?: { name?: string; type?: string; dimension?: string };
}

function LocationFilterBar({ onFilterChange, initialFilters = {} }: LocationFilterBarProps) {
  const [name, setName] = useState(initialFilters.name || '');
  const [type, setType] = useState(initialFilters.type || '');
  const [dimension, setDimension] = useState(initialFilters.dimension || '');

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
          <label htmlFor="type-input">Type</label>
          <input
            id="type-input"
            type="text"
            placeholder="e.g., Planet, Space station..."
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="dimension-input">Dimension</label>
          <input
            id="dimension-input"
            type="text"
            placeholder="e.g., C-137, unknown..."
            value={dimension}
            onChange={(e) => setDimension(e.target.value)}
            className="filter-input"
          />
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

