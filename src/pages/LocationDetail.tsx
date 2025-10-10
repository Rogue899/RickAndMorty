import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { Location, Character } from '../types';
import { UI_TEXT } from '../constants/app-config';
import BackButton from '../components/BackButton';
import Breadcrumbs from '../components/Breadcrumbs';
import CharacterCard from '../components/CharacterCard';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import Error from '../components/Error';
import './LocationDetail.scss';

function LocationDetail() {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<Location | null>(null);
  const [residents, setResidents] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingResidents, setLoadingResidents] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const RESIDENTS_PER_PAGE = 20;

  useEffect(() => {
    const fetchLocation = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch location details
        const locationData = await api.getLocation(id);
        setLocation(locationData);
      } catch (err) {
        const error = err as Error;
        const errorMessage = error?.message?.toLowerCase().includes('nothing here') 
          ? 'Location not found' 
          : error?.message || 'Location not found';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [id]);

  // Separate effect for fetching residents based on current page
  useEffect(() => {
    const fetchResidents = async () => {
      if (!location || !location.residents || location.residents.length === 0) return;

      try {
        setLoadingResidents(true);
        const residentIds = api.getCharacterIdsFromUrls(location.residents);
        
        // Calculate pagination
        const startIndex = (currentPage - 1) * RESIDENTS_PER_PAGE;
        const endIndex = startIndex + RESIDENTS_PER_PAGE;
        const residentsToFetch = residentIds.slice(startIndex, endIndex);
        
        const residentsData = await api.getMultipleCharacters(residentsToFetch);
        setResidents(residentsData);
      } catch (err) {
        const error = err as Error;
        const errorMessage = error?.message?.toLowerCase().includes('nothing here') 
          ? 'Failed to load residents' 
          : error?.message || 'Failed to load residents';
        setError(errorMessage);
      } finally {
        setLoadingResidents(false);
      }
    };

    fetchResidents();
  }, [location, currentPage, RESIDENTS_PER_PAGE]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!location) return <Error message="Location not found" />;

  // Calculate total pages
  const totalPages = Math.ceil(location.residents.length / RESIDENTS_PER_PAGE);

  return (
    <div className="location-detail">
      <Breadcrumbs 
        items={[
          { label: 'Locations', path: '/locations' },
          { label: location.name }
        ]} 
      />
      <BackButton label={UI_TEXT.BACK_TO_LOCATIONS} defaultRoute="/locations" />

      <div className="location-detail-card">
        <div className="location-header">
          <h1 className="location-name">{location.name}</h1>
          <div className="location-meta">
            <span className="location-type">
              <span className="label">Type:</span>
              <span className="value">{location.type}</span>
            </span>
            <span className="location-dimension">
              <span className="label">Dimension:</span>
              <span className="value">{location.dimension}</span>
            </span>
          </div>
        </div>

        <div className="residents-section">
          <div className="residents-header">
            <h2>Residents</h2>
            <span className="residents-count">
              {location.residents.length} {location.residents.length === 1 ? 'resident' : 'residents'}
            </span>
          </div>

          {loadingResidents && (
            <div className="loading-residents">
              <Loading />
            </div>
          )}

          {!loadingResidents && residents.length === 0 && (
            <p className="no-residents">No known residents at this location</p>
          )}

          {!loadingResidents && residents.length > 0 && (
            <>
              <div className="residents-grid">
                {residents.map((resident) => (
                  <CharacterCard key={resident.id} character={resident} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LocationDetail;

