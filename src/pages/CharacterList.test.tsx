import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CharacterList from './CharacterList';
import * as api from '../services/api';

// mock the api
vi.mock('../services/api');

describe('CharacterList', () => {
  it('should render the page title', async () => {
    const mockCharacters = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: { name: 'Earth', url: '' },
          location: { name: 'Earth', url: '' },
          image: 'rick.jpg',
          episode: [],
          url: '',
          created: ''
        }
      ]
    };

    vi.mocked(api.api.getCharacters).mockResolvedValue(mockCharacters);

    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Characters')).toBeInTheDocument();
      expect(screen.getByText('1 characters across 1 pages')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );
    
    // should show loading component
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('displays characters after loading', async () => {
    // setup mock data
    const mockCharacters = {
      info: { count: 2, pages: 1, next: null, prev: null },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: { name: 'Earth', url: '' },
          location: { name: 'Earth', url: '' },
          image: 'rick.jpg',
          episode: [],
          url: '',
          created: ''
        },
        {
          id: 2,
          name: 'Morty Smith',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: { name: 'Earth', url: '' },
          location: { name: 'Earth', url: '' },
          image: 'morty.jpg',
          episode: [],
          url: '',
          created: ''
        }
      ]
    };

    vi.mocked(api.api.getCharacters).mockResolvedValue(mockCharacters);

    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );

    // wait for the characters to load
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('shows error message when api fails', async () => {
    vi.mocked(api.api.getCharacters).mockRejectedValue(new Error('API Error'));

    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Something Broke/i)).toBeInTheDocument();
    });
  });
});

