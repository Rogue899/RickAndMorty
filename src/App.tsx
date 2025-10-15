import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import AppLoader from './components/AppLoader';
import ScrollToTop from './components/ScrollToTop';
import CharacterList from './pages/CharacterList';
import CharacterDetail from './pages/CharacterDetail';
import LocationList from './pages/LocationList';
import LocationDetail from './pages/LocationDetail';
import EpisodeList from './pages/EpisodeList';
import EpisodeDetail from './pages/EpisodeDetail';
import NotFound from './pages/NotFound';
import './App.scss';

function AppContent() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="app">
      <div className="background-portals" aria-hidden="true">
        <div className="portal-ring portal-ring-1"></div>
        <div className="portal-ring portal-ring-2"></div>
        <div className="portal-ring portal-ring-3"></div>
        <div className="portal-ring portal-ring-4"></div>
      </div>

      <header className="app-header">
        <div className="app-header-content">
          <Link to="/" className="app-logo">
            <h1>Rick and Morty Explorer</h1>
          </Link>
          <nav className="app-nav">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') && !location.pathname.includes('/character/') ? 'active' : ''}`}
            >
              Characters
            </Link>
            <Link 
              to="/episodes" 
              className={`nav-link ${isActive('/episode') ? 'active' : ''}`}
            >
              Episodes
            </Link>
            <Link 
              to="/locations" 
              className={`nav-link ${isActive('/location') ? 'active' : ''}`}
            >
              Locations
            </Link>
          </nav>
        </div>
      </header>
      <main className="app-main">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
            <Route path="/locations" element={<LocationList />} />
            <Route path="/location/:id" element={<LocationDetail />} />
            <Route path="/episodes" element={<EpisodeList />} />
            <Route path="/episode/:id" element={<EpisodeDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <ScrollToTop />
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('hasVisited', 'true');
  };

  if (isLoading) {
    return <AppLoader onLoadComplete={handleLoadComplete} />;
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

