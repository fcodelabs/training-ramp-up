import { DataGrid, GridColumnMenu, GridColumnMenuProps } from '@mui/x-data-grid';
import styled from 'styled-components';
import * as React from 'react';
import Button from '@mui/material/Button';
import "./test.css"
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
import { useAppSelector } from '../../../Redux/hooks';

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
    "&. MuiDataGrid-root-MuiDataGrid-menuIcon": {
        display: 'none !important',
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



const emptyRows: GridRowsProp = [
    { id: 1, uid: 1,name: '', gender: '', address: '', mobile: '', birthday: '', age: '', action: '' },
    { id: 2, uid: 2,name: '', gender: '', address: '', mobile: '', birthday: '', age: '', action: '' },
    { id: 3, uid: 3,name: '', gender: '', address: '', mobile: '', birthday: '', age: '', action: '' },

]

const colStyles = { flex: 1, minWidth: 100, sortable:false ,editable: true, renderCell: () => <Skeleton animation="wave" height={20} width={80} /> 
}

const emptyColumns: GridColDef[] =
    [
        { field: 'uid', headerName: 'ID', type: 'number', ...colStyles },
        { field: 'name', headerName: 'Name', type: 'string', ...colStyles },
        { field: 'gender', headerName: 'Gender', type: 'singleSelect', ...colStyles },
        { field: 'address', headerName: 'Address', type: 'string', ...colStyles },
        { field: 'mobile', headerName: 'Mobile No.', ...colStyles },
        { field: 'birthday', headerName: 'Date of Birth', type: 'date', ...colStyles },
        { field: 'age', headerName: 'Age', type: 'number', ...colStyles },
        { field: 'action', headerName: 'Action', type: 'number', ...colStyles }

    ];

const Table = () => {
    const initialRows: GridRowsProp = useAppSelector((state) => state.user.rows);
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
        { field: 'uid', headerName: 'ID', type: 'number', flex: 0.2, minWidth: 40, editable: true , sortable: false, },
        { field: 'name', headerName: 'Name', type: 'string', flex: 1, minWidth: 100, editable: true , sortingOrder:[ 'desc', 'asc'], renderHeader: (params) => {
            return (
                <div style={{paddingRight:'50px'}}>
                   Name
                </div>
                   
            
            )
        }},
        { field: 'gender', headerName: 'Gender', type: 'singleSelect', flex: 1, minWidth: 100, valueOptions: genders, sortable: false, editable: true },
        { field: 'address', headerName: 'Address', type: 'string', flex: 1, minWidth: 100, sortable: false, editable: true },
        {
            field: 'mobile', headerName: 'Mobile No.', flex: 1, minWidth: 100, sortable: false, editable: true,
            renderEditCell: (params) => {
                if (params.field === 'mobile') {
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
        { field: 'birthday', headerName: 'Date of Birth', type: 'date', flex: 1, minWidth: 100, editable: true, sortingOrder:[ 'desc', 'asc'], renderHeader: (params) => {
            return (
                <div style={{paddingRight:'25px'}}>
                   Date of Birth
                </div>
            )
        } },
        { field: 'age', headerName: 'Age', type: 'number', flex: 0.4, minWidth: 40, sortable: false, editable: true },
        {
            field: 'actions',
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

    function CustomColumnMenu(props: GridColumnMenuProps) {
        return (
          <GridColumnMenu
            {...props}
            slotProps={{
            
              columnMenuSortItem: {
                displayOrder: 0, // Previously `0`
              },

            }}
          />
        );
      }
      


    return (
        <Container>
            <Title>User Details</Title>
            <ButtonWrapper>
                <Button variant="contained">Add new</Button>
            </ButtonWrapper>
            {rows.length === 0 ? (
                <StyledDataGrid
                    rows={emptyRows}
                    columns={emptyColumns}
                    checkboxSelection

                />
            ) : (
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
                    disableColumnMenu
                    slots={{
                        columnMenu: CustomColumnMenu,
                     
                    }}
                />
            )}
            <ErrorPopup open={isErrorPopupOpen} onClose={handleCloseErrorPopup} />

        </Container>
    )
}

export default Table;