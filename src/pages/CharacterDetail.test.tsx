import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import CharacterDetail from './CharacterDetail';
import { api } from '../services/api';

vi.mock('../services/api');

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['ep1', 'ep2', 'ep3'],
  url: '',
  created: '',
};

const renderWithRouter = (id: string = '1') => {
  return render(
    <BrowserRouter>
      <Routes>
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </BrowserRouter>,
    {
      wrapper: ({ children }) => (
        <BrowserRouter>
          <Routes>
            <Route path="*" element={children} />
          </Routes>
        </BrowserRouter>
      ),
    }
  );
};

describe('CharacterDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state initially', () => {
    vi.mocked(api.getCharacter).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CharacterDetail />} />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render character details after loading', async () => {
    vi.mocked(api.getCharacter).mockResolvedValue(mockCharacter);

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CharacterDetail />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
    expect(screen.getByText('3 episodes')).toBeInTheDocument();
  });

  it('should render error state on API failure', async () => {
    vi.mocked(api.getCharacter).mockRejectedValue(new Error('Character not found'));

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CharacterDetail />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Character not found')).toBeInTheDocument();
    });
  });

  it('should display correct episode count for single episode', async () => {
    const singleEpisodeCharacter = { ...mockCharacter, episode: ['ep1'] };
    vi.mocked(api.getCharacter).mockResolvedValue(singleEpisodeCharacter);

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CharacterDetail />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('1 episode')).toBeInTheDocument();
    });
  });

  it('should render character image', async () => {
    vi.mocked(api.getCharacter).mockResolvedValue(mockCharacter);

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CharacterDetail />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      const img = screen.getByAltText('Rick Sanchez');
      expect(img).toHaveAttribute('src', mockCharacter.image);
    });
  });

  it('should render back button', async () => {
    vi.mocked(api.getCharacter).mockResolvedValue(mockCharacter);

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CharacterDetail />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('← Back to Characters')).toBeInTheDocument();
    });
  });

  it('should apply correct status class for alive character', async () => {
    vi.mocked(api.getCharacter).mockResolvedValue(mockCharacter);

    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CharacterDetail />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    const statusElement = container.querySelector('.status-alive');
    expect(statusElement).toBeInTheDocument();
  });

  it('should apply correct status class for dead character', async () => {
    const deadCharacter = { ...mockCharacter, status: 'Dead' };
    vi.mocked(api.getCharacter).mockResolvedValue(deadCharacter);

    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CharacterDetail />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    const statusElement = container.querySelector('.status-dead');
    expect(statusElement).toBeInTheDocument();
  });
});

