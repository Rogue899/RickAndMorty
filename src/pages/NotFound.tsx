import { Link } from 'react-router-dom';
import portalGif from '../assets/GIFS/portal.gif';
import './NotFound.scss';

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <div className="portal-gif-container">
          <img
            src={portalGif}
            alt="Rick and Morty Portal"
            className="portal-gif"
          />
        </div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Aw Jeez, Wrong Dimension!</h2>
        <p className="not-found-message">
          <strong>Morty:</strong> "Uh, Rick? I-I-I don't think this page exists..."<br/>
          <strong>Rick:</strong> "Of course it doesn't, Morty! *burp* You broke the multiverse again!"
        </p>
        <p className="not-found-hint">
          Get back to a dimension that actually exists:
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn-primary">
            🧪 Portal to Characters
          </Link>
          <Link to="/episodes" className="btn-secondary">
            📺 Browse Episodes
          </Link>
          <Link to="/locations" className="btn-secondary">
            🪐 Explore Locations
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

