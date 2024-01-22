import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NotificationPopup from '../components/Notification/Notification';

// Mock the onSubmit and onClose functions
const mockSubmit = jest.fn();
const mockClose = jest.fn();
const defaultProps = {
    open: true,
    onClose: mockClose,
    type: 'TABLE_ERROR',
    onSubmit: mockSubmit,
  };

const renderComponent = (props: any) => {
  return render(<NotificationPopup {...props} />);
};

describe('NotificationPopup', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with TABLE_ERROR type', () => {
    const { getByText } = renderComponent({
      ...defaultProps});

    expect(getByText('Unable to retrieve table details. Please try again later.')).toBeInTheDocument();
    expect(getByText('Dismiss')).toBeInTheDocument();
    expect(getByText('Confirm')).toBeInTheDocument();
  });

  it('renders with ADD_USER type', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      type: 'ADD_USER',
    });

    expect(getByText('A new student added successfully')).toBeInTheDocument();
    expect(getByText('Confirm')).toBeInTheDocument();
  });

  it('renders with SAVE_USER type', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      type: 'SAVE_USER',
    });

    expect(getByText('Student details updated successfully')).toBeInTheDocument();
    expect(getByText('Confirm')).toBeInTheDocument();
  });

  it('renders with MISSING_FIELDS type', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      type: 'MISSING_FIELDS',
    });

    expect(getByText('Mandatory fields missing.')).toBeInTheDocument();
    expect(getByText('keep editing')).toBeInTheDocument();
  });

  it('renders with DISCARD_CHANGES type', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      type: 'DISCARD_CHANGES',
    });

    expect(getByText('Discard changes?')).toBeInTheDocument();
    expect(getByText('Dismiss')).toBeInTheDocument();
    expect(getByText('Confirm')).toBeInTheDocument();
  });

  it('renders with SAVE_NEW_USER type', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      type: 'SAVE_NEW_USER',
    });

    expect(getByText('A new student added successfully')).toBeInTheDocument();
    expect(getByText('ok')).toBeInTheDocument();
  });

  it('renders with FAIL_SAVE_NEW_USER type', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      type: 'FAIL_SAVE_NEW_USER',
    });

    expect(getByText('Unable to add the new student. Please try again later')).toBeInTheDocument();
    expect(getByText('try again')).toBeInTheDocument();
  });

  it('renders with DELETE_USER type', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      type: 'DELETE_USER',
    });

    expect(getByText('Are you sure you want to remove this student?')).toBeInTheDocument();
    expect(getByText('Dismiss')).toBeInTheDocument();
    expect(getByText('Confirm')).toBeInTheDocument();
  });

  it('renders with DELETE_USER_SUCCESS type', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      type: 'DELETE_USER_SUCCESS',
    });

    expect(getByText('Student deleted successfully')).toBeInTheDocument();
    expect(getByText('ok')).toBeInTheDocument();
  });

   it('renders with FAIL_UPDATE_USER type', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      type: 'FAIL_UPDATE_USER',
    });

    expect(getByText('Cannnot update the student details. Please try again later')).toBeInTheDocument();
    expect(getByText('try again')).toBeInTheDocument();
   });

  // Add more test cases as needed
});
