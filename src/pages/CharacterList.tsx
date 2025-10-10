import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { Character, Info } from '../types/character';
import CharacterCard from '../components/CharacterCard';
import CharacterFilterBar from '../components/CharacterFilterBar';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import Error from '../components/Error';
import './CharacterList.scss';

function CharacterList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<Info | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get filters from URL
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const nameFilter = searchParams.get('name') || '';
  const statusFilter = searchParams.get('status') || '';
  const speciesFilter = searchParams.get('species') || '';
  const genderFilter = searchParams.get('gender') || '';
  const typeFilter = searchParams.get('type') || '';

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getCharacters({ 
          page: currentPage,
          name: nameFilter || undefined,
          status: statusFilter as any || undefined,
          species: speciesFilter || undefined,
          gender: genderFilter as any || undefined,
          type: typeFilter || undefined,
        });
        
        if (!data || !data.results || data.results.length === 0) {
          setError('No characters found matching your filters');
          setCharacters([]);
          setInfo(null);
          return;
        }
        
        setCharacters(data.results);
        setInfo(data.info);
      } catch (err) {
        const error = err as Error;
        const errorMessage = error?.message?.toLowerCase().includes('nothing here') 
          ? 'No characters found matching your filters' 
          : error?.message || 'Failed to load characters';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage, nameFilter, statusFilter, speciesFilter, genderFilter, typeFilter]);

  const handlePageChange = (page: number) => {
    const newParams: Record<string, string> = { page: page.toString() };
    if (nameFilter) newParams.name = nameFilter;
    if (statusFilter) newParams.status = statusFilter;
    if (speciesFilter) newParams.species = speciesFilter;
    if (genderFilter) newParams.gender = genderFilter;
    if (typeFilter) newParams.type = typeFilter;
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (filters: {
    name?: string;
    status?: string;
    species?: string;
    gender?: string;
    type?: string;
  }) => {
    const newParams: Record<string, string> = { page: '1' };
    if (filters.name) newParams.name = filters.name;
    if (filters.status) newParams.status = filters.status;
    if (filters.species) newParams.species = filters.species;
    if (filters.gender) newParams.gender = filters.gender;
    if (filters.type) newParams.type = filters.type;
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="character-list">
      <div className="character-list-header">
        <h1>Characters</h1>
        <p className="character-count">
          {info?.count || 0} characters{info?.pages ? ` across ${info.pages} pages` : ''}
        </p>
      </div>

      <CharacterFilterBar
        onFilterChange={handleFilterChange}
        initialFilters={{
          name: nameFilter,
          status: statusFilter,
          species: speciesFilter,
          gender: genderFilter,
          type: typeFilter,
        }}
      />

      {!characters.length ? (
        <Error message="No characters found matching your filters. Try adjusting your search." />
      ) : (
        <>
          <div className="character-grid">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
          {info && (
            <Pagination
              currentPage={currentPage}
              totalPages={info.pages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export default CharacterList;

