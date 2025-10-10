import { useNavigate, useLocation } from 'react-router-dom';
import { navigateWithReturn } from '../services/navigation';
import { Episode } from '../types';
import './EpisodeCard.scss';

interface EpisodeCardProps {
  episode: Episode;
}

function EpisodeCard({ episode }: EpisodeCardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigateWithReturn(
      navigate,
      `/episode/${episode.id}`,
      location.pathname,
      location.search
    );
  };

  // Extract season and episode number from code (e.g., "S01E01")
  const getSeasonInfo = () => {
    const match = episode.episode.match(/S(\d+)E(\d+)/);
    if (match) {
      return {
        season: parseInt(match[1], 10),
        episodeNum: parseInt(match[2], 10),
      };
    }
    return null;
  };

  const seasonInfo = getSeasonInfo();

  return (
    <div 
      className="episode-card" 
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="episode-card-header">
        <span className="episode-code">{episode.episode}</span>
        <span className="episode-characters-count">
          {episode.characters.length} characters
        </span>
      </div>

      <h3 className="episode-name">{episode.name}</h3>

      <div className="episode-meta">
        <span className="episode-air-date">{episode.air_date}</span>
        {seasonInfo && (
          <span className="episode-season">
            Season {seasonInfo.season}
          </span>
        )}
      </div>
    </div>
  );
}

export default EpisodeCard;

