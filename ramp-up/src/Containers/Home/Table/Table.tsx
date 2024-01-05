import * as React from 'react';
import Button from '@mui/material/Button';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    GridColDef,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import ErrorPopup from '../../../Components/ErrorNotification/ErrorNotification';
import { useAppSelector } from '../../../Redux/hooks';
import { emptyColumns, emptyRows } from './TableSkeletons/TableSkeletons';
import { Container, ButtonWrapper, StyledDataGrid, Title } from '../../../Utilities/TableStyles';


const Table = () => {
    const genders = ['Male', 'female', 'other'];
    const initialRows: GridRowsProp = useAppSelector((state) => state.user.rows);
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState<boolean>(false);
   
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
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

    const handleCloseErrorPopup = () => {
        setIsErrorPopupOpen(false);
    };

    const handleEditClick = (id: GridRowId) => () => {
        console.log(id);
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

    const columns: GridColDef[] = [
       
    ];


    React.useEffect(() => {
        if (rows.length === 0)
            setIsErrorPopupOpen(true);

    }, []);

   

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
                />
            )}
            <ErrorPopup open={isErrorPopupOpen} onClose={handleCloseErrorPopup} />

        </Container>
    )
}

export default Table;