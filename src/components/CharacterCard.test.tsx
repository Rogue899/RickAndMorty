import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import CharacterCard from './CharacterCard';
import { Character } from '../types/character';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['episode1', 'episode2'],
  url: '',
  created: '',
};

describe('CharacterCard', () => {
  it('should render character information', () => {
    render(
      <BrowserRouter>
        <CharacterCard character={mockCharacter} />
      </BrowserRouter>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive - Human')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toHaveAttribute(
      'src',
      'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    );
  });

  it('should navigate to character detail on click', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <CharacterCard character={mockCharacter} />
      </BrowserRouter>
    );

    const card = screen.getByRole('button');
    await user.click(card);

    expect(mockNavigate).toHaveBeenCalledWith('/character/1');
  });

  it('should apply correct status class', () => {
    const { container } = render(
      <BrowserRouter>
        <CharacterCard character={mockCharacter} />
      </BrowserRouter>
    );

    const statusIndicator = container.querySelector('.status-alive');
    expect(statusIndicator).toBeInTheDocument();
  });

  it('should render dead status correctly', () => {
    const deadCharacter = { ...mockCharacter, status: 'Dead' };
    const { container } = render(
      <BrowserRouter>
        <CharacterCard character={deadCharacter} />
      </BrowserRouter>
    );

    expect(screen.getByText('Dead - Human')).toBeInTheDocument();
    const statusIndicator = container.querySelector('.status-dead');
    expect(statusIndicator).toBeInTheDocument();
  });
});

