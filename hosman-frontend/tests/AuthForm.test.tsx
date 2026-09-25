import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { SignUpView } from 'src/sections/auth/view/sign-up-view';
import appReducer from 'src/store/app/appReducer';

const createTestStore = () =>
  configureStore({
    reducer: { app: appReducer },
  });

describe('SignUpView Component', () => {
  it('renders registration form fields correctly', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUpView />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Password/i)[0]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create.*Account/i })).toBeInTheDocument();
  });

  it('triggers Zod form validation when submitted with empty fields', async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUpView />
        </BrowserRouter>
      </Provider>
    );

    const submitBtn = screen.getByRole('button', { name: /Create.*Account/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Full name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/Email address is required/i)).toBeInTheDocument();
    });
  });
});
