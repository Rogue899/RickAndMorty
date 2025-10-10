import { useEffect, useState } from 'react';
import './AppLoader.scss';

interface AppLoaderProps {
  onLoadComplete: () => void;
}

function AppLoader({ onLoadComplete }: AppLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onLoadComplete, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadComplete]);

  return (
    <div className="app-loader">
      <div className="loader-content">
        <div className="portal-loader">
          <div className="portal-ring-loader"></div>
          <div className="portal-ring-loader"></div>
          <div className="portal-ring-loader"></div>
        </div>
        <h1 className="loader-title">Rick & Morty Explorer</h1>
        <div className="loader-bar">
          <div 
            className="loader-progress" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="loader-text">Loading multiverse data...</p>
      </div>
    </div>
  );
}

export default AppLoader;

