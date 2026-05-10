import { render, screen } from '@testing-library/react';

import mockCharacters from '../../test-utils/mockData';

import Card from './Card';

const mockCharacter = mockCharacters[0];

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
