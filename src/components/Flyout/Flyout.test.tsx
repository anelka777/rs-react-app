import { screen, fireEvent } from '@testing-library/react';

import renderWithProviders from '../../test-utils/renderWithProviders';
import { store } from '../../store/store';
import { toggleCharacter, unselectAll } from '../../store/selectedSlice';
import mockCharacters from '../../test-utils/mockData';

import Flyout from './Flyout';

beforeEach(() => {
  store.dispatch(unselectAll());
});

describe('Flyout', () => {
  it('does not render when no items selected', () => {
    const { container } = renderWithProviders(<Flyout />);
    expect(container.firstChild).toBeNull();
  });

  it('renders when items are selected', () => {
    store.dispatch(toggleCharacter(mockCharacters[0]));
    renderWithProviders(<Flyout />);
    expect(screen.getByText('Selected: 1')).toBeInTheDocument();
  });

  it('shows unselect all button', () => {
    store.dispatch(toggleCharacter(mockCharacters[0]));
    renderWithProviders(<Flyout />);
    expect(screen.getByText('Unselect All')).toBeInTheDocument();
  });

  it('unselects all when button clicked', () => {
    store.dispatch(toggleCharacter(mockCharacters[0]));
    renderWithProviders(<Flyout />);
    fireEvent.click(screen.getByText('Unselect All'));
    expect(screen.queryByText('Selected: 1')).not.toBeInTheDocument();
  });

  it('download button is present', () => {
    store.dispatch(toggleCharacter(mockCharacters[0]));
    renderWithProviders(<Flyout />);
    expect(screen.getByText('Download')).toBeInTheDocument();
  });
  it('triggers download when download button clicked', () => {
    const createObjectURL = vi.fn(() => 'blob:url');
    const revokeObjectURL = vi.fn();
    globalThis.URL.createObjectURL = createObjectURL;
    globalThis.URL.revokeObjectURL = revokeObjectURL;

    store.dispatch(toggleCharacter(mockCharacters[0]));
    renderWithProviders(<Flyout />);

    const clickMock = vi.fn();
    const anchor = { href: '', download: '', click: clickMock };
    vi.spyOn(document, 'createElement').mockReturnValueOnce(
      anchor as unknown as HTMLElement
    );

    fireEvent.click(screen.getByText('Download'));

    expect(createObjectURL).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalled();
  });
});
