import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AutoLogout from '../components/AutoLogout/AutoLogout'; // Assuming this is the file path

jest.mock('../redux/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockStore = configureStore([]);
const initialState = { user: { role: 'user' } };
const mockAppDispatch = jest.fn();
const mockAppSelector = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

test('AutoLogout dispatches logout after timeout with no user interaction', () => {
  const mockAppDispatch = jest.fn();
  mockAppSelector.mockReturnValue({ timeoutInMinutes: 1 });

  const store = mockStore(initialState);

  render(<Provider store={store}><AutoLogout /></Provider>);


});

