import { useState } from 'react';
import './EpisodeFilterBar.scss';

interface EpisodeFilterBarProps {
  onFilterChange: (filters: { name?: string; episode?: string }) => void;
  initialFilters?: { name?: string; episode?: string };
}

function EpisodeFilterBar({ onFilterChange, initialFilters = {} }: EpisodeFilterBarProps) {
  const [name, setName] = useState(initialFilters.name || '');
  const [selectedEpisode, setSelectedEpisode] = useState(initialFilters.episode || '');

  // All 51 episodes with their names (according to Rick and Morty API docs)
  const allEpisodes = [
    // Season 1 (11 episodes)
    { code: 'S01E01', name: 'Pilot' },
    { code: 'S01E02', name: 'Lawnmower Dog' },
    { code: 'S01E03', name: 'Anatomy Park' },
    { code: 'S01E04', name: 'M. Night Shaym-Aliens!' },
    { code: 'S01E05', name: 'Meeseeks and Destroy' },
    { code: 'S01E06', name: 'Rick Potion #9' },
    { code: 'S01E07', name: 'Raising Gazorpazorp' },
    { code: 'S01E08', name: 'Rixty Minutes' },
    { code: 'S01E09', name: 'Something Ricked This Way Comes' },
    { code: 'S01E10', name: 'Close Rick-counters of the Rick Kind' },
    { code: 'S01E11', name: 'Ricksy Business' },
    // Season 2 (10 episodes)
    { code: 'S02E01', name: 'A Rickle in Time' },
    { code: 'S02E02', name: 'Mortynight Run' },
    { code: 'S02E03', name: 'Auto Erotic Assimilation' },
    { code: 'S02E04', name: 'Total Rickall' },
    { code: 'S02E05', name: 'Get Schwifty' },
    { code: 'S02E06', name: 'The Ricks Must Be Crazy' },
    { code: 'S02E07', name: 'Big Trouble in Little Sanchez' },
    { code: 'S02E08', name: 'Interdimensional Cable 2: Tempting Fate' },
    { code: 'S02E09', name: 'Look Who\'s Purging Now' },
    { code: 'S02E10', name: 'The Wedding Squanchers' },
    // Season 3 (10 episodes)
    { code: 'S03E01', name: 'The Rickshank Rickdemption' },
    { code: 'S03E02', name: 'Rickmancing the Stone' },
    { code: 'S03E03', name: 'Pickle Rick' },
    { code: 'S03E04', name: 'Vindicators 3: The Return of Worldender' },
    { code: 'S03E05', name: 'The Whirly Dirly Conspiracy' },
    { code: 'S03E06', name: 'Rest and Ricklaxation' },
    { code: 'S03E07', name: 'The Ricklantis Mixup' },
    { code: 'S03E08', name: 'Morty\'s Mind Blowers' },
    { code: 'S03E09', name: 'The ABC\'s of Beth' },
    { code: 'S03E10', name: 'The Rickchurian Mortydate' },
    // Season 4 (10 episodes)
    { code: 'S04E01', name: 'Edge of Tomorty: Rick Die Rickpeat' },
    { code: 'S04E02', name: 'The Old Man and the Seat' },
    { code: 'S04E03', name: 'One Crew Over the Crewcoo\'s Morty' },
    { code: 'S04E04', name: 'Claw and Hoarder: Special Ricktim\'s Morty' },
    { code: 'S04E05', name: 'Rattlestar Ricklactica' },
    { code: 'S04E06', name: 'Never Ricking Morty' },
    { code: 'S04E07', name: 'Promortyus' },
    { code: 'S04E08', name: 'The Vat of Acid Episode' },
    { code: 'S04E09', name: 'Childrick of Mort' },
    { code: 'S04E10', name: 'Star Mort Rickturn of the Jerri' },
    // Season 5 (10 episodes)
    { code: 'S05E01', name: 'Mort Dinner Rick Andre' },
    { code: 'S05E02', name: 'Mortyplicity' },
    { code: 'S05E03', name: 'A Rickconvenient Mort' },
    { code: 'S05E04', name: 'Rickdependence Spray' },
    { code: 'S05E05', name: 'Amortycan Grickfitti' },
    { code: 'S05E06', name: 'Rick & Morty\'s Thanksploitation Spectacular' },
    { code: 'S05E07', name: 'Gotron Jerrysis Rickvangelion' },
    { code: 'S05E08', name: 'Rickternal Friendshine of the Spotless Mort' },
    { code: 'S05E09', name: 'Forgetting Sarick Mortshall' },
    { code: 'S05E10', name: 'Rickmurai Jack' },
  ];

  const handleEpisodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const episodeCode = e.target.value;
    setSelectedEpisode(episodeCode);
    onFilterChange({ name, episode: episodeCode });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ name, episode: selectedEpisode });
  };

  const handleClearFilters = () => {
    setName('');
    setSelectedEpisode('');
    onFilterChange({ name: '', episode: '' });
  };

  const hasActiveFilters = name || selectedEpisode;

  return (
    <div className="filter-bar episode-filter-bar">
      <form onSubmit={handleSearch} className="filter-form">
        <div className="filter-group">
          <label htmlFor="episode-name-search">Search Episodes</label>
          <input
            id="episode-name-search"
            type="text"
            placeholder="Search by name..."
            value={name}
            onChange={handleNameChange}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="episode-select">Filter by Episode</label>
          <select
            id="episode-select"
            value={selectedEpisode}
            onChange={handleEpisodeChange}
            className="filter-select"
          >
            <option value="">All Episodes (51)</option>
            {allEpisodes.map((ep) => (
              <option key={ep.code} value={ep.code}>
                {ep.code} - {ep.name}
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

export default EpisodeFilterBar;

