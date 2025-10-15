import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { navigateWithReturn } from '../services/navigation';
import { Character } from '../types/character';
import { UI_TEXT } from '../constants/app-config';
import BackButton from '../components/BackButton';
import Breadcrumbs from '../components/Breadcrumbs';
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
        const errorMessage = error?.message?.toLowerCase().includes('nothing here') 
          ? 'Character not found' 
          : error?.message || 'Character not found';
        setError(errorMessage);
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

  const getCharacterInfoItems = () => [
    {
      label: 'Status',
      value: character!.status,
      className: getStatusClass(character!.status),
      withIndicator: true
    },
    { label: 'Species', value: character!.species },
    { label: 'Gender', value: character!.gender },
    {
      label: 'Origin',
      value: character!.origin.name,
      clickable: isValidLocation(character!.origin.url),
      onClick: () => handleLocationClick(character!.origin.url)
    },
    {
      label: 'Last known location',
      value: character!.location.name,
      clickable: isValidLocation(character!.location.url),
      onClick: () => handleLocationClick(character!.location.url)
    },
    {
      label: 'Episodes',
      value: `${character!.episode.length} ${character!.episode.length === 1 ? 'episode' : 'episodes'}`,
      className: 'episodes-count'
    }
  ];

  return (
    <div className="character-detail">
      <Breadcrumbs 
        items={[
          { label: 'Characters', path: '/' },
          { label: character.name }
        ]} 
      />
      <BackButton label={UI_TEXT.BACK_TO_CHARACTERS} defaultRoute="/" />

      <div className="character-detail-card">
        <div className="character-detail-image">
          <img src={character.image} alt={character.name} />
        </div>

        <div className="character-detail-info">
          <h1>{character.name}</h1>

          <div className="info-grid">
            {getCharacterInfoItems().map((item, index) => (
              <div key={index} className="info-item">
                <span className="info-label">{item.label}:</span>
                {item.clickable ? (
                  <span 
                    className="info-value info-value-clickable" 
                    onClick={item.onClick}
                    title="Click to view location details"
                  >
                    {item.value} →
                  </span>
                ) : (
                  <span className={`info-value ${item.className || ''}`}>
                    {item.withIndicator && <span className="status-indicator"></span>}
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;

