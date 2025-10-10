import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { Episode, Info } from '../types';
import EpisodeCard from '../components/EpisodeCard';
import EpisodeFilterBar from '../components/EpisodeFilterBar';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import Error from '../components/Error';
import './EpisodeList.scss';

function EpisodeList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [info, setInfo] = useState<Info | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get filters from URL
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const nameFilter = searchParams.get('name') || '';
  const episodeFilter = searchParams.get('episode') || '';

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getEpisodes({ 
          page: currentPage,
          name: nameFilter || undefined,
          episode: episodeFilter || undefined,
        });

        if (!data || !data.results || data.results.length === 0) {
          setError('No episodes found matching your filters');
          setEpisodes([]);
          setInfo(null);
          return;
        }

        setEpisodes(data.results);
        setInfo(data.info);
      } catch (err) {
        const error = err as Error;
        const errorMessage = error?.message?.toLowerCase().includes('nothing here') 
          ? 'No episodes found matching your filters' 
          : error?.message || 'Failed to load episodes';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [currentPage, nameFilter, episodeFilter]);

  const handlePageChange = (page: number) => {
    const newParams: Record<string, string> = { page: page.toString() };
    if (nameFilter) newParams.name = nameFilter;
    if (episodeFilter) newParams.episode = episodeFilter;
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (filters: { name?: string; episode?: string }) => {
    const newParams: Record<string, string> = { page: '1' };
    if (filters.name) newParams.name = filters.name;
    if (filters.episode) newParams.episode = filters.episode;
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="episode-list">
      <div className="episode-list-header">
        <h1>Episodes</h1>
        <p className="episode-count">
          {info?.count || 0} total episodes{info?.pages ? ` across ${info.pages} pages` : ''}
        </p>
      </div>

      <EpisodeFilterBar
        onFilterChange={handleFilterChange}
        initialFilters={{ name: nameFilter, episode: episodeFilter }}
      />

      {!episodes.length ? (
        <Error message="No episodes found matching your filters. Try adjusting your search." />
      ) : (
        <>
          <div className="episode-grid">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
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

export default EpisodeList;

