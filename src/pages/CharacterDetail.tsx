import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { Character } from '../types/character';
import Loading from '../components/Loading';
import Error from '../components/Error';
import './CharacterDetail.css';

function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await api.getCharacter(id);
        console.log(data);
        setCharacter(data);
      } catch (error) {
        setError(
          error ? error.message  : 'An error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!character) return <Error message="Character not found" />;

  const getStatusClass = (status: string) => {
    return `status-${status.toLowerCase()}`;
  };

  const handleBack = () => {
    const page = searchParams.get('page') || '1';
    navigate(`/?page=${page}`);
  };

  return (
    <div className="character-detail">
      <button className="back-button" onClick={handleBack}>
        ← Back to Characters
      </button>

      <div className="character-detail-card">
        <div className="character-detail-image">
          <img src={character.image} alt={character.name} />
        </div>

        <div className="character-detail-info">
          <h1>{character.name}</h1>

          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Status:</span>
              <span className={`info-value ${getStatusClass(character.status)}`}>
                <span className="status-indicator"></span>
                {character.status}
              </span>
            </div>

            <div className="info-item">
              <span className="info-label">Species:</span>
              <span className="info-value">{character.species}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Gender:</span>
              <span className="info-value">{character.gender}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Origin:</span>
              <span className="info-value">{character.origin.name}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Last known location:</span>
              <span className="info-value">{character.location.name}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Episodes:</span>
              <span className="info-value episodes-count">
                {character.episode.length} {character.episode.length === 1 ? 'episode' : 'episodes'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;

