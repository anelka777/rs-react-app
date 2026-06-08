import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { EnhancedStore } from '@reduxjs/toolkit';

import submissionsReducer from '../../store/submissionsSlice';
import countriesReducer from '../../store/countriesSlice';

import UncontrolledForm from './UncontrolledForm';

const submitForm = (container: HTMLElement): void => {
  const form = container.querySelector('form');
  if (form) {
    fireEvent.submit(form);
  }
};

const makeStore = (): EnhancedStore =>
  configureStore({
    reducer: {
      submissions: submissionsReducer,
      countries: countriesReducer,
    },
  });

const renderForm = (onClose = vi.fn()): HTMLElement => {
  const { container } = render(
    <Provider store={makeStore()}>
      <UncontrolledForm onClose={onClose} />
    </Provider>
  );
  return container;
};

describe('UncontrolledForm', () => {
  it('renders all fields', () => {
    renderForm();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Profile Image')).toBeInTheDocument();
    expect(screen.getByLabelText(/terms/i)).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    const container = renderForm();
    submitForm(container);
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
  });

  it('shows password strength indicator on input', () => {
    renderForm();
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Abc1!' },
    });
    expect(screen.getByText(/strength/i)).toBeInTheDocument();
  });

  it('submits successfully with valid data and calls onClose', async () => {
    const onClose = vi.fn();
    const { container } = render(
      <Provider store={makeStore()}>
        <UncontrolledForm onClose={onClose} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Alice' },
    });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'alice@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Gender'), {
      target: { value: 'female' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Password1!' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'Password1!' },
    });
    fireEvent.change(screen.getByLabelText('Country'), {
      target: { value: 'France' },
    });
    fireEvent.click(screen.getByLabelText(/terms/i));

    const file = new File(['img'], 'photo.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText('Profile Image'), {
      target: { files: [file] },
    });

    submitForm(container);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('shows error when passwords do not match', async () => {
    const container = renderForm();
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Alice' },
    });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'alice@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Gender'), {
      target: { value: 'female' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Password1!' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'Wrong!' },
    });
    fireEvent.change(screen.getByLabelText('Country'), {
      target: { value: 'France' },
    });
    fireEvent.click(screen.getByLabelText(/terms/i));

    submitForm(container);

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });
});
