import { useNavigate, useSearchParams } from 'react-router-dom';
import { Character } from '../types/character';
import './CharacterCard.css';

interface CharacterCardProps {
  character: Character;
}

function CharacterCard({ character }: CharacterCardProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = () => {
    const currentPage = searchParams.get('page') || '1';
    navigate(`/character/${character.id}?from=list&page=${currentPage}`);
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

