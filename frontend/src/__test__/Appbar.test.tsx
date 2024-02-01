// Appbar.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Appbar from '../components/Appbar/Appbar';

test('renders Appbar component with Login button', () => {
  render(<Appbar />);

  const appbarTitle = screen.getByText('Ramp up Project');
  expect(appbarTitle).toBeInTheDocument();

  const loginButton = screen.getByRole('button', { name: 'Login' });
  expect(loginButton).toBeInTheDocument();
});
