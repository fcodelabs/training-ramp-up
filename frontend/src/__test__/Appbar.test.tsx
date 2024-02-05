import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Appbar from '../components/Appbar/Appbar'; // Assuming Appbar is exported from './Appbar'
import { login, logout } from '../redux/user/slice';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the redux store
const mockStore = configureStore([]);

describe('Appbar', () => {
  let store : any;
  let dispatchSpy: any;

  beforeEach(() => {
    dispatchSpy = jest.fn();
    store = mockStore({
      user: {
        isLogged: false,
      },
    });

    store.dispatch = dispatchSpy;
  });

  it('should render Appbar with the correct initial state', async () => {
    const { getByText } = render(
      <Provider store={store}>
         <Router> {/* Wrap your component with BrowserRouter */}
          <Appbar />
        </Router>
      </Provider>
    );

    expect(getByText('Ramp up Project')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  it('should dispatch login action on login button click', async () => {
    const { getByText } = render(
      <Provider store={store}>
         <Router > 
          <Appbar />
        </Router>
      </Provider>
    );

    // Click the Login button
    fireEvent.click(getByText('Login'));

    // Assert dispatch actions
    expect(dispatchSpy).toHaveBeenCalledWith(login({ user: 'test' }));
  });

 
});
