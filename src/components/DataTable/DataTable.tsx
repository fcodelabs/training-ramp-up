import * as React from 'react';
import { styled, Button, Box } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    borderRadius:'0',
    '& .MuiDataGrid-columnHeader': {
      backgroundColor: 'rgba(33, 150, 243, 0.08)', 
    },
    '& .MuiDataGrid-cell': {
      padding: '16px',
    },
}));

const StyledButtonBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap:'32px',
  padding: '0',
}));

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID',sortable: false, width: 64, disableColumnMenu: true, type: 'number'},
  { field: 'name', headerName: 'Name', width: 135, disableColumnMenu: true, type: 'string' },
  { field: 'gender', headerName: 'Gender', width: 137, disableColumnMenu: true , sortable: false, type: 'string' },
  { field: 'address', headerName: 'Address', width: 137, disableColumnMenu: true, sortable: false, type: 'string' },
  { field: 'mobileNumber', headerName: 'Mobile No:', width: 135, disableColumnMenu: true, sortable: false, type: 'string' },
  { field: 'birthday', headerName: 'Date of Birth', width: 175, disableColumnMenu: true, type: 'date',
  valueFormatter: (params) => {
    const valueFormatted = params.value instanceof Date ? params.value.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : '';
    return valueFormatted;
  },
  },
  { field: 'age',headerName: 'Age',width: 101, disableColumnMenu: true, sortable: false, type: 'number', headerAlign:'left', align:'left',
  valueGetter(params) {
    return new Date().getFullYear() - params.row.birthday.getFullYear();
  },
  },
  { field: 'actions',headerName: 'Actions',width: 216, disableColumnMenu: true, sortable: false,
    renderCell: (params: GridRenderCellParams) => (
       <StyledButtonBox>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => {
            console.log("Edit button clicked");
          }}
        >
          EDIT
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => {
            console.log("Delete button clicked");
          }}
        >
          REMOVE
        </Button>
      </StyledButtonBox>    
    ),
  }
];

interface IDataTableProps {
  rows: {
    id: number;
    name: string;
    gender: string;
    address: string;
    mobileNumber: string;
    birthday: Date;
  }[];
}

export default function DataTable({ rows }: IDataTableProps) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick = {true}
      />
    </div>
  );
}