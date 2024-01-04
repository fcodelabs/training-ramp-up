import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
import * as React from 'react';
import Button from '@mui/material/Button';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    GridColDef,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
} from '@mui/x-data-grid-generator';
import { Skeleton, TextField } from '@mui/material';
import ErrorPopup from '../../../Components/ErrorNotification/ErrorNotification';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 70%;
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
        backgroundColor: 'rgba(33, 150, 243, 0.1) !important'
    },

    '& .MuiDataGrid-cell:focus-within': {
        outline: 'none !important',
    },
}));


const genders = ['Male', 'female', 'other'];

const initialRows: GridRowsProp = [
    // { id: 1, col1: 1, col2: 'World', col3: 'Male', col4: 'Kathmandu', col5: '9841000000', col6: randomCreatedDate(), col7: '30' },
    // { id: 2, col1: 2, col2: 'is Awesome', col3: 'Male', col4: 'Kathmandu', col5: '9841000000', col6: randomCreatedDate(), col7: '30' },
    // { id: 3, col1: 3, col2: 'is Amazing', col3: 'Female', col4: 'Kathmandu', col5: '9841000000', col6: randomCreatedDate(), col7: '30' },
];

const emptyRows: GridRowsProp = [
    { id: 1, col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '' },
    { id: 2, col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '' },
    { id: 3, col1: '', col2: '', col3: '', col4: '', col5: '', col6: '', col7: '' },

]

const emptyColumns: GridColDef[] =
    [
        { field: 'col1', headerName: 'ID', type: 'number', flex: 1, minWidth: 100, editable: true, renderCell: () => <Skeleton animation="wave" height={20} width={80} /> },
        { field: 'col2', headerName: 'Name', type: 'string', flex: 1, minWidth: 100, editable: true, renderCell: () => <Skeleton animation="wave" height={20} width={80} /> },
        { field: 'col3', headerName: 'Gender', type: 'singleSelect', flex: 1, minWidth: 100, valueOptions: genders, sortable: false, editable: true, renderCell: () => <Skeleton animation="wave" height={20} width={80} /> },
        { field: 'col4', headerName: 'Address', type: 'string', flex: 1, minWidth: 100, sortable: false, editable: true, renderCell: () => <Skeleton animation="wave" height={20} width={80} /> },
        { field: 'col5', headerName: 'Mobile No.', flex: 1, minWidth: 100, sortable: false, editable: true, renderCell: () => <Skeleton animation="wave" height={20} width={80} /> },
        { field: 'col6', headerName: 'Date of Birth', type: 'date', flex: 1, minWidth: 100, editable: true, renderCell: () => <Skeleton animation="wave" height={20} width={80} /> },
        { field: 'col7', headerName: 'Age', type: 'number', flex: 1, minWidth: 100, sortable: false, editable: true, renderCell: () => <Skeleton animation="wave" height={20} width={80} /> },
        { field: 'col8', headerName: 'Action', type: 'number', flex: 1, minWidth: 200, sortable: false, editable: true, renderCell: () => <Skeleton animation="wave" height={20} width={80} /> },

    ];

const Table = () => {

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
        return rowModesModel[params.id]?.mode === GridRowModes.Edit ? 100 : 60;
    };


    const columns: GridColDef[] = [
        { field: 'col1', headerName: 'ID', type: 'number', flex: 1, minWidth: 100, editable: true },
        { field: 'col2', headerName: 'Name', type: 'string', flex: 1, minWidth: 100, editable: true },
        { field: 'col3', headerName: 'Gender', type: 'singleSelect', flex: 1, minWidth: 100, valueOptions: genders, sortable: false, editable: true },
        { field: 'col4', headerName: 'Address', type: 'string', flex: 1, minWidth: 100, sortable: false, editable: true },
        {
            field: 'col5', headerName: 'Mobile No.', flex: 1, minWidth: 100, sortable: false, editable: true,
            renderEditCell: (params) => {
                if (params.field === 'col5') {
                    return (
                        <TextField
                            fullWidth
                            type="tel"
                            placeholder='+'
                            variant="outlined"
                            style={{ border: '1px solid #e0e0e0' }}
                            value={params.value || ''}
                            onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })}
                        />
                    );
                }
            }
        },
        { field: 'col6', headerName: 'Date of Birth', type: 'date', flex: 1, minWidth: 100, editable: true },
        { field: 'col7', headerName: 'Age', type: 'number', flex: 1, minWidth: 100, sortable: false, editable: true },
        {
            field: 'col8',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            minWidth: 200,
            cellClassName: 'actions',
            renderCell: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <GridActionsCellItem
                                icon={<Button variant='outlined'>Add</Button>}
                                label="Save"
                                sx={{
                                    color: 'primary.main',
                                }}
                                onClick={handleSaveClick(id)}
                            />
                            <GridActionsCellItem
                                icon={<Button variant='outlined' color='error'>Discard Changes</Button>}
                                label="Cancel"
                                className="textPrimary"
                                onClick={handleCancelClick(id)}
                                color="inherit"
                            />
                        </div>

                    );
                }
                return (
                    <>
                        <GridActionsCellItem
                            icon={<Button variant='outlined'>Edit</Button>}
                            label="Edit"
                            className="textPrimary"
                            onClick={handleEditClick(id)}
                            color="inherit"
                        />
                        <GridActionsCellItem
                            icon={<Button variant='outlined' color='error'>Remove</Button>}
                            label="Remove"
                            onClick={handleDeleteClick(id)}
                            color="inherit"
                        />
                    </>
                );

            },

        },
    ];

    const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (rows.length === 0)
            setIsErrorPopupOpen(true);

    }, []);

    const handleCloseErrorPopup = () => {
        setIsErrorPopupOpen(false);
    };



    return (
        <Container>
            <Title>User Details</Title>
            <ButtonWrapper>
                <Button variant="contained">Add new</Button>
            </ButtonWrapper>
            {rows.length === 0 ? (
                <DataGrid
                    rows={emptyRows}
                    columns={emptyColumns}
                    checkboxSelection

                />
            ) : (
                <DataGrid
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
            )}
            <ErrorPopup open={isErrorPopupOpen} onClose={handleCloseErrorPopup} />

        </Container>
    )
}

export default Table;