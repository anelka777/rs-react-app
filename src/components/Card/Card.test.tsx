import { screen } from '@testing-library/react';
import { vi } from 'vitest';

import mockCharacters from '../../test-utils/mockData';
import renderWithProviders from '../../test-utils/renderWithProviders';

import Card from './Card';

const mockCharacter = mockCharacters[0];
const mockOnClick = vi.fn();

describe('Card', () => {
  it('renders character name', () => {
    renderWithProviders(
      <Card character={mockCharacter} onClick={mockOnClick} />
    );
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('renders character image with correct alt', () => {
    renderWithProviders(
      <Card character={mockCharacter} onClick={mockOnClick} />
    );
    expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    renderWithProviders(
      <Card character={mockCharacter} onClick={mockOnClick} />
    );
    screen.getByText('Rick Sanchez').click();
    expect(mockOnClick).toHaveBeenCalled();
  });
});
