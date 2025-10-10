import { describe, it, expect, beforeEach, vi } from 'vitest';
import { api } from './api';

// Mock fetch
global.fetch = vi.fn();

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCharacters', () => {
    it('fetches characters from the API', async () => {
      const mockResponse = {
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

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await api.getCharacters();
      
      expect(result.results).toHaveLength(1);
      expect(result.results[0].name).toBe('Rick Sanchez');
    });

    it('handles pagination parameters', async () => {
      const mockResponse = {
        info: { count: 1, pages: 1, next: null, prev: null },
        results: []
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      // Call with filters object that includes page
      await api.getCharacters({ page: 2 });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('page=2')
      );
    });
  });

  describe('getCharacter', () => {
    it('fetches a single character by id', async () => {
      const mockCharacter = {
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
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCharacter,
      });

      const result = await api.getCharacter('1');
      
      expect(result).toBeDefined();
      expect(result.name).toBe('Rick Sanchez');
      expect(result.id).toBe(1);
    });
  });

  describe('Helper functions', () => {
    it('extracts character ID from URL', () => {
      const url = 'https://rickandmortyapi.com/api/character/42';
      const id = api.getCharacterIdFromUrl(url);
      
      expect(id).toBe(42);
    });

    it('extracts location ID from URL', () => {
      const url = 'https://rickandmortyapi.com/api/location/5';
      const id = api.getLocationIdFromUrl(url);
      
      expect(id).toBe(5);
    });

    it('extracts episode ID from URL', () => {
      const url = 'https://rickandmortyapi.com/api/episode/10';
      const id = api.getEpisodeIdFromUrl(url);
      
      expect(id).toBe(10);
    });
  });
});

