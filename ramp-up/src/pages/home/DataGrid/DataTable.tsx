import React from 'react';
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '13px',
            fontFamily: 'Roboto,sans-serif',
            fontWeight: 500,
            lineHeight: '22px',
            letterSpacing: '0.46px',
            padding: '4px 10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:'var(--borderRadius, 4px)',
          },
        },
      },
    },
  });

const StyledDataGrid = styled(DataGrid)((theme) => ({
    "& .MuiDataGrid-columnHeaderTitle": {
        fontWeight: 400, 
    },
    "& .MuiDataGrid-columnHeaders": {
        fontWeight: 400,
        borderRadius: "var(--none, 0px)",
        borderBottom: "1px solid var(--divider, rgba(0, 0, 0, 0.12))",
        borderLeft: "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
        borderRight: "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
        borderTop: "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
        background: "var(--primary-selected, rgba(33, 150, 243, 0.08))",
    },
    "& .MuiDataGrid-sortIcon": {
        opacity: 'inherit !important',
      },
      
    "& .MuiDataGrid-iconButtonContainer": {
        visibility: 'visible',
    }
    }
    ));

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID',sortable: false, },
        { field: 'name', headerName: 'Name'},
        { field: 'Gender', headerName: 'Gender', sortable: false,},
        { field: 'Address', headerName: 'Address', sortable: false,},
        { field: 'Mobile', headerName: 'Mobile No:', sortable: false,},
        { field: 'DOB', headerName: 'Date of Birth',width:150},
        { field: 'Age', headerName: 'Age', sortable: false,},
        { field: 'Action', headerName: 'Action', sortable: false, width:250,
        renderCell: (params: GridCellParams) => {
            return (
                <div 
                style={{
                    display:"flex",
                    flexDirection:"row",
                    gap:"32px",
                    }}>
                        <ThemeProvider theme={theme}>
                        <Button variant='outlined'>edit</Button>
                        </ThemeProvider>
                   
                    <ThemeProvider theme={theme}>
                        <Button variant='outlined' color='error'>remove</Button>
                        </ThemeProvider>
                </div>
            );
        },
    },
    ]

function DataTable(){
    return(
     <div style={{ height: 400, width: '100%' }}>
      <StyledDataGrid
        sx={{ '&, [class^=MuiDataGrid-root]': { border: 'none' } }}
        rows={[{id:1,}]}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableColumnMenu={true}
        sortModel={[
            {
              field: 'id',
              sort: 'asc',
            },
            { field: 'name', 
            sort: 'desc' 
        },
          
        ]}
        
      />
        </div>
    );
}

export default DataTable;