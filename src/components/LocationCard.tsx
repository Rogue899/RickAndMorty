import { useNavigate, useLocation } from 'react-router-dom';
import { navigateWithReturn } from '../services/navigation';
import { Location } from '../types';
import './LocationCard.scss';

interface LocationCardProps {
  location: Location;
}

function LocationCard({ location }: LocationCardProps) {
  const navigate = useNavigate();
  const routerLocation = useLocation();

  const handleClick = () => {
    navigateWithReturn(
      navigate,
      `/location/${location.id}`,
      routerLocation.pathname,
      routerLocation.search
    );
  };

  // Get type icon based on location type
  const getTypeIcon = () => {
    const type = location.type.toLowerCase();
    if (type.includes('planet')) return '🪐';
    if (type.includes('space') || type.includes('station')) return '🛸';
    if (type.includes('dimension')) return '🌀';
    if (type.includes('resort')) return '🏖️';
    if (type.includes('reality')) return '✨';
    if (type.includes('micro')) return '🔬';
    if (type.includes('fantasy')) return '🎭';
    if (type.includes('dream')) return '💭';
    if (type.includes('tv')) return '📺';
    if (type.includes('custom')) return '🛠️';
    return '📍';
  };

  return (
    <div 
      className="location-card" 
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="location-card-background"></div>
      
      <div className="location-card-content">
        <div className="location-icon">{getTypeIcon()}</div>
        
        <div className="location-info">
          <span className="location-type">{location.type}</span>
          <h3 className="location-name">{location.name}</h3>
        </div>

        <div className="location-stats">
          <div className="location-stat">
            <div className="stat-icon">🌌</div>
            <div className="stat-info">
              <span className="stat-label">Dimension</span>
              <span className="stat-value">{location.dimension}</span>
            </div>
          </div>
          <div className="location-stat">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <span className="stat-label">Residents</span>
              <span className="stat-value">{location.residents.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationCard;

