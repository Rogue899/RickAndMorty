import './Error.scss';

interface ErrorProps {
  message: string;
}

function Error({ message }: ErrorProps) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">Oops! Something went wrong</h2>
      <p className="error-message">{message}</p>
    </div>
  );
}

export default Error;

