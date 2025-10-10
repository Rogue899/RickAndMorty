import { Link } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <div className="not-found-icon">🛸</div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          Looks like you've ventured into an unknown dimension! 
          The page you're looking for doesn't exist in this universe.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn-primary">
            Go to Characters
          </Link>
          <Link to="/episodes" className="btn-secondary">
            Browse Episodes
          </Link>
          <Link to="/locations" className="btn-secondary">
            Explore Locations
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

