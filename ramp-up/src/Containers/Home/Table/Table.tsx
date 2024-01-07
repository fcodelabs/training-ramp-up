import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
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
import { FixedColumns } from './TableColumns/FixedColumns/FixedColumns';
import ErrorPopup from '../../../Components/ErrorNotification/ErrorNotification';
import { useAppSelector } from '../../../Redux/hooks';
import { emptyColumns, emptyRows } from './TableColumns/TableSkeletons/TableSkeletons';
import { Container, ButtonWrapper, StyledDataGrid, Title } from '../../../Utilities/TableStyles';
import GridActionsColumn from './TableColumns/ActionColumn/ActionColumn';


const Table = () => {
    const initialRows: GridRowsProp = useAppSelector((state) => state.user.rows);
    const [rows, setRows] = useState(initialRows);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [notification, setNotification] = useState({ open: false, onConfirm: () => { }, type: '' });

    const handleCloseNotification = () => {
        setNotification({ open: false, onConfirm: () => { }, type: '' });
    };

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


    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const validateUser = (user: GridRowModel, requiredFields: string[]) => {
        for (const field of requiredFields) {
            const fieldValue = user[field as keyof GridRowModel];
            if (fieldValue === '' || fieldValue === null) {
                return false;
            }
        }
        return true
    };

    const handleSaveClick = (id: GridRowId) => () => {
        try {
            const editedRow = rows.find((row) => row.id === id)!;
            if (validateUser(editedRow, emptyColumns.map((column) => column.field))) {
                setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
                setNotification({
                    open: true,
                    onConfirm: handleCloseNotification,
                    type: 'SAVE_USER'
                })
            }
            else {
                setNotification({
                    open: true,
                    onConfirm: () => { },
                    type: 'MISSING_FIELDS'
                });
            }
        }
        catch (error) {
            console.log(error);
            setNotification({
                open: true,
                onConfirm: () => { },
                type: 'FAIL_SAVE_USER'
            });
        }
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        const confirmDelete = () => {
            setRows(rows.filter((row) => row.id !== id));
            handleCloseNotification();
        };

        setNotification({
            open: true,
            onConfirm: confirmDelete,
            type: 'DELETE_USER'
        });
    };

    const handleCancelClick = (id: GridRowId) => () => {
        const comfirmDiscard = () => {
            setRowModesModel({
                ...rowModesModel,
                [id]: { mode: GridRowModes.View, ignoreModifications: true }
            });

            const editedRow = rows.find((row) => row.id === id)!;
            console.log(editedRow, 'editrow')
            if (!validateUser(editedRow, emptyColumns.map((column) => column.field))) {
                setRows(rows.filter((row) => row.id !== id))
            }
        
            handleCloseNotification();
        }

        setNotification({
            open: true,
            onConfirm: comfirmDiscard,
            type: 'DISCARD_CHANGES'
        });
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
            )
        }
    ];

    const maxId = rows.reduce((max, row) => (row.id > max ? row.id : max), 0);
    const handleAddClick = () => {

        const id = maxId + 1;
        setRows((oldRows) => [{ id, uid: id, name: '', gender: '', address: '', mobile: '', birthday: '', age: '', action: '' }, ...oldRows,]);
        setRowModesModel((oldModel) => ({
            ...oldModel, [id]: { mode: GridRowModes.Edit, fieldToFocus: 'uid' },

        }));

    };

    return (
        <Container>
            <Title>User Details</Title>
            <ButtonWrapper>
                <Button variant="contained" onClick={handleAddClick}>Add new</Button>
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

            <ErrorPopup
                open={notification.open}
                onClose={handleCloseNotification}
                type={notification.type}
                onSubmit={notification.onConfirm} />

        </Container>
    )
}

export default Table;