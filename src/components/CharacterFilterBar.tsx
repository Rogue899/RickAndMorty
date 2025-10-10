import { useState } from 'react';
import { CHARACTER_STATUS_OPTIONS, CHARACTER_GENDER_OPTIONS } from '../types/filters';
import { CHARACTER_SPECIES_OPTIONS, CHARACTER_TYPE_OPTIONS } from '../constants/character-data';
import './CharacterFilterBar.scss';

interface CharacterFilterBarProps {
  onFilterChange: (filters: {
    name?: string;
    status?: string;
    species?: string;
    gender?: string;
    type?: string;
  }) => void;
  initialFilters?: {
    name?: string;
    status?: string;
    species?: string;
    gender?: string;
    type?: string;
  };
}

function CharacterFilterBar({ onFilterChange, initialFilters = {} }: CharacterFilterBarProps) {
  const [name, setName] = useState(initialFilters.name || '');
  const [status, setStatus] = useState(initialFilters.status || '');
  const [species, setSpecies] = useState(initialFilters.species || '');
  const [gender, setGender] = useState(initialFilters.gender || '');
  const [type, setType] = useState(initialFilters.type || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ name, status, species, gender, type });
  };

  const handleClearFilters = () => {
    setName('');
    setStatus('');
    setSpecies('');
    setGender('');
    setType('');
    onFilterChange({ name: '', status: '', species: '', gender: '', type: '' });
  };

  const hasActiveFilters = name || status || species || gender || type;

  return (
    <div className="filter-bar character-filter-bar">
      <form onSubmit={handleSearch} className="filter-form">
        <div className="filter-group">
          <label htmlFor="character-name-search">Search Characters</label>
          <input
            id="character-name-search"
            type="text"
            placeholder="Search by name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="status-select">Status</label>
          <select
            id="status-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="filter-select"
          >
            {CHARACTER_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="species-select">Species</label>
          <select
            id="species-select"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="filter-select"
          >
            {CHARACTER_SPECIES_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="gender-select">Gender</label>
          <select
            id="gender-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="filter-select"
          >
            {CHARACTER_GENDER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="type-select">Type</label>
          <select
            id="type-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="filter-select"
          >
            {CHARACTER_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
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

export default CharacterFilterBar;

