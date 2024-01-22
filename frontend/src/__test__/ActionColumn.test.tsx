import React from "react";
import GridActionsColumn from "../containers/Home/Table/TableColumns/ActionColumn/ActionColumn";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { GridApi, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { GridStateColDef } from "@mui/x-data-grid/internals";
// Mock the functions passed as props
const mockProps = {
  params: {
    row: { isNew: false },
    api: {} as GridApi,
  },
  isInEditMode: false,
  handleSaveClick: jest.fn(),
  handleCancelClick: jest.fn(),
  handleEditClick: jest.fn(),
  handleDeleteClick: jest.fn(),
};

test("renders Edit mode buttons", () => {
  mockProps.isInEditMode = true;
  render(<GridActionsColumn {...mockProps} />);

  const addUpdateButton = screen.getByText(/Add|Update/i);
  const discardChangesButton = screen.getByText(/Discard Changes/i);

  expect(addUpdateButton).toBeInTheDocument();
  expect(discardChangesButton).toBeInTheDocument();

  fireEvent.click(addUpdateButton);
  fireEvent.click(discardChangesButton);

  // You can also test that the click handlers were called
  expect(mockProps.handleSaveClick).toHaveBeenCalledTimes(1);
  expect(mockProps.handleCancelClick).toHaveBeenCalledTimes(1);
});

test("renders View mode buttons", () => {
  mockProps.isInEditMode = false;
  render(<GridActionsColumn {...mockProps} />);

  const editButton = screen.getByText(/Edit/i);
  const removeButton = screen.getByText(/Remove/i);

  expect(editButton).toBeInTheDocument();
  expect(removeButton).toBeInTheDocument();

  fireEvent.click(editButton);
  fireEvent.click(removeButton);

  // You can also test that the click handlers were called
  expect(mockProps.handleEditClick).toHaveBeenCalledTimes(1);
  expect(mockProps.handleDeleteClick).toHaveBeenCalledTimes(1);
});

