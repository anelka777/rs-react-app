import { render, screen } from '@testing-library/react';

import Card from './Card';

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  location: {
    name: 'Earth',
  },
};

describe('Card', () => {
  it('renders character name', () => {
    render(<Card character={mockCharacter} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });
  it('renders character image with correct alt', () => {
    render(<Card character={mockCharacter} />);
    expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument();
  });
  it('renders character status', () => {
    render(<Card character={mockCharacter} />);
    expect(screen.getByText('Alive')).toBeInTheDocument();
  });
  it('renders character species', () => {
    render(<Card character={mockCharacter} />);
    expect(screen.getByText('Human')).toBeInTheDocument();
  });
  it('renders character gender', () => {
    render(<Card character={mockCharacter} />);
    expect(screen.getByText('Male')).toBeInTheDocument();
  });
  it('renders character location', () => {
    render(<Card character={mockCharacter} />);
    expect(screen.getByText('Earth')).toBeInTheDocument();
  });
});
