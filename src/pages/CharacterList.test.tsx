import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import CharacterList from './CharacterList';
import { api } from '../services/api';

vi.mock('../services/api');

const mockCharactersResponse = {
  info: {
    count: 826,
    pages: 42,
    next: 'https://rickandmortyapi.com/api/character?page=2',
    prev: null,
  },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: '' },
      location: { name: 'Citadel of Ricks', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: ['ep1'],
      url: '',
      created: '',
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: '' },
      location: { name: 'Earth (Replacement Dimension)', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      episode: ['ep1'],
      url: '',
      created: '',
    },
  ],
};

describe('CharacterList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
  });

  it('should render loading state initially', () => {
    vi.mocked(api.getCharacters).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render characters after loading', async () => {
    vi.mocked(api.getCharacters).mockResolvedValue(mockCharactersResponse);

    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('should render error state on API failure', async () => {
    vi.mocked(api.getCharacters).mockRejectedValue(new Error('API Error'));

    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });
  });

  it('should render pagination', async () => {
    vi.mocked(api.getCharacters).mockResolvedValue(mockCharactersResponse);

    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Next page')).toBeInTheDocument();
    });

    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
  });

  it('should change page when clicking next', async () => {
    const user = userEvent.setup();
    vi.mocked(api.getCharacters).mockResolvedValue(mockCharactersResponse);

    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    await user.click(screen.getByLabelText('Next page'));

    await waitFor(() => {
      expect(api.getCharacters).toHaveBeenCalledWith(2);
    });
  });

  it('should scroll to top when changing pages', async () => {
    const user = userEvent.setup();
    vi.mocked(api.getCharacters).mockResolvedValue(mockCharactersResponse);

    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    await user.click(screen.getByLabelText('Next page'));

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});

