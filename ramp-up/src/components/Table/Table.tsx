import * as React from 'react'
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridEventListener,
  GridToolbarContainer,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridRenderCellParams,
} from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import '@fontsource/roboto'
import { Box, TextField, MenuItem, Select } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store/store'
import { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import validatePhoneNumber from '../../utility/validatePhoneNumber'
import calculateAge from '../../utility/calculateAge'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import DialogBox from '../DialogBox/DialogBox'
import InputForm from '../InputForm/InputForm'

import io from 'socket.io-client'

import {
  updateStudent,
  fetchAllStudentsSuccess,
  addStudentSuccess,
  removeStudentSuccess,
  editStudentSuccess,
  addStudentError,
  editStudentError,
  removeStudentError,
} from '../../redux/slices/studentSlice'

const StyledEditButton = styled(Button)`
  &&& {
    border-color: #2196f380;
    color: #2196f3;
    font-family: Roboto;
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: 0.46px;
  }
`

const StyledRemoveButton = styled(Button)`
  &&& {
    border-color: #d32f2f80;
    color: #d32f2f;
    margin-left: 30px;
    font-family: Roboto;
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: 0.46px;
  }
`

const StyledAddButton = styled(Button)`
  &&& {
    border-color: #2196f380;
    color: #2196f3;
    font-family: Roboto;
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: 0.46px;
  }
`

const StyledDiscardButton = styled(Button)`
  &&& {
    border-color: #d32f2f80;
    color: #d32f2f;
    font-family: Roboto;
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: 0.46px;
  }
`

const StyledDataTableBox = styled(Box)`
  &&& {
    width: 80%;
    height: auto;
    margin-left: 175px;
    margin-right: 175px;
    border-radius: 4px;
    background: #ffffff;
    box-shadow: 0px 2px 1px -1px #00000033, 0px 1px 1px 0px #00000024,
      0px 1px 3px 0px #0000001f;

    fontfamily: 'Roboto';
    fontweight: 400;
    fontsize: 14px;
    lineheight: 20.02px;
    letterspacing: 0.17px;
    .action-buttons {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
    .action-edit-buttons {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 8px;
    }
    .user-details {
      background-color: 'rgba(33, 150, 243, 0.08)';
    }
  }
`
interface IStudent {
  id: number
  name: string
  age: number
  gender: string
  address: string
  mobile: string
  dob: string
  isNew?: boolean
}

interface IEditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void
}

export default function Table() {
  const students = useSelector((state: RootState) => state.student.students)
  const [rows, setRows] = useState(students)

  function EditToolbar(props: IEditToolbarProps) {
    const { setRows, setRowModesModel } = props
    const currentRows = useSelector(
      (state: RootState) => state.student.students
    )
    const dispatch = useDispatch()

    const handleClick = () => {
      const id = students.length + 1

      dispatch(
        updateStudent([
          {
            id,
            name: '',
            gender: '',
            address: '',
            mobileno: '',
            dateofbirth: dayjs(new Date()).toISOString().slice(0, 10),
            age: '',
            isNew: true,
          },
          ...currentRows,
        ])
      )
      // Set the mode for the new row
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }))
    }

    return (
      <GridToolbarContainer>
        <div
          style={{
            padding: '20px',
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          {userRole === 'Admin' ? (
            <Button
              style={{ backgroundColor: '#2196F3' }}
              variant="contained"
              size="medium"
              onClick={() => setOpenModal(true)}
            >
              ADD NEW USER
            </Button>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            padding: '20px',
          }}
        >
          <div
            style={{
              fontSize: '26px',
              fontWeight: '400',
              fontFamily: 'Roboto,sans-serif',
            }}
          >
            Student Details
          </div>
          {userRole === 'Admin' ? (
            <Button
              style={{ backgroundColor: '#2196F3' }}
              variant="contained"
              size="small"
              onClick={handleClick}
            >
              ADD NEW STUDENT
            </Button>
          ) : null}
        </div>
      </GridToolbarContainer>
    )
  }

  //const SOCKET_SERVER_URL = 'http://localhost:4000';

  const dispatch = useDispatch()

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  )

  useEffect(() => {
    dispatch(fetchAllStudentsSuccess())
  }, [dispatch])

  const [mode, setMode] = useState<'Add' | 'Edit'>('Add')
  const [openModal, setOpenModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showDiscardModal, setShowDiscardModal] = useState(false)
  const [showDiscardUpdateModal, setShowDiscardUpdateModal] = useState(false)
  const [showRemoveConfirmModal, setShowRemoveConfirmModal] = useState(false)
  const [fieldMissingModal, setFieldMissingModal] = useState(false)
  const [showRemoveSuccessCard, setShowRemoveSuccessCard] = useState(false)
  const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false)

  const [updatedRowId, setUpdatedRowId] = useState<GridRowId | null>(null)
  const [editingRowId, setEditingRowId] = useState<GridRowId | null>(null)

  const [attemptedToAdd, setAttemptedToAdd] = useState(false) // track add button press

  const [selectedRowId, setSelectedRowId] = useState<GridRowId | null>(null)

  const [editedFields, setEditedFields] = useState({
    // state to maintain fields are empty or not
    name: '',
    gender: '',
    address: '',
    mobile: '',
    dob: dayjs(new Date()),
  })

  const [ageValues, setAgeValues] = React.useState<{
    [key: string]: number | null
  }>({})
  useEffect(() => {
    const updatedAgeValues: { [key: string]: number | null } = {}

    students.forEach((student) => {
      const { id, dob } = student
      const calculatedAge = calculateAge(dob)

      updatedAgeValues[id] = calculatedAge
    })

    // Update the state with the new age values
    setAgeValues(updatedAgeValues)
  }, [students])

  const socket = io('http://localhost:4000')

  useEffect(() => {
    console.log('useEffect is running')

    socket.on('connect', () => {
      console.log('Connected to socket server')

      setTimeout(() => {
        socket.on('notification', (data: any) => {
          console.log('Notification:', data.message)
        })
      }, 500)
    })
  }, [])

  const userRole = useSelector(
    (state: RootState) => state.auth.userDetails.role
  )

  console.log('userRole', userRole)

  // useEffect(() => {
  //   socket.on("getstudents", (data: any) => {
  //     console.log("getAllStudents", data);
  //   });

  //   socket.on("newstudent", (data: any) => {
  //     console.log("new student added", data);
  //     if (data === 201) {
  //       setShowSuccessModal(false);
  //       dispatch(fetchAllStudentsSuccess());
  //     }
  //     if (data === 500) {
  //       dispatch(addStudentError());
  //     }
  //   });

  //   socket.on("editstudent", (data: any) => {
  //     console.log("edited student", data);
  //     if (data === 201) {
  //       setShowUpdateSuccessModal(true);
  //       dispatch(fetchAllStudentsSuccess());
  //     }
  //     if (data === 500) {
  //       dispatch(editStudentError());
  //     }
  //   });

  //   socket.on("deletestudent", (data) => {
  //     console.log("deleted student", data);
  //     if (data === 200) {
  //       console.log("delete-student 204", data);
  //       setShowRemoveSuccessCard(true);
  //       dispatch(fetchAllStudentsSuccess());
  //     }
  //     if (data === 500) {
  //       dispatch(removeStudentError());
  //       console.log("delete-student error", data);
  //     }
  //     if (data === 404) {
  //       console.log("delete-student error student not found", data);
  //     }
  //   });
  // }, []);

  const handleConfirmRemove = (id: GridRowId | null) => {
    if (id) {
      setRows(rows.filter((row) => row.id !== id))
      setShowRemoveConfirmModal(false)
      setSelectedRowId(null)
      // Show the RemoveSuccessCard
      setShowRemoveSuccessCard(true)
      dispatch(removeStudentSuccess(id))
    }
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = (id: GridRowId) => () => {
    const editedRow = students.find((row) => row.id === id)

    if (editedRow) {
      setEditedFields({
        name: editedRow.name,
        gender: editedRow.gender,
        address: editedRow.address,
        mobile: editedRow.mobile,
        dob: dayjs(editedRow.dob),
      })
    }

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
    setMode('Edit')
    setEditingRowId(id)
  }

  const handleAddClick = (id: GridRowId) => () => {
    // Set attemptedToAdd to true to trigger error state on empty fields
    setAttemptedToAdd(true)
    const formattedMobile = editedFields.mobile
      ? editedFields.mobile.replace(/^\+94/, '0')
      : ''

    const formattedForDatabase = formattedMobile.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '$1-$2-$3'
    )

    if (
      !editedFields.name.trim() ||
      !editedFields.gender.trim() ||
      !editedFields.address.trim() ||
      !editedFields.mobile.trim() ||
      dayjs(editedFields.dob).isSame(dayjs(new Date()), 'day') ||
      !(ageValues[id] !== undefined && (ageValues[id], 10) < 18) ||
      !validatePhoneNumber(editedFields.mobile)
    ) {
      // Display an error message
      setFieldMissingModal(true)
      return
    }

    // If all fields are not empty, proceed with adding the row
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    setMode('Add')
    setShowSuccessModal(true)
    setAttemptedToAdd(false) // Reset attemptedToAdd after adding

    dispatch(
      addStudentSuccess({
        id: id,
        name: editedFields.name,
        gender: editedFields.gender,
        address: editedFields.address,
        mobile: formattedForDatabase,
        dob: editedFields.dob.toISOString().slice(0, 10),
        age: ageValues[id],
      })
    )

    setEditedFields({
      name: '',
      gender: '',
      address: '',
      mobile: '',
      dob: dayjs(new Date()),
    })
  }

  const handleSaveClick = (id: GridRowId) => () => {
    // Set attemptedToAdd to true to trigger error state on empty fields
    setAttemptedToAdd(true)
    const formattedMobile = editedFields.mobile
      ? editedFields.mobile.replace(/^\+94/, '0')
      : ''
    // Further format the mobile number as needed
    const formattedForDatabase = formattedMobile.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '$1-$2-$3'
    )
    // Validate all fields before updating the row
    if (
      !editedFields.name.trim() ||
      !editedFields.gender.trim() ||
      !editedFields.address.trim() ||
      !editedFields.mobile.trim() ||
      dayjs(editedFields.dob).isSame(dayjs(new Date()), 'day') ||
      !(ageValues[id] !== undefined && (ageValues[id], 10) < 18) ||
      !validatePhoneNumber(editedFields.mobile)
    ) {
      // Display an error message or take any other appropriate action
      setFieldMissingModal(true)
      return
    }

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    setMode('Add')
    setShowUpdateSuccessModal(true)
    setUpdatedRowId(id)
    setAttemptedToAdd(false) // Reset attemptedToAdd after updating
    setEditedFields({
      name: '',
      gender: '',
      address: '',
      mobile: '',
      dob: dayjs(new Date()),
    })

    dispatch(
      editStudentSuccess({
        id: id,
        name: editedFields.name,
        gender: editedFields.gender,
        address: editedFields.address,
        mobile: formattedForDatabase,
        dob: editedFields.dob.toISOString().slice(0, 10),
        age: ageValues[id],
      })
    )
  }

  const handleDeleteClick = (id: GridRowId) => () => {
    setSelectedRowId(id)
    setShowRemoveConfirmModal(true)
    // dispatch(removeStudentSuccess(id));
  }

  const handleCancelClick = (id: GridRowId) => () => {
    // Check if there are changes in the row
    const isRowModified = Object.keys(rowModesModel).some(
      (key) => key === id.toString()
    )

    if (isRowModified) {
      setShowDiscardModal(true)
    } else {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      })

      const editedRow = rows.find((row) => row.id === id)
      if (editedRow!.isNew) {
        setRows(rows.filter((row) => row.id !== id))
      }
      setMode('Add')
    }
  }

  const handleCancelUpdateClick = (id: GridRowId) => () => {
    const isRowModified = Object.keys(rowModesModel).some(
      (key) => key === id.toString()
    )

    if (isRowModified) {
      setShowDiscardUpdateModal(true)
    } else {
      cancelEdit(id)
    }
  }

  const cancelEdit = (id: GridRowId) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })

    const editedRow = rows.find((row) => row.id === id)
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id))
    }
    setMode('Add')
    setEditingRowId(null)
  }

  const handleConfirmDiscardUpdate = () => {
    if (editingRowId !== null) {
      setRowModesModel({
        ...rowModesModel,
        [editingRowId]: { mode: GridRowModes.View, ignoreModifications: true },
      })

      // Find the original row data
      const originalRow = rows.find(
        (row) => row.id === parseInt(editingRowId.toString())
      )

      if (originalRow) {
        setRows((oldRows) =>
          oldRows.map((row) =>
            row.id === parseInt(editingRowId.toString())
              ? { ...row, ...originalRow }
              : row
          )
        )
      }

      setMode('Add')
      setEditingRowId(null)
      setShowDiscardUpdateModal(false)
    }
  }

  const handleConfirmDiscardChanges = () => {
    // User confirmed discarding changes, remove the editing row
    const tempeditingRowId = Object.keys(rowModesModel)[0]

    if (editingRowId?.toString() === tempeditingRowId) {
      setMode('Add')
      handleConfirmDiscardUpdate()
    } else {
      // Handle discarding changes for non-editing rows
      // Reset the state and close the modal
      setMode('Add')
      setRowModesModel({})
      setShowDiscardUpdateModal(false)
    }
  }

  const handleDismissDiscardChanges = () => {
    // User dismissed discarding changes, close the modal
    setShowDiscardUpdateModal(false)
    setEditingRowId(null)
  }

  const handleConfirmDiscard = () => {
    // User confirmed discarding changes, remove the editing row
    const editingRowId = Object.keys(rowModesModel)[0]
    setRows(rows.filter((row) => row.id !== parseInt(editingRowId)))
    setRowModesModel({})
    setShowDiscardModal(false)
    setMode('Add')
    dispatch(removeStudentSuccess(parseInt(editingRowId)))
  }

  const handleDismissDiscard = () => {
    // User dismissed discarding changes, close the modal
    setShowDiscardModal(false)
  }

  const processRowUpdate = (newRow: GridRowModel) => {
    const { isNew, ...updatedRow } = newRow as IStudent
    setRows((oldRows) =>
      oldRows.map((row) =>
        row.id === newRow.id ? { ...row, ...updatedRow } : row
      )
    )
    return { ...updatedRow, isNew: false } as IStudent
  }

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel)
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
      width: 86,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      headerClassName: 'user-details',
    },
    {
      field: 'name',
      headerName: 'Name',
      type: 'string',
      width: 135,
      sortable: true,
      disableColumnMenu: true,
      headerClassName: 'user-details',
      editable: true,
      renderEditCell(params: GridRenderCellParams<any, string>) {
        const isNameEmpty =
          params.value === undefined ||
          params.value === null ||
          params.value.trim() === ''

        return (
          <TextField
            size="small"
            value={
              editedFields.name === ''
                ? (params.value as string)
                : editedFields.name
            }
            onChange={(event) => {
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: event.target.value,
              })
              setEditedFields((prevFields) => ({
                ...prevFields,
                name: event.target.value,
              }))
            }}
            error={isNameEmpty && attemptedToAdd}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2196F3',
                borderRadius: 0,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2196F3',
              },
            }}
          />
        )
      },
    },
    {
      field: 'gender',
      headerName: 'Gender',
      type: 'singleSelect',
      valueOptions: ['Male', 'Female', 'Other'],
      width: 135,
      sortable: false,
      disableColumnMenu: true,
      headerClassName: 'user-details',
      editable: true,
      renderEditCell: (params: GridRenderCellParams<any, string>) => {
        const isGenderEmpty = !params.value

        return (
          <Select
            size="small"
            fullWidth
            value={
              editedFields.gender === ''
                ? (params.value as string)
                : editedFields.gender
            }
            onChange={(e) => {
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: e.target.value,
              })
              setEditedFields((prevFields) => ({
                ...prevFields,
                gender: e.target.value,
              }))
            }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2196F3',
                borderRadius: 0,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2196F3',
              },
            }}
            error={isGenderEmpty && attemptedToAdd}
          >
            <MenuItem value={'Male'}>Male</MenuItem>
            <MenuItem value={'Female'}>Female</MenuItem>
            <MenuItem value={'Other'}>Other</MenuItem>
          </Select>
        )
      },
    },

    {
      field: 'address',
      headerName: 'Address',
      width: 135,
      sortable: false,
      disableColumnMenu: true,
      headerClassName: 'user-details',
      editable: true,
      renderEditCell(params: GridRenderCellParams<any, string>) {
        const isAddressEmpty = !params.value
        return (
          <TextField
            size="small"
            value={
              editedFields.address === ''
                ? (params.value as string)
                : editedFields.address
            }
            required={true}
            onChange={(event) => {
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: event.target.value,
              })
              setEditedFields((prevFields) => ({
                ...prevFields,
                address: event.target.value,
              }))
            }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2196F3',
                borderRadius: 0,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2196F3',
              },
            }}
            error={isAddressEmpty && attemptedToAdd}
          />
        )
      },
    },
    {
      field: 'mobile',
      headerName: 'Mobile No:',
      width: 135,
      sortable: false,
      disableColumnMenu: true,
      headerClassName: 'user-details',
      editable: true,
      valueFormatter(params) {
        if (params.value) {
          // Remove leading '+94' and add '0' if necessary
          let processedValue = params.value.replace(/^\+94/, '0')

          // Apply the pattern
          processedValue = processedValue.replace(
            /(\d{3})(\d{3})(\d{4})/,
            '$1-$2-$3'
          )

          return processedValue
        }

        return ''
      },

      renderEditCell(params: GridRenderCellParams<any, string>) {
        const isMobileEmpty = !params.value
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = event.target.value

          // Update the cell value if the phone number is valid

          params.api.setEditCellValue({
            id: params.id,
            field: params.field,
            value: newValue,
          })
          setEditedFields((prevFields) => ({
            ...prevFields,
            mobile: event.target.value,
          }))
        }

        return (
          <>
            <TextField
              size="small"
              value={
                editedFields.mobile === ''
                  ? (params.value as string)
                  : editedFields.mobile
              }
              onChange={handleChange}
              error={
                (!validatePhoneNumber(params.value as string) &&
                  attemptedToAdd) ||
                (isMobileEmpty && attemptedToAdd)
              }
              helperText={
                !validatePhoneNumber(params.value as string) && attemptedToAdd
                  ? 'Please enter a valid phone number'
                  : ''
              }
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#2196F3',
                  borderRadius: 0,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#2196F3',
                },
                '& .MuiFormHelperText-root': {
                  fontSize: 9,
                  width: 'auto',
                  height: 'auto',
                  letterSpacing: '0.25px',
                  marginLeft: '0px',
                  marginTop: '0px',
                  whiteSpace: 'balance',
                },
                marginTop:
                  !validatePhoneNumber(params.value as string) && attemptedToAdd
                    ? '30px'
                    : '0px',
              }}
            />
          </>
        )
      },
    },
    {
      field: 'dob',
      headerName: 'Date of Birth',
      type: 'date',
      width: 205,
      sortable: true,
      disableColumnMenu: true,
      headerClassName: 'user-details',
      editable: true,
      valueFormatter: (params) => {
        const date = dayjs(new Date(params.value))
        return date.format('ddd MMM DD YYYY')
      },

      renderEditCell: (
        params: GridRenderCellParams<any, dayjs.Dayjs | null>
      ) => {
        const isDateEmpty = !params.value
        const dateValue = params.value ? dayjs(params.value) : null

        const handleDateChange = (newValue: dayjs.Dayjs | null) => {
          params.api.setEditCellValue({
            id: params.id,
            field: params.field,
            value: newValue,
          })

          // Calculate the age only if newValue is not null
          if (newValue !== null) {
            const newAge = calculateAge(newValue.toDate())
            const rowId = params.id

            setEditedFields((prevFields) => ({
              ...prevFields,
              dob: newValue,
            }))

            setAgeValues((prevAgeValues) => ({
              ...prevAgeValues,
              [rowId]: newAge,
            }))

            // Update the 'age' field
            params.api.setEditCellValue({
              id: params.id,
              field: 'age',
              value: newAge,
            })
          }
        }

        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={['DatePicker']}
              sx={{ paddingTop: '0px' }}
            >
              <DatePicker
                value={dateValue}
                onChange={handleDateChange}
                maxDate={dayjs()}
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2196F3',
                        borderRadius: 0,
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2196F3',
                      },
                      alignContent: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                    error: isDateEmpty && attemptedToAdd,
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        )
      },
    },

    {
      field: 'age',
      headerName: 'Age',
      width: 101,
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'user-details',
      editable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => {
        const isAgeEmpty = !params.value
        const isDateEmpty = !params.value
        const age =
          ageValues[params.row.id] !== undefined
            ? ageValues[params.row.id]?.toString()
            : ''
        const isBelowMinimumAge = age !== undefined && parseInt(age, 10) < 18

        if (
          params.row.id in rowModesModel &&
          rowModesModel[params.row.id]?.mode === GridRowModes.Edit
        ) {
        
          return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                size="small"
                value={age}
                onChange={(event) => {
                  params.api.setEditCellValue({
                    id: params.id,
                    field: params.field,
                    value: event.target.value,
                  })
                  setEditedFields((prevFields) => ({
                    ...prevFields,
                    age: event.target.value,
                  }))
                }}
                error={
                  (isBelowMinimumAge && attemptedToAdd) ||
                  (isDateEmpty && attemptedToAdd)
                }
                helperText={
                  isBelowMinimumAge && attemptedToAdd
                    ? 'Individual is below the minimum age allowed'
                    : ''
                }
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2196F3',
                    borderRadius: 0,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2196F3',
                  },
                  '& .MuiFormHelperText-root': {
                    fontSize: 9,
                    width: '100%',
                    letterSpacing: '0.25px',
                    marginLeft: '0px',
                    marginTop: '0px',
                    whiteSpace: 'balance',
                  },
                  marginTop:
                    isBelowMinimumAge && attemptedToAdd ? '30px' : '0px',
                }}
              />
            </div>
          )
        } else {
          // Render the age as plain text in view mode
          return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2">{age}</Typography>
              {isBelowMinimumAge && attemptedToAdd && (
                <Typography variant="caption" color="error">
                  Individual is below the minimum age allowed
                </Typography>
              )}
            </div>
          )
        }
      },
    },
  ]
    if (userRole === "Admin") {
      columns.push({
      field: 'action',
      headerName: 'Action',
      width: 195,
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'user-details',
      type: 'actions',
      getActions: ({ id }: { id: GridRowId }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <div>
              {mode === 'Add' ? (
                <div className="action-buttons">
                  <StyledAddButton
                    onClick={handleAddClick(id)}
                    size="small"
                    variant="outlined"
                  >
                    ADD
                  </StyledAddButton>
                  <StyledDiscardButton
                    onClick={handleCancelClick(id)}
                    size="small"
                    variant="outlined"
                  >
                    DISCARD CHANGES
                  </StyledDiscardButton>
                </div>
              ) : (
                <div className="action-edit-buttons">
                  <StyledAddButton
                    onClick={handleSaveClick(id)}
                    size="small"
                    variant="outlined"
                  >
                    UPDATE
                  </StyledAddButton>
                  <StyledDiscardButton
                    onClick={handleCancelUpdateClick(id)}
                    size="small"
                    variant="outlined"
                  >
                    CANCEL
                  </StyledDiscardButton>
                </div>
              )}
            </div>,
          ]
        }

        return [
          <div>
            <StyledEditButton
              variant="outlined"
              size="small"
              onClick={handleEditClick(id)}
            >
              EDIT
            </StyledEditButton>
            <StyledRemoveButton
              variant="outlined"
              size="small"
              onClick={handleDeleteClick(id)}
            >
              REMOVE
            </StyledRemoveButton>
          </div>,
          
        ]
      },
    });
    }
 

  return (
    <StyledDataTableBox>
      <DataGrid
        rows={students}
        columns={columns}
        editMode="row"
        disableRowSelectionOnClick
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{ toolbar: { setRowModesModel } }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowHeight={(params) =>
          rowModesModel[params.id]?.mode === GridRowModes.Edit ? 100 : 52
        }
      />

      {/* Modal for Adding Users */}
      <InputForm openModal={openModal} setOpenModal={setOpenModal} />

      {/* Modal for Adding Success */}
      <Modal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '12px',
          }}
        >
          <DialogBox
            message="A new student added successfully."
            primaryButton={{
              text: 'OK',
              onClick: () => setShowSuccessModal(false),
            }}
            primaryOption="OK"
          />
        </Paper>
      </Modal>

      {/* Modal for Discard Changes */}
      {showDiscardModal && (
        <Modal
          open={showDiscardModal}
          onClose={handleDismissDiscard}
          aria-labelledby="discard-modal-title"
          aria-describedby="discard-modal-description"
        >
          <Paper
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '12PX',
            }}
          >
            <DialogBox
              message="Discard changes?"
              primaryButton={{ text: 'DISMISS', onClick: handleDismissDiscard }}
              secondaryButton={{
                text: 'CONFIRM',
                onClick: handleConfirmDiscard,
              }}
              primaryOption="DISMISS"
              secondaryOption="CONFIRM"
            />
          </Paper>
        </Modal>
      )}

      {/* Modal for Discard uPdate Changes */}
      {showDiscardUpdateModal && (
        <Modal
          open={showDiscardUpdateModal}
          onClose={handleDismissDiscardChanges}
          aria-labelledby="discard-modal-title"
          aria-describedby="discard-modal-description"
        >
          <Paper
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '12PX',
            }}
          >
            <DialogBox
              message="Discard changes?"
              primaryButton={{
                text: 'DISMISS',
                onClick: handleDismissDiscardChanges,
              }}
              secondaryButton={{
                text: 'CONFIRM',
                onClick: handleConfirmDiscardChanges,
              }}
              primaryOption="DISMISS"
              secondaryOption="CONFIRM"
            />
          </Paper>
        </Modal>
      )}
      {/* Modal for Confirm Remove */}
      {showRemoveConfirmModal && (
        <Modal
          open={showRemoveConfirmModal}
          onClose={() => {
            setShowRemoveConfirmModal(false)
            setSelectedRowId(null)
          }}
          aria-labelledby="discard-modal-title"
          aria-describedby="discard-modal-description"
        >
          <Paper
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '12PX',
            }}
          >
            <DialogBox
              message="Are you sure you want to remove this student?"
              primaryButton={{
                text: 'DISMISS',
                onClick: () => {
                  setShowRemoveConfirmModal(false)
                  setSelectedRowId(null)
                },
              }}
              secondaryButton={{
                text: 'CONFIRM',
                onClick: () => {
                  handleConfirmRemove(selectedRowId)
                },
              }}
              primaryOption="DISMISS"
              secondaryOption="CONFIRM"
            />
          </Paper>
        </Modal>
      )}

      {/* Modal for Remove Success */}
      {showRemoveSuccessCard && (
        <Modal
          open={showRemoveSuccessCard}
          onClose={() => setShowRemoveSuccessCard(false)}
          aria-labelledby="remove-success-modal-title"
          aria-describedby="remove-success-modal-description"
        >
          <Paper
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '12px',
            }}
          >
            <DialogBox
              message="The student removed successfully."
              primaryButton={{
                text: 'OK',
                onClick: () => setShowRemoveSuccessCard(false),
              }}
              primaryOption="OK"
            />
          </Paper>
        </Modal>
      )}
      {showUpdateSuccessModal && (
        <Modal
          open={showUpdateSuccessModal}
          onClose={() => setShowUpdateSuccessModal(false)}
          aria-labelledby="update-success-modal-title"
          aria-describedby="update-success-modal-description"
        >
          <Paper
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '12px',
            }}
          >
            <DialogBox
              message="Student Details updated successfully."
              primaryButton={{
                text: 'OK',
                onClick: () => setShowUpdateSuccessModal(false),
              }}
              primaryOption="OK"
            />
          </Paper>
        </Modal>
      )}

      {/* Modal for Field Missing */}
      {fieldMissingModal && (
        <Modal
          open={fieldMissingModal}
          onClose={() => setFieldMissingModal(false)}
          aria-labelledby="field-missing-modal-title"
          aria-describedby="field-missing-modal-description"
        >
          <Paper
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '12px',
            }}
          >
            <DialogBox
              message="Mandatory fields missing."
              primaryButton={{
                text: 'KEEP EDITING',
                onClick: () => setFieldMissingModal(false),
              }}
              primaryOption="KEEP EDITING"
            />
          </Paper>
        </Modal>
      )}
    </StyledDataTableBox>
  )
}
