import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { Episode, Character } from '../types';
import { VIDEO_CONFIG, PAGINATION_CONFIG, UI_TEXT, ERROR_MESSAGES } from '../constants/app-config';
import BackButton from '../components/BackButton';
import CharacterCard from '../components/CharacterCard';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import Error from '../components/Error';
import PlayIcon from '../components/icons/PlayIcon';
import ExternalLinkIcon from '../components/icons/ExternalLinkIcon';
import CalendarIcon from '../components/icons/CalendarIcon';
import './EpisodeDetail.scss';

function EpisodeDetail() {
  const { id } = useParams<{ id: string }>();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingCharacters, setLoadingCharacters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEpisode = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch episode details
        const episodeData = await api.getEpisode(id);
        setEpisode(episodeData);
      } catch (err) {
        const error = err as Error;
        setError(error?.message || 'Failed to load episode');
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, [id]);

  // Separate effect for fetching characters based on current page
  useEffect(() => {
    const fetchCharacters = async () => {
      if (!episode || !episode.characters || episode.characters.length === 0) return;

      try {
        setLoadingCharacters(true);
        const characterIds = api.getCharacterIdsFromUrls(episode.characters);
        
        const startIndex = (currentPage - 1) * PAGINATION_CONFIG.CHARACTERS_PER_PAGE;
        const endIndex = startIndex + PAGINATION_CONFIG.CHARACTERS_PER_PAGE;
        const charactersToFetch = characterIds.slice(startIndex, endIndex);
        
        const charactersData = await api.getMultipleCharacters(charactersToFetch);
        setCharacters(charactersData);
      } catch (err) {
        const error = err as Error;
        setError(error?.message || ERROR_MESSAGES.FAILED_TO_LOAD);
      } finally {
        setLoadingCharacters(false);
      }
    };

    fetchCharacters();
  }, [episode, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!episode) return <Error message={ERROR_MESSAGES.EPISODE_NOT_FOUND} />;

  const seasonMatch = episode.episode.match(/S(\d+)E(\d+)/);
  const seasonInfo = seasonMatch
    ? { season: parseInt(seasonMatch[1], 10), episodeNum: parseInt(seasonMatch[2], 10) }
    : null;

  const totalPages = Math.ceil(episode.characters.length / PAGINATION_CONFIG.CHARACTERS_PER_PAGE);

  const getVideoUrl = () => {
    if (!seasonInfo) return null;
    const autoplay = VIDEO_CONFIG.AUTOPLAY ? '1' : '0';
    const autonext = VIDEO_CONFIG.AUTONEXT ? '1' : '0';
    return `${VIDEO_CONFIG.VIDSRC_BASE_URL}/${VIDEO_CONFIG.RICK_AND_MORTY_IMDB_ID}/${seasonInfo.season}-${seasonInfo.episodeNum}?autoplay=${autoplay}&autonext=${autonext}`;
  };

  const handleWatchEpisode = () => {
    const videoUrl = getVideoUrl();
    if (videoUrl) {
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="episode-detail">
      <BackButton label={UI_TEXT.BACK_TO_EPISODES} defaultRoute="/episodes" />

      <div className="episode-detail-card">
        <div className="episode-header">
          <div className="episode-code-large">{episode.episode}</div>
          <h1 className="episode-title">{episode.name}</h1>
          
          <button 
            className="watch-episode-btn"
            onClick={handleWatchEpisode}
            title="Opens video player in new tab"
          >
            <PlayIcon />
            {UI_TEXT.WATCH_EPISODE}
            <ExternalLinkIcon style={{ marginLeft: '8px', opacity: 0.7 }} />
          </button>

          <div className="episode-info">
            <span className="episode-air-date">
              <CalendarIcon />
              {episode.air_date}
            </span>
            {seasonInfo && (
              <span className="episode-season-info">Season {seasonInfo.season}</span>
            )}
          </div>
        </div>

        <div className="characters-section">
          <div className="characters-header">
            <h2>Featured Characters</h2>
            <span className="characters-count">
              {episode.characters.length} {episode.characters.length === 1 ? 'character' : 'characters'}
            </span>
          </div>

          {loadingCharacters && (
            <div className="loading-characters">
              <Loading />
            </div>
          )}

          {!loadingCharacters && characters.length === 0 && (
            <p className="no-characters">No characters data available</p>
          )}

          {!loadingCharacters && characters.length > 0 && (
            <>
              <div className="characters-grid">
                {characters.map((character) => (
                  <CharacterCard key={character.id} character={character} />
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

export default EpisodeDetail;

