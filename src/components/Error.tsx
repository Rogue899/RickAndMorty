import portalGif from '../assets/GIFS/portal.gif';
import './Error.scss';

interface ErrorProps {
  message: string;
}

function Error({ message }: ErrorProps) {
  return (
    <div className="error-container">
      <div className="error-portal-container">
        <img
          src={portalGif}
          alt="Rick and Morty Portal"
          className="error-portal-gif"
          loading="lazy"
          decoding="async"
        />
      </div>
      <h2 className="error-title">Aw Jeez! Something Broke!</h2>
    </div>
  );
}

export default Error;
