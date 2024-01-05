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
import {FixedColumns} from './TableColumns/FixedColumns/FixedColumns';
import ErrorPopup from '../../../Components/ErrorNotification/ErrorNotification';
import { useAppSelector } from '../../../Redux/hooks';
import { emptyColumns, emptyRows } from './TableColumns/TableSkeletons/TableSkeletons';
import { Container, ButtonWrapper, StyledDataGrid, Title } from '../../../Utilities/TableStyles';
import GridActionsColumn from './TableColumns/ActionColumn/ActionColumn';
import { randomId } from '@mui/x-data-grid-generator';


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
            [id]: { mode: GridRowModes.View, ignoreModifications: true }});
        
        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id)) }
    };

    const columns: GridColDef[] = [
        ...FixedColumns, {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            minWidth: 200,
            cellClassName: 'actions',
            renderCell: ({ id }) => (
                <GridActionsColumn
                    id={id}
                    isInEditMode={rowModesModel[id]?.mode === GridRowModes.Edit}
                    handleSaveClick={handleSaveClick(id)}
                    handleCancelClick={handleCancelClick(id)}
                    handleEditClick={handleEditClick(id)}
                    handleDeleteClick={handleDeleteClick(id)}
                />
                )}
    ];
    React.useEffect(() => {
        if (rows.length === 0)
            setIsErrorPopupOpen(true);

    }, []);
    
    const maxId = rows.reduce((max, row) => (row.id > max ? row.id : max), 0);  
    const handleClick = () => {
          const id = maxId + 1;
          setRows((oldRows) => [ { id, uid: id, name: '', gender: '', address: '', mobile: '', birthday: '', age: '', action: '' }, ...oldRows,]);
          setRowModesModel((oldModel) => ({ ...oldModel, [id]: { mode: GridRowModes.Edit, fieldToFocus: 'uid' },
          }));
        };
  
    return (
        <Container>
            <Title>User Details</Title>
            <ButtonWrapper>
                <Button variant="contained" onClick={handleClick}>Add new</Button>
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