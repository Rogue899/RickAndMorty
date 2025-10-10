import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CharacterCard from './CharacterCard';

describe('CharacterCard', () => {
  const mockCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    url: '',
    created: ''
  };

  it('renders character name', () => {
    render(
      <BrowserRouter>
        <CharacterCard character={mockCharacter} />
      </BrowserRouter>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('renders character status', () => {
    render(
      <BrowserRouter>
        <CharacterCard character={mockCharacter} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Alive/i)).toBeInTheDocument();
  });

  it('renders character species', () => {
    render(
      <BrowserRouter>
        <CharacterCard character={mockCharacter} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Human/i)).toBeInTheDocument();
  });

  it('renders character image with correct alt text', () => {
    render(
      <BrowserRouter>
        <CharacterCard character={mockCharacter} />
      </BrowserRouter>
    );

    const image = screen.getByAltText('Rick Sanchez');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCharacter.image);
  });

  it('displays dead status correctly', () => {
    const deadCharacter = { ...mockCharacter, status: 'Dead' };
    
    render(
      <BrowserRouter>
        <CharacterCard character={deadCharacter} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Dead/i)).toBeInTheDocument();
  });
});

