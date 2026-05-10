import { render, screen } from '@testing-library/react';

import mockCharacters from '../../test-utils/mockData';

import CardList from './CardList';

describe('CardList', () => {
  it('shows spinner when loading', () => {
    const { container } = render(
      <CardList characters={[]} isLoading={true} error={null} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });
  it('renders correct number of cards', () => {
    render(
      <CardList characters={mockCharacters} isLoading={false} error={null} />
    );
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
  it('shows 404 error message', () => {
    render(<CardList characters={[]} isLoading={false} error="Error: 404" />);
    expect(
      screen.getByText('Character not found. Try another name!')
    ).toBeInTheDocument();
  });
  it('shows 400 error message', () => {
    render(<CardList characters={[]} isLoading={false} error="Error: 400" />);
    expect(
      screen.getByText('Invalid search. Please use English letters only!')
    ).toBeInTheDocument();
  });

  it('shows 5xx error message', () => {
    render(<CardList characters={[]} isLoading={false} error="Error: 500" />);
    expect(
      screen.getByText('Server error. Please try again later!')
    ).toBeInTheDocument();
  });
});
