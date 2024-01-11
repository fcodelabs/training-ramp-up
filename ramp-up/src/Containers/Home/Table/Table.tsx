import Button from '@mui/material/Button'
import React from 'react'
import { useState } from 'react'
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    GridColDef,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    useGridApiRef,
    GridRenderEditCellParams,
} from '@mui/x-data-grid'
import { FixedColumns } from './TableColumns/FixedColumns/FixedColumns'
import ErrorPopup from '../../../Components/Notification/Notification'
import { useAppSelector, useAppDispatch } from '../../../Redux/hooks'
import {
    emptyColumns,
    emptyRows,
} from '../../../Components/TableSkeletons/TableSkeletons'
import {
    Container,
    ButtonWrapper,
    StyledDataGrid,
    Title,
} from '../../../Utilities/TableStyles'
import GridActionsColumn from './TableColumns/ActionColumn/ActionColumn'
import { validateUser } from '../../../Utilities/ValidateUser'
import { addUser, discardUser } from '../../../Redux/user/userSlice'
import generateNewId from '../../../Utilities/generateRandomId'

const Table = () => {
    const initialRows: GridRowsProp = useAppSelector((state) => state.user.rows)
    const [rows, setRows] = useState(initialRows)
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
    const [notification, setNotification] = useState({
        open: false,
        onConfirm: () => {},
        type: '',
    })
    const dispatch = useAppDispatch()
    const apiRef = useGridApiRef()

    const handleCloseNotification = () => {
        setNotification({ open: false, onConfirm: () => {}, type: '' })
    }

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (
        params,
        event
    ) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true
        }
    }
    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false }
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
        return updatedRow
    }

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel)
    }

    const getRowHeight = (params: { id: GridRowId }) => {
        return rowModesModel[params.id]?.mode === GridRowModes.Edit ? 100 : 60
    }

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        })
    }

    const handleSaveClick = (params: GridRenderEditCellParams) => () => {
        const editedRow = initialRows.find((row) => row.id === params.id)!

        try {
            if (
                validateUser(
                    editedRow,
                    emptyColumns.map((column) => column.field)
                )
            ) {
                setRows(
                    rows.map((row) =>
                        row.id === params.id ? { ...row, error: false } : row
                    )
                )
                setRowModesModel({
                    ...rowModesModel,
                    [params.id]: { mode: GridRowModes.View },
                })
                if (editedRow.isNew) {
                    setNotification({
                        open: true,
                        onConfirm: handleCloseNotification,
                        type: 'SAVE_NEW_USER',
                    })
                } else {
                    setNotification({
                        open: true,
                        onConfirm: handleCloseNotification,
                        type: 'SAVE_USER',
                    })
                }
            } else {
                setRowModesModel({
                    ...rowModesModel,
                    [params.id]: { mode: GridRowModes.Edit },
                })
                setNotification({
                    open: true,
                    onConfirm: () => {},
                    type: 'MISSING_FIELDS',
                })
            }
        } catch (error) {
            setRows(
                rows.map((row) =>
                    row.id === params.id ? { ...row, error: true } : row
                )
            )
            setRowModesModel({
                ...rowModesModel,
                [params.id]: { mode: GridRowModes.View },
            })
            if (editedRow.isNew) {
                setNotification({
                    open: true,
                    onConfirm: () => {},
                    type: 'FAIL_SAVE_NEW_USER',
                })
            } else {
                setNotification({
                    open: true,
                    onConfirm: () => {},
                    type: 'FAIL_UPDATE_USER',
                })
            }
        }
    }

    const handleDeleteClick = (id: GridRowId) => () => {
        const confirmDelete = () => {
            setRows(rows.filter((row) => row.id !== id))
            dispatch(discardUser(Number(id)))
            handleCloseNotification()
            setNotification({
                open: true,
                onConfirm: handleCloseNotification,
                type: 'DELETE_USER_SUCCESS',
            })
        }

        setNotification({
            open: true,
            onConfirm: confirmDelete,
            type: 'DELETE_USER',
        })
    }

    const handleCancelClick = (id: GridRowId) => () => {
        const comfirmDiscard = () => {
            setRowModesModel({
                ...rowModesModel,
                [id]: { mode: GridRowModes.View, ignoreModifications: true },
            })
            if (rows.find((row) => row.id === id)!.isNew) {
                setRows(rows.filter((row) => row.id !== id))
                dispatch(discardUser(Number(id)))
            }
            handleCloseNotification()
        }

        setNotification({
            open: true,
            onConfirm: comfirmDiscard,
            type: 'DISCARD_CHANGES',
        })
    }

    const handleAddClick = () => {
        const id = generateNewId(rows)
        setRows((oldRows) => [
            {
                id,
                uid: id,
                name: '',
                gender: '',
                address: '',
                mobile: '',
                birthday: '',
                age: '',
                action: '',
                isNew: true,
                error: true,
            },
            ...oldRows,
        ])
        dispatch(
            addUser({
                id: id,
                uid: id,
                name: '',
                gender: '',
                address: '',
                mobile: '',
                birthday: new Date(),
                age: Number(),
            })
        )
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'uid' },
        }))
    }

    const columns: GridColDef[] = [
        ...FixedColumns,
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            minWidth: 200,
            cellClassName: 'actions',
            renderCell: (params) => (
                <GridActionsColumn
                    params={params}
                    isInEditMode={
                        rowModesModel[params.id]?.mode === GridRowModes.Edit
                    }
                    handleSaveClick={handleSaveClick(params)}
                    handleCancelClick={handleCancelClick(params.id)}
                    handleEditClick={handleEditClick(params.id)}
                    handleDeleteClick={handleDeleteClick(params.id)}
                />
            ),
        },
    ]

    return (
        <Container>
            <Title>User Details</Title>
            <ButtonWrapper>
                <Button variant="contained" onClick={handleAddClick}>
                    Add new
                </Button>
            </ButtonWrapper>
            {rows.length === 0 ? (
                <StyledDataGrid
                    rows={emptyRows}
                    columns={emptyColumns}
                    checkboxSelection
                />
            ) : (
                <StyledDataGrid
                    apiRef={apiRef}
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
                onSubmit={notification.onConfirm}
            />
        </Container>
    )
}

export default Table
