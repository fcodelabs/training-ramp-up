import React from "react";
import { GridActionsColumn } from "../containers/Home/Table/TableColumns/ActionColumn/ActionColumn";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material/styles";
import { DataGrid, GridColDef, GridRenderCellParams, GridValidRowModel } from "@mui/x-data-grid";
import { FixedColumns } from "../containers/Home/Table/TableColumns/FixedColumns/FixedColumns";

const theme = createTheme();

const handleSaveClick = jest.fn();
const handleCancelClick = jest.fn();
const handleEditClick = jest.fn();
const handleDeleteClick = jest.fn();



const rows: GridValidRowModel[] = [
  {
    id: 1,
    name: "John Doe",
    gender: "Male",
    address: "123 Main St",
    mobile: "555-1234",
    birthday: "1990-05-15",
    age: "32",
    action: "",
    isNew: true,
  },
  {
    id: 2,
    name: "Jane Doe",
    gender: "Female",
    address: "456 Oak St",
    mobile: "555-5678",
    birthday: "1985-08-22",
    age: "37",
    action: "",
    isNew: false,
  },
  {
    id: 3,
    name: "Bob Johnson",
    gender: "Male",
    address: "789 Elm St",
    mobile: "555-9876",
    birthday: "1978-03-10",
    age: "44",
    action: "",
    isNew: true,
  },
  {
    id: 4,
    name: "Alice Smith",
    gender: "Female",
    address: "101 Pine St",
    mobile: "555-5432",
    birthday: "1995-12-01",
    age: "26",
    action: "",
    isNew: false,
  },
  {
    id: 5,
    name: "Charlie Brown",
    gender: "Male",
    address: "202 Maple St",
    mobile: "555-8765",
    birthday: "1982-09-18",
    age: "39",
    action: "",
    isNew: true,
  },
  {
    id: 6,
    name: "Eva Green",
    gender: "Female",
    address: "303 Cedar St",
    mobile: "555-2345",
    birthday: "1998-06-25",
    age: "23",
    action: "",
    isNew: false,
  },
];

test("Grid with actions column renders without errors", () => {
  const columns: GridColDef[] = [
    ...FixedColumns,
    {
      field: "actions",
      type: "actions",
      renderCell: (params: GridRenderCellParams) => (
        <GridActionsColumn
          params={params}
          isInEditMode={true}
          handleSaveClick={() => handleSaveClick(params)}
          handleCancelClick={() => handleCancelClick(params.id)}
          handleEditClick={() => handleEditClick(params.id)}
          handleDeleteClick={() => handleDeleteClick(params.id)}
        />
      ),
    },
  ];
  
  render(
    <ThemeProvider theme={theme}>
      <div >
        <DataGrid rows={rows} columns={columns} />
      </div>
    </ThemeProvider>
  );

});
