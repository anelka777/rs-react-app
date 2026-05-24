import { screen, fireEvent } from '@testing-library/react';

import mockCharacters from '../../test-utils/mockData';
import renderWithProviders from '../../test-utils/renderWithProviders';
import { store } from '../../store/store';
import { unselectAll } from '../../store/selectedSlice';

import Card from './Card';

const mockCharacter = mockCharacters[0];
const mockOnClick = vi.fn();

beforeEach(() => {
  store.dispatch(unselectAll());
  mockOnClick.mockClear();
});

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

  it('checkbox is unchecked by default', () => {
    renderWithProviders(
      <Card character={mockCharacter} onClick={mockOnClick} />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('checkbox toggles selection on change', () => {
    renderWithProviders(
      <Card character={mockCharacter} onClick={mockOnClick} />
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('clicking checkbox does not call onClick', () => {
    renderWithProviders(
      <Card character={mockCharacter} onClick={mockOnClick} />
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
