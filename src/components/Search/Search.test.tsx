import { render, screen, fireEvent } from '@testing-library/react';

import Search from './Search';

const mockOnSearch = vi.fn();

beforeEach(() => {
  localStorage.clear();
  mockOnSearch.mockClear();
});

describe('Search', () => {
  it('renders input and search button', () => {
    render(<Search onSearch={mockOnSearch} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
  it('shows empty input when mo saved term exists', () => {
    render(<Search onSearch={mockOnSearch} />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
  it('shows saved search term from localStorage om mount', () => {
    localStorage.setItem('searchTerm', 'Rick');
    render(<Search onSearch={mockOnSearch} />);
    expect(screen.getByRole('textbox')).toHaveValue('Rick');
  });
  it('updates input value when user types', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Morty' } });
    expect(input).toHaveValue('Morty');
  });
  it('saves to localStorage and calls onSearch when button clicked', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Morty' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(localStorage.getItem('searchTerm')).toBe('Morty');
    expect(mockOnSearch).toHaveBeenCalledWith('Morty');
  });
  it('calls onSearch when Enter key is pressed', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockOnSearch).toHaveBeenCalledWith('Rick');
  });
});
