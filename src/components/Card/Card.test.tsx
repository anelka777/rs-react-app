import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import mockCharacters from '../../test-utils/mockData';

import Card from './Card';

const mockCharacter = mockCharacters[0];
const mockOnClick = vi.fn();

describe('Card', () => {
  it('renders character name', () => {
    render(<Card character={mockCharacter} onClick={mockOnClick} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('renders character image with correct alt', () => {
    render(<Card character={mockCharacter} onClick={mockOnClick} />);
    expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    render(<Card character={mockCharacter} onClick={mockOnClick} />);
    screen.getByText('Rick Sanchez').click();
    expect(mockOnClick).toHaveBeenCalled();
  });
});
