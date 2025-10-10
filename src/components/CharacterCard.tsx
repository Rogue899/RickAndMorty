import { useNavigate, useLocation } from 'react-router-dom';
import { navigateWithReturn } from '../services/navigation';
import { Character } from '../types/character';
import './CharacterCard.scss';

interface CharacterCardProps {
  character: Character;
}

function CharacterCard({ character }: CharacterCardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigateWithReturn(
      navigate,
      `/character/${character.id}`,
      location.pathname,
      location.search
    );
  };

  const getStatusClass = (status: string) => {
    return `status-${status.toLowerCase()}`;
  };

  return (
    <div className="character-card" onClick={handleClick} role="button" tabIndex={0}>
      <div className="character-card-image">
        <img src={character.image} alt={character.name} loading="lazy" />
      </div>
      <div className="character-card-content">
        <h2 className="character-name">{character.name}</h2>
        <div className="character-status">
          <span className={`status-indicator ${getStatusClass(character.status)}`}></span>
          <span>{character.status} - {character.species}</span>
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;

