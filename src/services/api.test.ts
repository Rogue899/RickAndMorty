import { describe, it, expect, beforeEach, vi } from 'vitest';
import { api } from './api';

global.fetch = vi.fn();

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCharacters', () => {
    it('should fetch characters successfully', async () => {
      const mockResponse = {
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
            episode: ['episode1'],
            url: '',
            created: '',
          },
        ],
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await api.getCharacters(1);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character?page=1'
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when fetch fails', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
      });

      await expect(api.getCharacters(1)).rejects.toThrow('Failed to fetch characters');
    });
  });

  describe('getCharacter', () => {
    it('should fetch a single character successfully', async () => {
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
        episode: ['episode1'],
        url: '',
        created: '',
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCharacter,
      });

      const result = await api.getCharacter('1');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character/1'
      );
      expect(result).toEqual(mockCharacter);
    });

    it('should throw error when fetch fails', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
      });

      await expect(api.getCharacter('1')).rejects.toThrow('Failed to fetch character');
    });
  });
});

