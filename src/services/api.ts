import { Character, CharacterResponse } from '../types/character';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const api = {
  async getCharacters(page: number = 1): Promise<CharacterResponse> {
    const response = await fetch(`${BASE_URL}/character?page=${page}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }
    
    return response.json();
  },

  async getCharacter(id: string): Promise<Character> {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch character');
    }
    
    return response.json();
  }
};

