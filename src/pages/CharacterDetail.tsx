import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { navigateWithReturn } from '../services/navigation';
import { Character } from '../types/character';
import BackButton from '../components/BackButton';
import Loading from '../components/Loading';
import Error from '../components/Error';
import './CharacterDetail.scss';

function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
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
      } catch (err) {
        const error = err as Error;
        setError(error?.message || 'An error occurred');
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

  const handleLocationClick = (url: string) => {
    const locationId = api.getLocationIdFromUrl(url);
    if (locationId) {
      navigateWithReturn(
        navigate,
        `/location/${locationId}`,
        location.pathname,
        location.search
      );
    }
  };

  const isValidLocation = (url: string) => {
    return url && url.trim() !== '';
  };

  return (
    <div className="character-detail">
      <BackButton label="Back" defaultRoute="/" />

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
              {isValidLocation(character.origin.url) ? (
                <span 
                  className="info-value info-value-clickable" 
                  onClick={() => handleLocationClick(character.origin.url)}
                  title="Click to view location details"
                >
                  {character.origin.name} →
                </span>
              ) : (
                <span className="info-value">{character.origin.name}</span>
              )}
            </div>

            <div className="info-item">
              <span className="info-label">Last known location:</span>
              {isValidLocation(character.location.url) ? (
                <span 
                  className="info-value info-value-clickable" 
                  onClick={() => handleLocationClick(character.location.url)}
                  title="Click to view location details"
                >
                  {character.location.name} →
                </span>
              ) : (
                <span className="info-value">{character.location.name}</span>
              )}
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

