import styled from 'styled-components';
import Appbar from '../../Components/Appbar/Appbar';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import { TextField } from '@mui/material';


const HomeWarpper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

const ContainerWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    display: flex;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
   
`;

const Title = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px 15px 5px 15px;
    font-size: 24px;
    font-weight: 500;
    font-style: normal;
    justify-content: flex-start;

    @media screen and (max-width: 768px) {
        justify-content: center;
    
    }`

const ButtonWrapper = styled.div`
    padding: 5px 15px 15px 15px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    
    @media screen and (max-width: 768px) {
        justify-content: center;
    
    }`


const StyledDataGrid = styled(DataGrid)((theme) => ({
    '& .MuiDataGrid-root': {
        minWidth:'700px !important',
    },

    '& .MuiDataGrid-sortIcon': {
        opacity: '1 !important',
        visibility: 'visible',
    },
    "& .MuiDataGrid-iconButtonContainer": {
        visibility: 'visible',
    },

    "& .MuiDataGrid-columnHeaderTitleContainer": {
        justifyContent: 'space-between',
    },
    "& .MuiDataGrid-columnSeparator": {
        display: 'none !important',
    },
    "& .MuiDataGrid-columnHeader": {
        backgroundColor: 'rgba(33, 150, 243, 0.1) !important',}

}));


const genders = ['Male', 'female', 'other'];

const initialRows: GridRowsProp = [
    { id: 1, col1: 1, col2: 'World', col3: 'Male', col4: 'Kathmandu', col5: '9841000000', col6: randomCreatedDate(), col7: '30' },
    { id: 2, col1: 2, col2: 'is Awesome', col3: 'Male', col4: 'Kathmandu', col5: '9841000000', col6: randomCreatedDate(), col7: '30' },
    { id: 3, col1: 3, col2: 'is Amazing', col3: 'Female', col4: 'Kathmandu', col5: '9841000000', col6: randomCreatedDate(), col7: '30' },
];


export default function Home() {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    
    const getRowHeight = (params: { id: GridRowId }) => {
        return rowModesModel[params.id]?.mode === GridRowModes.Edit ? 100 : 50;
    };
        


    const columns: GridColDef[] = [
        { field: 'col1', headerName: 'ID', flex:1, sortingOrder: ['desc', 'asc'], editable: true },
        { field: 'col2', headerName: 'Name', flex: 1, editable: true },
        { field: 'col3', headerName: 'Gender', type: 'singleSelect', valueOptions: genders, flex: 1, editable: true },
        { field: 'col4', headerName: 'Address', flex: 1, sortable: false, editable: true },
        { field: 'col5', headerName: 'Mobile No.', flex: 1, sortable: false, editable: true , 
        renderEditCell: (params) => {
            if (params.field === 'col5') {
                // Render a phone number input
                return (
                    <TextField
                        fullWidth
                        type="tel"
                        label="+"
                        variant="outlined"
                        style={{border: '1px solid #e0e0e0'}}
                        value={params.value || ''}
                        onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })}
                    />
                );
            }}},
        { field: 'col6', headerName: 'Date of Birth', type: 'date', flex: 1, sortingOrder: ['desc', 'asc'], editable: true },
        { field: 'col7', headerName: 'Age', flex: 1, editable: true },
        {
            field: 'col8',
            type: 'actions',
            headerName: 'Actions',
            flex: 2,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                       
                        <GridActionsCellItem
                            icon={<Button variant='outlined'>Add</Button>}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<Button variant='outlined' color='error'>Discard Changes</Button>}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<Button variant='outlined' >Edit</Button>}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<Button variant= 'outlined' color='error'>Remove</Button> }
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <HomeWarpper>
            <Appbar />
            <ContainerWrapper>

                <Container>
                    <Title>User Details</Title>
                    <ButtonWrapper>
                        <Button variant="contained">Add new</Button>
                    </ButtonWrapper>

                    <StyledDataGrid
                        rows={rows}
                        columns={columns}
                        editMode="row"
                        rowModesModel={rowModesModel}
                        checkboxSelection
                        onRowModesModelChange={handleRowModesModelChange}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                        getRowHeight={getRowHeight}
                    />
                </Container>
            </ContainerWrapper>
        </HomeWarpper>
    );

}

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import { DataGrid } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

// export default function AutoHeightGrid() {
//   const [nbRows, setNbRows] = React.useState(3);
//   const removeRow = () => setNbRows((x) => Math.max(0, x - 1));
//   const addRow = () => setNbRows((x) => Math.min(100, x + 1));

//   const { data } = useDemoData({
//     dataSet: 'Commodity',
//     rowLength: 100,
//     maxColumns: 6,
//   });

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
//         <Button size="small" onClick={removeRow}>
//           Remove a row
//         </Button>
//         <Button size="small" onClick={addRow}>
//           Add a row
//         </Button>
//       </Stack>
//       <DataGrid autoHeight {...data} rows={data.rows.slice(0, nbRows)} />
//     </Box>
//   );
// }

