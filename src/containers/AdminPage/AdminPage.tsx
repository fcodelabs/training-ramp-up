import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import "@fontsource/roboto";
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

const generateId = () => {
    return Math.floor(Math.random() * 1000);
};

const handleEdit = () => {
    console.log('edit');
};

const handleDelete = () => {
    console.log('delete');
};

const StyledEditButton = styled(Button)`
&&&{
    border-color: #2196F380;
    color: #2196F3;
    font-family: Roboto;
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    Letter-spacing: 0.46px;
    }
`;

const StyledRemoveButton = styled(Button)`
&&&{
    border-color: #D32F2F80;
    color: #D32F2F;
    margin-left: 30px;
    font-family: Roboto;
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    Letter-spacing: 0.46px;
    }
`;

const StyledGridTitle = styled(Typography)`
&&&{
    display: flex;
    font-family: Roboto;
    font-weight: 400;
    font-size: 24px;
    line-height: 32.02px;
    color: #000000DE;
    align-items: flex-start;
    
    padding: 16px;
    }
`;

const StyledButtonBox = styled(Box)`
&&&{
    display: flex;
    justify-content: flex-end;
    padding: 16px;
    }
`;

const StyledAddButton = styled(Button)`
&&&{
    background-color: #2196F3;
    color: #FFFFFF;
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    Letter-spacing: 0.4px;
    }
`;

const StyledDataTableBox = styled(Box)`
  &&& {
    width: 1152px;
    height: auto;
    border-radius: 4px;
    background: #FFFFFF;
    box-shadow: 0px 2px 1px -1px #00000033, 
                0px 1px 1px 0px #00000024, 
                0px 1px 3px 0px #0000001F;
    
    fontFamily: 'Roboto';
    fontWeight: 400;
    fontSize: 14px;
    lineHeight: 20.02px;
    letterSpacing: 0.17px;
  }
`;

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 86, editable: false, sortable: false, disableColumnMenu: true, headerClassName: 'custom-header' },
    { field: 'name', headerName: 'Name', width: 135, sortable: true, disableColumnMenu: true, headerClassName: 'custom-header' },
    { field: 'gender', headerName: 'Gender', width: 135, sortable: false, disableColumnMenu: true, headerClassName: 'custom-header' },
    { field: 'address', headerName: 'Address', width: 135, sortable: false, disableColumnMenu: true, headerClassName: 'custom-header' },
    { field: 'mobile', headerName: 'Mobile No:', width: 135, sortable: false, disableColumnMenu: true, headerClassName: 'custom-header' },
    { field: 'dob', headerName: 'Date of Birth', width: 175, sortable: true, disableColumnMenu: true, headerClassName: 'custom-header' },
    { field: 'age', headerName: 'Age', width: 101, disableColumnMenu: true, sortable: false, headerClassName: 'custom-header' },
    {
        field: 'action',
        headerName: 'Action',
        width: 195,
        disableColumnMenu: true,
        sortable: false,
        headerClassName: 'custom-header',
        renderCell: (params) => (
            <div>

                <StyledEditButton variant="outlined" size='small'>EDIT</StyledEditButton>
                <StyledRemoveButton variant="outlined" size='small'>REMOVE</StyledRemoveButton>
            </div>
        ),
    },
];

const rows = [
    { id: generateId(), name: 'Snow', age: 35, gender: 'Male', address: 'Delhi', mobile: '1234567890', dob: 'Sun Dec 03 2000' },
    { id: generateId(), name: 'Lannister', age: 42, gender: 'Male', address: 'Delhi', mobile: '1234567890', dob: 'Sun Dec 03 2000' },
    { id: generateId(), name: 'Sersi', age: 45, gender: 'Male', address: 'Delhi', mobile: '1234567890', dob: 'Sun Dec 03 2000' },
    { id: generateId(), name: 'Stark', age: 16, gender: 'Male', address: 'Delhi', mobile: '1234567890', dob: 'Sun Dec 03 2000' },
    { id: generateId(), name: 'Targaryen', age: null, gender: 'Male', address: 'Delhi', mobile: '1234567890', dob: 'Sun Dec 03 2000' },
    { id: generateId(), name: 'Melisandre', age: 150, gender: 'Male', address: 'Delhi', mobile: '1234567890', dob: 'Sun Dec 03 2000' },

];

export default function DataTable() {
    return (
        <StyledDataTableBox sx={{
            '& .custom-header': {
                backgroundColor: '#2196F330'
            },
            '& .MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox': {
                backgroundColor: '#2196F330'
            },
        }}>
            <StyledGridTitle variant="h4">User Details</StyledGridTitle>
            <StyledButtonBox>
                <StyledAddButton variant="contained">ADD NEW</StyledAddButton>
            </StyledButtonBox>
            <DataGrid
                sx={{
                    '.MuiDataGrid-columnSeparator': {
                        display: 'none',
                    },
                    '&.MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .custom-header': {
                        backgroundColor: '#2196F330'
                    },
                    '& .MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox': {
                        backgroundColor: '#2196F330'
                    },
                }}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </StyledDataTableBox>
    );
}