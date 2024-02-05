import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '../components/Loading/Loading';

describe('LoadingComponent', () => {
  it('should render the LoadingComponent with CircularProgress', () => {
    const { getByTestId } = render(<Loading />);

    expect(getByTestId('circular-progress')).toBeInTheDocument();
  });

});
