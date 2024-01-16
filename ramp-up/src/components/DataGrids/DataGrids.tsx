import * as React from 'react'
//import { useSelector, useDispatch } from 'react-redux';

import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { MenuItem, Select, TextField } from '@mui/material'

import DialogBox from '../DialogBox/DialogBox'
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridRenderCellParams,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid'

import { format } from 'date-fns'

const initialRows: GridRowsProp = [
  {
    id: 1,
    name: 'Henry',
    age: 25,
    gender: 'Male',
    address: 'Nuwaraeliya',
    mobileNo: '0712222220',
    dob: new Date('1990-01-01'),
  },
  {
    id: 2,
    name: 'John',
    age: 56,
    gender: 'Male',
    address: 'Gamp',
    mobileNo: '0712222220',
    dob: new Date('1990-01-01'),
  },
  {
    id: 3,
    name: 'Mark',
    age: 18,
    gender: 'Male',
    address: 'Col',
    mobileNo: '0712222220',
    dob: new Date('mon 1990-01-01'),
  },
  {
    id: 4,
    name: 'Fred',
    age: 5,
    gender: 'Male',
    address: 'Kand',
    mobileNo: '0712222220',
    dob: new Date('1990-01-01'),
  },
]
interface IRowData {
  id: number
  name: string
  gender: string
  address: string
  mobileNo: string
  dob: string
  age: number
  isNew?: boolean
}

export default function DataGrids() {
  const [rows, setRows] = React.useState(initialRows)
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  )
  const [removeDialogOpen, setRemoveDialogOpen] = React.useState(false)
  const [rowToRemoveId, setRowToRemoveId] = React.useState<GridRowId | null>(
    null,
  )
  const [studentRemoved, setStudentRemoved] = React.useState(false)

  const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false)

  const [addDialogOpen, setAddDialogOpen] = React.useState(false)
  const [addDialogErrorOpen, setAddDialogErrorOpen] = React.useState(false)

  const [discardDialogOpen, setDiscardDialogOpen] = React.useState(false)

  const [mobNumberError, setmobNumberError] = useState<string | null>(null)

  interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void
  }

  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props

    const handleNewClick = () => {
      const newId = Math.max(...rows.map((row) => row.id), 0) + 1

      const newRow = {
        id: newId,
        name: '',
        gender: '',
        address: '',
        mobileNo: null,
        dob: null,
        age: null,
        isNew: true,
        Action: 'Edit',
      }
      setRowModesModel((prevRowModesModel) => ({
        ...prevRowModesModel,
        [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }))

      setRows((prevRows) => [newRow, ...prevRows])

      //  setRows((oldRows) => [...oldRows, { id:newId, name: '', age: '', isNew: true }]);
      //   setRowModesModel((oldModel) => ({
      //     ...oldModel,
      //     [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      //   }));
    }

    return (
      <div
        style={{
          display: 'flex',
          padding: '6px 16px 6px 16px',
          justifyContent: 'flex-end',
        }}
      >
        <GridToolbarContainer>
          <Button
            color="primary"
            variant="contained"
            size="medium"
            onClick={handleNewClick}
          >
            ADD NEW
          </Button>
        </GridToolbarContainer>
      </div>
    )
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleUpdateClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    setUpdateDialogOpen(true)
  }

  const handleUpdateDialogDismiss = () => {
    setUpdateDialogOpen(false)
  }

  const handleSaveClick = (id: GridRowId) => () => {
    const editedRow = rows.find((row) => row.id === id)
    if (
      !editedRow ||
      !editedRow.name ||
      !editedRow.gender ||
      !editedRow.address ||
      !editedRow.mobileNo ||
      !editedRow.dob
    ) {
      setAddDialogErrorOpen(true)
      return
    }

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    setAddDialogOpen(true)
  }

  const handleAddDialogDismiss = () => {
    setAddDialogOpen(false)
  }

  const handleDeleteClick = (id: GridRowId) => () => {
    // setRows(rows.filter((row) => row.id !== id));
    setRowToRemoveId(id)
    setRemoveDialogOpen(true)
  }

  const handleRemoveDialogConfirm = () => {
    if (rowToRemoveId !== null) {
      setRows(rows.filter((row) => row.id !== rowToRemoveId))
      setStudentRemoved(true)
    }
    setRemoveDialogOpen(false)
  }

  const handleRemoveDialogDismiss = () => {
    setRemoveDialogOpen(false)
    setRowToRemoveId(null)
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })

    const editedRow = rows.find((row) => row.id === id)

    if (editedRow!.isNew) {
      // setRows(rows.filter((row) => row.id !== id));
      // Show the discard dialog only for existing rows, not for new rows
      setRowToRemoveId(id)
      setDiscardDialogOpen(true)
    }
  }

  const handleDiscardDialogConfirm = () => {
    if (rowToRemoveId !== null) {
      setRows(rows.filter((row) => row.id !== rowToRemoveId))
      setDiscardDialogOpen(false)
      setStudentRemoved(true)
    }
  }

  const handleDiscardDialogDismiss = () => {
    setDiscardDialogOpen(false)
    setRowToRemoveId(null)
  }

  const handleAddDialogErrorDismiss = () => {
    setAddDialogErrorOpen(false)
  }

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  //   const renderEditCell = (params: any) => (
  //     <TextField
  //       size="small"
  //       variant="outlined"
  //       InputLabelProps={{ shrink: false }}

  //       value={params.value as string}
  //       onChange={(e) =>
  //         params.api.setEditCellValue({
  //           id: params.id,
  //           field: params.field,
  //           value: e.target.value,
  //         })
  //       }
  //       sx={{
  //         borderRadius: "0px",
  //         border: "1px solid rgba(33,150,243,1)",
  //         boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2)",
  //         ...(params.field === 'name' && { border: "1px solid rgba(33,150,243,1) " }),
  //         ...(params.field === 'gender' && { border: "1px solid rgba(33,150,243,1)" }),
  //         ...(params.field === 'address' && { border: "1px solid rgba(33,150,243,1)" }),
  //         ...(params.field === 'mobileno' && { border: "1px solid rgba(33,150,243,1)" }),
  //         ...(params.field === 'dob' && { border: "1px solid rgba(33,150,243,1)" }),
  //         ...(params.field === 'age' && { border: "1px solid rgba(33,150,243,1)" }),
  //       }}
  //     />
  //   );

  const calculateAge = (dob: string | Date) => {
    const currentDate = new Date()
    const birthDate = new Date(dob)
    let age = currentDate.getFullYear() - birthDate.getFullYear()

        return age
  }

  const handleMobileNoChange = (
    value: string,
    params: GridRenderCellParams<IRowData>,
  ) => {
    const mobNumberRegex = /^\+?\d+$/

    if (value.length === 10 && mobNumberRegex.test(value)) {
      setmobNumberError(null)

      const formattedNumber = `+${value.slice(0, 3)} - ${value.slice(3, 6)} - ${value.slice(6)}`

      params.api.setEditCellValue({
        id: params.id,
        field: params.field!,
        value: formattedNumber,
      })
    } else {
      setmobNumberError('Please enter a valid Mobile number')
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 137,
      sortable: false,
      headerClassName: 'user-details',
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 135,
      editable: true,
      headerClassName: 'user-details',

      renderEditCell: (params) => (
        <TextField
          size="small"
          variant="outlined"
          InputLabelProps={{ shrink: false }}
          autoFocus
          value={params.value as string}
          onChange={(e) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: e.target.value,
            })
          }
          sx={{
            borderRadius: '0px',
            border: '1px solid rgba(33,150,243,1)',
            boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2)',
          }}
        />
      ),
    },

    {
      field: 'gender',
      headerName: 'Gender',
      headerClassName: 'user-details',
      width: 137,
      sortable: false,
      editable: true,

      renderEditCell: (params) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit
        if (isInEditMode) {
          return (
            <>
              <Select
                value={(params.value as string) || ''}
                onChange={(e) => {
                  params.api.setEditCellValue({
                    id: params.id,
                    field: 'gender',
                    value: e.target.value,
                  })
                }}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                size="small"
                fullWidth
                sx={{
                  borderRadius: '0px',
                  border: '1px solid rgba(33,150,243,1)',
                  boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2)',
                }}
              >
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
                <MenuItem value={'other'}>Other</MenuItem>
              </Select>
            </>
          )
        }
      },
    },
    {
      field: 'address',
      headerName: 'Address',
      sortable: false,
      width: 137,
      headerClassName: 'user-details',
      align: 'left',
      headerAlign: 'left',
      editable: true,
      // renderEditCell
      renderEditCell: (params) => (
        <TextField
          size="small"
          variant="outlined"
          InputLabelProps={{ shrink: false }}
          value={params.value as string}
          onChange={(e) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: e.target.value,
            })
          }
          sx={{
            borderRadius: '0px',
            border: '1px solid rgba(33,150,243,1)',
            boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2)',
          }}
        />
      ),
    },
    {
      field: 'mobileno',
      headerName: 'Mobile No',
      sortable: false,
      width: 135,
      headerClassName: 'user-details',
      align: 'left',
      headerAlign: 'left',
      editable: true,

      renderEditCell: (params) => (
        <div>
          <TextField
            size="small"
            variant="outlined"
            InputLabelProps={{ shrink: false }}
            value={params.value as string}
            onChange={(e) => handleMobileNoChange(e.target.value, params)}
            sx={{
              borderRadius: '5px',
              border: mobNumberError
                ? '2px solid red'
                : '1px solid rgba(33,150,243,1)',
              boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2)',
            }}
          />
          {mobNumberError && (
            <div
              style={{ color: 'red', fontSize: '9px', whiteSpace: 'pre-wrap' }}
            >
              {mobNumberError}
            </div>
          )}
        </div>
      ),
    },
    {
      field: 'dob',
      headerName: 'Date of Birth',
      headerClassName: 'user-details',
      headerAlign: 'left',
      type: 'date',
      width: 175,
      editable: true,
      valueGetter: (params) => {
        return params.row.dob ? new Date(params.row.dob) : null
      },
      renderEditCell: (params) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return (
            <TextField
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: false }}
              value={
                params.row.dob instanceof Date
                  ? format(params.row.dob, 'yyyy-MM-dd')
                  : ''
              }
              type="date"
              fullWidth
              onChange={(e) => {
                const selectedDate = new Date(e.target.value)
                params.api.setEditCellValue({
                  id: params.id,
                  field: 'dob',
                  value: selectedDate,
                })
              }}
              sx={{
                borderRadius: '0px',
                border: '1px solid rgba(33,150,243,1)',
                boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2)',
              }}
            />
          )
        }
        return (
          <div>
            {params.row.dob instanceof Date
              ? format(params.row.dob, 'dddd yyyy MMMM dd')
              : ''}
          </div>
        )
      },
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 101,
      sortable: false,
      headerClassName: 'user-details',
      align: 'left',
      headerAlign: 'left',
      editable: false,
      valueGetter: (params) => calculateAge(params.row.dob),
      renderEditCell: (params) => {
        const age = calculateAge(params.row.dob)

        return (
          <TextField
            size="small"
            variant="outlined"
            InputLabelProps={{ shrink: false }}
            value={age.toString()}
            sx={{
              borderRadius: '0px',
              border:
                age >= 18 ? '1px solid rgba(33,150,243,1)' : '1px solid red',
              boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2)',
            }}
          />
        )
      },
    },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      headerClassName: 'user-details',
      width: 190,
      cellClassName: 'actions',
      getActions: ({ id, row }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit
        if (isInEditMode) {
          if (row.isNew) {
            return [
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '25px',
                  gap: '5px',
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  style={{ width: 'auto' }}
                  onClick={handleSaveClick(id)}
                >
                  Add
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  style={{ width: 'auto' }}
                  onClick={handleCancelClick(id)}
                >
                  Discard Changes
                </Button>
                ,
              </div>,
            ]
          } else {
            return [
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '25px',
                  gap: '5px',
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  style={{ width: 'auto' }}
                  onClick={handleUpdateClick(id)}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  style={{ width: 'auto' }}
                  onClick={handleCancelClick(id)}
                >
                  Discard Changes
                </Button>
                ,
              </div>,
            ]
          }
        } else {
          return [
            <Button
              variant="outlined"
              size="small"
              onClick={handleEditClick(id)}
            >
              Edit
            </Button>,

            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={handleDeleteClick(id)}
            >
              Remove
            </Button>,
          ]
        }
      },
    },
  ]

  return (
    <div
      style={{
        minWidth: '1500px',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          height: 'fit-content',
          width: '80%',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
          '& .user-details': {
            backgroundColor: 'rgba(33, 150, 243, 0.08)',
          },
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            padding: '16px',
            fontSize: '24px',
            fontWeight: '400',
            fontFamily: 'Roboto,sans-serif',
            lineHeight: '32.02px',
          }}
        >
          User Details
        </div>

        {removeDialogOpen && (
          <DialogBox
            open={removeDialogOpen}
            onClose={handleRemoveDialogDismiss}
            dialogContent="Are you sure you want to remove this student?"
            buttonLabel="CONFIRM"
            buttonAction={handleRemoveDialogConfirm}
            secondary={true}
            secondaryButtonLabel="DISMISS"
            secondaryButtonAction={handleRemoveDialogDismiss}
          />
        )}

        {updateDialogOpen && (
          <DialogBox
            open={updateDialogOpen}
            onClose={handleUpdateDialogDismiss}
            dialogContent="Student Details updated successfully"
            buttonLabel="OK"
            buttonAction={handleUpdateDialogDismiss}
          />
        )}

        {addDialogOpen && (
          <DialogBox
            open={addDialogOpen}
            onClose={handleAddDialogDismiss}
            dialogContent="A new student added successfully"
            buttonLabel="OK"
            buttonAction={handleAddDialogDismiss}
          />
        )}

        {addDialogErrorOpen && (
          <DialogBox
            open={addDialogErrorOpen}
            onClose={handleAddDialogErrorDismiss}
            dialogContent="Mandatory fields missing"
            buttonLabel="KEEP EDITING"
            buttonAction={handleAddDialogErrorDismiss}
          />
        )}

        {discardDialogOpen && (
          <DialogBox
            open={discardDialogOpen}
            onClose={handleDiscardDialogDismiss}
            dialogContent="Discard changes?"
            buttonLabel="CONFIRM"
            buttonAction={handleDiscardDialogConfirm}
            secondary={true}
            secondaryButtonLabel="DISMISS"
            secondaryButtonAction={handleDiscardDialogDismiss}
          />
        )}

        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          checkboxSelection
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
          getRowHeight={(params) => (params.id in rowModesModel ? 80 : 48)}
        />
      </Box>
    </div>
  )
}
