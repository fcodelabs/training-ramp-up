import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid,GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


const columns: GridColDef[] = [
    { field: 'id',   headerName: 'ID',  headerClassName:'user-details',width: 137,sortable: false },
    {
      field: 'name',
      headerName: 'Name',
      headerClassName:'user-details',
      width: 135,
      editable: true,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      headerClassName:'user-details',
      sortable: false,
      width: 137,
      editable: true,
    },
    {
      field: 'address',
      headerName: 'Address',
      headerClassName:'user-details',
      sortable: false,
      width: 137,
      editable: true,
    },
    {
      field: 'mobileNo',
      headerName: 'Mobile No:',
      headerClassName:'user-details',
      sortable: false,
      type: 'number',
      headerAlign: 'left',
      width: 135,
      editable: true,
    },
    {
      field: 'dob',
      headerName: 'Date of Birth',
      headerClassName:'user-details',
      headerAlign: 'left',
      type: 'number',
      width: 175,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      headerClassName:'user-details',
      sortable: false,
      headerAlign: 'left',
      type: 'number',
      width: 101,
      editable: true,
    },
    {
      field: 'action',
      headerName: 'Action',
      headerClassName:'user-details',
      headerAlign: 'left',
      sortable: false,
      type: 'number',
      width: 190,
      editable: true,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  

export default function DataGrids() {
  return (
    
    <div 
    style={{
      minWidth:"1500px",
      justifyContent:"center",
      }}>
      
       <Box sx={{ 
      height: 'fit-content',  
      width: '80%',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      
      '& .user-details': {
          backgroundColor: 'rgba(33, 150, 243, 0.08)',
      }, }}>
               <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px", 
        padding:"16px",
        fontSize:"24px",
        fontWeight:"400",
        fontFamily:"Roboto,sans-serif",
        lineHeight:"32.02px",

      }}>
      User Details
      </div>
      <div
      style={{
        display: 'flex', 
        padding:"6px 16px 6px 16px",
        justifyContent: 'flex-end',

      }}>
      <Button variant="contained" size='medium'>ADD NEW</Button>
      </div>
     
     <DataGrid
      
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
       
        pageSizeOptions={[5,10,15]}
        checkboxSelection
        disableRowSelectionOnClick
        
      />
    </Box>
    </div>
   
  )
}
