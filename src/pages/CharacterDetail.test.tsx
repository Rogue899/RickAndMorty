import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharacterDetail from './CharacterDetail';
import * as api from '../services/api';

vi.mock('../services/api');

describe('CharacterDetail', () => {
  const mockCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
    location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders character name', async () => {
    vi.mocked(api.api.getCharacter).mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const elements = screen.getAllByText('Rick Sanchez');
      expect(elements.length).toBeGreaterThan(0);
    }, { timeout: 2000 });
  });

  it('shows character status', async () => {
    vi.mocked(api.api.getCharacter).mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Alive')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('displays character species and gender', async () => {
    vi.mocked(api.api.getCharacter).mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Human')).toBeInTheDocument();
      expect(screen.getByText('Male')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('shows loading state initially', () => {
    vi.mocked(api.api.getCharacter).mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});

