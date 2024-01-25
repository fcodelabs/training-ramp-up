import * as React from 'react'

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
  GridRowId,
  GridRowModel,
} from '@mui/x-data-grid'

import { format } from 'date-fns'

import { useDispatch } from 'react-redux'
import { addRow, updateRow, deleteRow } from '../../redux/slices/dataGridSlice'

const initialRows: GridRowsProp = [
  {
    id: 1,
    name: 'Henry',
    age: 25,
    gender: 'Male',
    address: 'Nuwaraeliya',
    mobileNo: '071-2222-220',
    dob: new Date('1990-01-01'),
  },
  {
    id: 2,
    name: 'John',
    age: 56,
    gender: 'Male',
    address: 'Gamp',
    mobileNo: '071-222-2220',
    dob: new Date('1990-01-01'),
  },
  {
    id: 3,
    name: 'Mark',
    age: 18,
    gender: 'Male',
    address: 'Col',
    mobileNo: '071-222-2220',
    dob: new Date('mon 1990-01-01'),
  },
  {
    id: 4,
    name: 'Fred',
    age: 5,
    gender: 'Male',
    address: 'Kand',
    mobileNo: '071-222-2220',
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

  const [ageError, setAgeError] = React.useState<string | null>(null)

  const [mandatoryFieldError, setMandatoryFieldError] = React.useState<
    string | null
  >(null)

  const dispatch = useDispatch()

  const nameRef = React.useRef<HTMLInputElement>(null)
  const genderRef = React.useRef<HTMLInputElement>(null)
  const addressRef = React.useRef<HTMLInputElement>(null)
  const mobileNoRef = React.useRef<HTMLInputElement>(null)
  const bodRef = React.useRef<HTMLInputElement>(null)
  const ageRef = React.useRef<HTMLInputElement>(null)

  interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void
  }

  const calculateAge = (dob: string | Date) => {
    if (!dob) {
      return null
    }

    const currentDate = new Date()
    const birthDate = new Date(dob)
    let age = currentDate.getFullYear() - birthDate.getFullYear()

    return age
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
    }

    return (
      <GridToolbarContainer>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
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
          <div
            style={{
              padding: '6px 16px 6px 1000px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              style={{ backgroundColor: '#2196F3' }}
              variant="contained"
              size="medium"
              onClick={handleNewClick}
            >
              ADD NEW
            </Button>
          </div>
        </div>
      </GridToolbarContainer>
    )
  }

  

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleUpdateClick = (id: GridRowId) => () => {
    const updatedRow = rows.find((row) => row.id === id)
    if (updatedRow) {
      dispatch(updateRow({ id, updatedRow }))
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
      setUpdateDialogOpen(true)
    }
  }

  const handleUpdateDialogDismiss = () => {
    setUpdateDialogOpen(false)
  }

  const handleSaveClick = (id: GridRowId) => () => {
    const editedRow = rows.find((row) => row.id === id) as IRowData

    const isNameFieldEmpty =
      nameRef.current && nameRef.current?.querySelector('input')?.value === ''

    const isGenderFieldEmpty =
      genderRef.current &&
      genderRef.current?.querySelector('input')?.value === ''

    const isAddressFieldEmpty =
      addressRef.current &&
      addressRef.current?.querySelector('input')?.value === ''

    const isMobileFieldEmpty =
      mobileNoRef.current &&
      mobileNoRef.current?.querySelector('input')?.value === ''

    const isMobileNoLengthValid =
      mobileNoRef.current?.querySelector('input')?.value.length === 10

    const isDOBFieldEmpty =
      bodRef.current && bodRef.current?.querySelector('input')?.value === ''

    const isAgeValid =
      ageRef.current &&
      parseInt(ageRef.current?.querySelector('input')?.value || '0', 10) < 18

    if (
      isNameFieldEmpty ||
      isGenderFieldEmpty ||
      isAddressFieldEmpty ||
      isMobileFieldEmpty ||
      isDOBFieldEmpty ||
      isMobileNoLengthValid ||
      isAgeValid
    ) {
      setMandatoryFieldError('Mandatory fields are missing')
      return
    }

    setMandatoryFieldError(null)
    const newRow = { ...editedRow, isNew: false }

    setRows((prevRows) => {
      // Remove any existing rows with the same id before adding the new row
      const filteredRows = prevRows.filter((row) => row.id !== id)
      return [...filteredRows, newRow]
    })

    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View },
    }))

    dispatch(addRow(editedRow))
    setAddDialogOpen(true)
  }

  const handleAddDialogDismiss = () => {
    setAddDialogOpen(false)
  }

  const handleDeleteClick = (id: GridRowId) => () => {
    const rowId = typeof id === 'string' ? parseInt(id, 10) : id
    dispatch(deleteRow(rowId))
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

 
  const handleMobileNoChange = (
    value: string,
    params: GridRenderCellParams<IRowData>,
  ) => {
    const validCharactersRegex = /^[0-9+\- ]*$/

    if (validCharactersRegex.test(value) || value === '') {
      const numericValue = value.replace(/[^0-9]/g, '')

      const formattedNumber = `+${numericValue.slice(0, 3)}-${numericValue.slice(3, 6)}-${numericValue.slice(6)}`

      params.api.setEditCellValue({
        id: params.id,
        field: params.field!,
        value: formattedNumber,
      })

      // Check if the entered value has 10 digits
      if (numericValue.length === 10) {
        setmobNumberError(null) 
      } else {
        setmobNumberError('Please enter a valid phone number')
      }
    } else {
      setmobNumberError('Please enter a valid phone number')
    }
  }

  const columns: GridColDef[] = [
    {
      field: '__check__',
      headerName: 'Checkbox',
      headerClassName: 'user-details',
      width: 37,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      sortable: false,
      headerClassName: 'user-details',
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 135,
      editable: true,
      sortable: true,
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
      width: 105,
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

      renderEditCell: (params) => {
        const mobileno = params.row?.mobileno || ''
        const hasError = mobNumberError !== null

        return (
          <div>
            <TextField
              ref={mobileNoRef}
              size="small"
              variant="outlined"
              InputLabelProps={{ shrink: false }}
              value={mobileno}
              onChange={(e) => handleMobileNoChange(e.target.value, params)}
              sx={{
                borderRadius: '5px',
                border: hasError
                  ? '2px solid red'
                  : '1px solid rgba(33,150,243,1)',
                boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2)',
              }}
            />
            {hasError && (
              <div
                style={{
                  color: 'red',
                  fontSize: '9px',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {mobNumberError}
              </div>
            )}
          </div>
        )
      },
    },
    {
      field: 'dob',
      headerName: 'Date of Birth',
      headerClassName: 'user-details',
      headerAlign: 'left',
      type: 'string',
      width: 175,
      editable: true,
      sortable: true,
      valueGetter: (params) => {
        return params.row.dob ? format(params.row.dob, 'EEE MMM dd yyyy') : null
      },
      renderEditCell: (params) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          const currentDate = new Date()
          return (
            <TextField
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: false }}
              inputProps={{
                max: format(currentDate, 'yyyy-MM-dd'),
              }}
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
      editable: true,
      valueGetter: (params) => {
        const age = calculateAge(params.row.dob)
        return age !== null ? age.toString() : ''
      },
      renderEditCell: (params) => {
        const age = calculateAge(params.row.dob)
        const hasError = ageError !== null

        if (age && age < 18) {
          setAgeError('Individual is below the minimum age allowed')
        } else {
          setAgeError('')
        }

        return (
          <div>
            <TextField
              size="small"
              variant="outlined"
              InputLabelProps={{ shrink: false }}
              value={age}
              sx={{
                borderRadius: '0px',
                border: ageError
                  ? '2px solid red'
                  : '1px solid rgba(33,150,243,1)',
                boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2)',
              }}
            />
            {hasError && (
              <div
                style={{
                  color: 'red',
                  fontSize: '9px',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {ageError}
              </div>
            )}
          </div>
        )
      },
    },

    {
      field: 'action',
      type: 'actions',
      headerName: 'Action',
      headerClassName: 'user-details',
      width: 195,
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
                  marginTop: '5px',
                  gap: '5px',
                }}
              >
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ minWidth: 'auto' }}
                    onClick={handleSaveClick(id)}
                  >
                    Add
                  </Button>
                </div>
                <div>
                  {' '}
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    style={{ width: 'auto' }}
                    onClick={handleCancelClick(id)}
                  >
                    Discard Changes
                  </Button>
                </div>
              </div>,
            ]
          } else {
            return [
              <div>
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
                  Cancel
                </Button>
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
          width: 'fit-content',
          margin: 'auto',
          padding: '136px 144px 136px 144px',
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

        {mandatoryFieldError && (
          <DialogBox
            open={true}
            onClose={() => setMandatoryFieldError(null)}
            dialogContent={mandatoryFieldError}
            buttonLabel="KEEP EDITING"
            buttonAction={() => setMandatoryFieldError(null)}
          />
        )}

        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
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
          initialState={{
            sorting: {
              // sortModel: [
              //   { field: 'name', sort: 'asc' },
              //   { field: 'dob', sort: 'desc' },
              // ],
            },
          }}
        />
      </Box>
    </div>
  )
}
