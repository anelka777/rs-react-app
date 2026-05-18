import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import Pagination from './Pagination';

describe('Pagination', () => {
  it('renders page info', () => {
    render(<Pagination page={1} totalPages={42} onPageChange={vi.fn()} />);
    expect(screen.getByText(/Page 1 of 42/)).toBeInTheDocument();
  });

  it('disables Prev button on first page', () => {
    render(<Pagination page={1} totalPages={42} onPageChange={vi.fn()} />);
    expect(screen.getByText('Prev')).toBeDisabled();
  });

  it('disables Next button on last page', () => {
    render(<Pagination page={42} totalPages={42} onPageChange={vi.fn()} />);
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('calls onPageChange with next page when Next is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination page={1} totalPages={42} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText('Next'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with prev page when Prev is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination page={3} totalPages={42} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText('Prev'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
