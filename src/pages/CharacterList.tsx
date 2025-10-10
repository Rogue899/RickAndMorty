import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { Character, Info } from '../types/character';
import CharacterCard from '../components/CharacterCard';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import Error from '../components/Error';
import './CharacterList.css';

function CharacterList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<Info | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get current page from URL, default to 1
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getCharacters(currentPage);
        
        if (!data || !data.results || data.results.length === 0) {
          setError('No characters found for this page');
          setCharacters([]);
          setInfo(null);
          return;
        }
        
        setCharacters(data.results);
        console.log(data);
        setInfo(data.info);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!characters.length) return <Error message="No characters found" />;

  return (
    <div className="character-list">
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
    </div>
  );
}

export default CharacterList;

