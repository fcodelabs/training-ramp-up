import { User } from './types'
import { GridCellProps } from '@progress/kendo-react-grid'
import {
  isValidName,
  isValidId,
  isValidAddress,
  isValidTPNO,
  isValidDateOfBirth,
  isValidGender,
} from './UserValidations'

type EditIdCallBack = (id: number | null) => void
type NewAddedCallBack = (NewAdded: boolean) => void
type TempDataCallback = (User: User[]) => void
type DataCallback = (User: User[]) => void
type DisplayErrorsCallBack = (errors: string[]) => void

const validate = (data: User,tempData: User, idList: string[]) => {
  const errors: string[] = []
  if (!isValidName(data.name).state) {
    errors.push(isValidName(data.name).error)
  }
  if (!isValidId(data.id,tempData.id, idList).state) {
    errors.push(isValidId(data.id,tempData.id, idList).error)
  }
  if (!isValidAddress(data.address).state) {
    errors.push(isValidAddress(data.address).error)
  }
  if (!isValidGender(data.gender).state) {
    errors.push(isValidGender(data.gender).error)
  }
  if (!isValidTPNO(data.mobileNo).state) {
    errors.push(isValidTPNO(data.mobileNo).error)
  }
  if (!isValidDateOfBirth(data.dateOfBirth).state) {
    errors.push(isValidDateOfBirth(data.dateOfBirth).error)
  }

  return errors
}

const add = (
  editId: number,
  setEditId: EditIdCallBack,
  setNewAdded: NewAddedCallBack,
  setTempData: TempDataCallback,
  data: User[],
  tempData: User[],
  displayErrors: DisplayErrorsCallBack,
) => {
  const errors = validate(
    data[editId],
    tempData[editId],
    tempData.map((user) => {
      return user.id
    }),
  )
  if (errors.length === 0) {
    setEditId(null)
    setNewAdded(false)
    setTempData(data)
  } else {
    displayErrors(errors)
  }
}




const discard = (
  setEditId: EditIdCallBack,
  setNewAdded: NewAddedCallBack,
  setData: DataCallback,
  tempData: User[],
) => {
  setEditId(null)
  setNewAdded(false)
  setData(tempData)
}

export const command = (
  dataIndex: number,
  editId: number | null,
  newAdded: boolean,
  setEditId: EditIdCallBack,
  setNewAdded: NewAddedCallBack,
  setTempData: TempDataCallback,
  data: User[],
  setData: DataCallback,
  tempData: User[],
  displayErrors: DisplayErrorsCallBack,
) => {
  return (
    <td className='k-command-cell'>
      {dataIndex === editId && newAdded && (
        <div className='table--button--group'>
          <button
            onClick={() => {
              add(editId, setEditId, setNewAdded, setTempData, data, tempData, displayErrors)
            }}
            className='table--button k-button k-button-md k-rounded-md k-button-solid k-button-solid-light k-grid-save-command'
          >
            Add
          </button>
          <button
            onClick={() => {
              discard(setEditId, setNewAdded, setData, tempData)
            }}
            className='table--button k-button k-button-md k-rounded-md k-button-solid k-button-solid-light k-grid-save-command'
          >
            Discard Changes
          </button>
        </div>
      )}



      {dataIndex !== editId && (
        <div className='table--button--group'>
          <button

            className='table--button k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-save-command'
          >
            Edit
          </button>
          <button

            className='table--button k-button k-button-md k-rounded-md k-button-solid k-button-solid-light k-grid-save-command'
          >
            Remove
          </button>
        </div>
      )}
    </td>
  )
}

export const calculateAge = (dob: Date) => {
  return Math.floor((Date.now() - dob.getTime()) / (1000 * 3600 * 24) / 365.25)
}

export const calcAge = (props: GridCellProps) => {
  let age = null
  if (props.dataItem.dateOfBirth) {
    age = calculateAge(props.dataItem.dateOfBirth)
  }
  return <td>{age}</td>
}

export const addRecord = (
  newAdded: boolean,
  setEditId: EditIdCallBack,
  setNewAdded: NewAddedCallBack,
  setData: DataCallback,
  data: User[],
) => {
  if (!newAdded) {
    const newRecord = {
      id: '',
      name: '',
      gender: '',
      address: '',
      mobileNo: '',
      dateOfBirth: null,
      age: 0,
    }
    setNewAdded(true)
    setData([newRecord, ...data])
    setEditId(0)
  }
}
