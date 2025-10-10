import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { Location, LocationResponse } from '../types';
import LocationCard from '../components/LocationCard';
import LocationFilterBar from '../components/LocationFilterBar';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import Error from '../components/Error';
import './LocationList.scss';

function LocationList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [locations, setLocations] = useState<Location[]>([]);
  const [info, setInfo] = useState<LocationResponse['info'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get filters from URL
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const nameFilter = searchParams.get('name') || '';
  const typeFilter = searchParams.get('type') || '';
  const dimensionFilter = searchParams.get('dimension') || '';

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getLocations({ 
          page: currentPage,
          name: nameFilter || undefined,
          type: typeFilter || undefined,
          dimension: dimensionFilter || undefined,
        });
        
        if (!data || !data.results || data.results.length === 0) {
          setError('No locations found matching your filters');
          setLocations([]);
          setInfo(null);
          return;
        }
        
        setLocations(data.results);
        setInfo(data.info);
      } catch (err) {
        const error = err as Error;
        const errorMessage = error?.message?.toLowerCase().includes('nothing here') 
          ? 'No locations found matching your filters' 
          : error?.message || 'Failed to load locations';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [currentPage, nameFilter, typeFilter, dimensionFilter]);

  const handlePageChange = (page: number) => {
    const newParams: Record<string, string> = { page: page.toString() };
    if (nameFilter) newParams.name = nameFilter;
    if (typeFilter) newParams.type = typeFilter;
    if (dimensionFilter) newParams.dimension = dimensionFilter;
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (filters: {
    name?: string;
    type?: string;
    dimension?: string;
  }) => {
    const newParams: Record<string, string> = { page: '1' };
    if (filters.name) newParams.name = filters.name;
    if (filters.type) newParams.type = filters.type;
    if (filters.dimension) newParams.dimension = filters.dimension;
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="location-list">
      <div className="location-list-header">
        <h1>Locations</h1>
        <p className="location-count">
          {info?.count || 0} locations{info?.pages ? ` across ${info.pages} pages` : ''}
        </p>
      </div>

      <LocationFilterBar
        onFilterChange={handleFilterChange}
        initialFilters={{
          name: nameFilter,
          type: typeFilter,
          dimension: dimensionFilter,
        }}
      />

      {!locations.length ? (
        <Error message="No locations found matching your filters. Try adjusting your search." />
      ) : (
        <>
          <div className="location-grid">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
          {info && (
            <Pagination
              currentPage={currentPage}
              totalPages={info.pages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export default LocationList;

