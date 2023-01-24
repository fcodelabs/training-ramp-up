import { User } from './types'
import { GridCellProps } from '@progress/kendo-react-grid'
import { isValidName, isValidAddress, isValidTPNO, isValidDateOfBirth } from './userValidations'
import { SortDescriptor } from '@progress/kendo-data-query'

import { DropDown } from '../components/Dropdown/DropDown'
import { createStudent, deleteStudent, editStudent } from './dataBaseInteractions'

type EditIdCallBack = (id: number | null) => void
type NewAddedCallBack = (NewAdded: boolean) => void
type TempDataCallback = (User: User[]) => void
type DataCallback = (User: User[]) => void
type DisplayErrorsCallBack = (errors: string[]) => void
type SortCallBack = (sort: Array<SortDescriptor>) => void

const validate = (data: User | null) => {
  const errors: string[] = []
  if (data !== null && !isValidName(data.name).state) {
    errors.push(isValidName(data.name).error)
  }
  if (data !== null && !isValidAddress(data.address).state) {
    errors.push(isValidAddress(data.address).error)
  }
  if (data !== null && !isValidTPNO(data.mobileNo).state) {
    errors.push(isValidTPNO(data.mobileNo).error)
  }
  if (data !== null && !isValidDateOfBirth(data.dateOfBirth).state) {
    errors.push(isValidDateOfBirth(data.dateOfBirth).error)
  }
  return errors
}




const execute = async(
  editId: number,
  setEditId: EditIdCallBack,
  setNewAdded: NewAddedCallBack,
  setTempData: TempDataCallback,
  data: User[],
  displayErrors: DisplayErrorsCallBack,
  setSort: SortCallBack,
  newAdded:boolean
) => {
  let record:User|null = null
  data.forEach((item) => {
    if (item.id === editId) {
      record = item
    }
  })
  const errors = validate(record)
  
  if (errors.length === 0) {

    if (record !== null) {
      let response = null;
        try {
          if(newAdded){
           response = await createStudent(record);
          }
          else{
             response = await editStudent(record);
          }
          if (response !== null) {
            setEditId(null)
            setNewAdded(false)
            setTempData(data)
          }
        } catch (error:any) {
          displayErrors([error.message])
        }
        
      
    }

    setSort([
      {
        field: 'id',
        dir: 'asc',
      },
    ])
  } else {
    displayErrors(errors)
  }
}

const edit = (newAdded: boolean, setEditId: EditIdCallBack, index: number) => {
  if (!newAdded) {
    setEditId(index)
  }
}
const remove = async(setData: DataCallback,setTempData:TempDataCallback, dataIndex: number, data: User[],displayErrors: DisplayErrorsCallBack) => {

  
  const response = await deleteStudent(dataIndex);
  console.log(response);
  if(response.ok){
  const newData: User[] = []
  data.forEach((item) => {
    if (dataIndex !== item.id) {
      newData.push(item)
    }
  })
  setData(newData)
  setTempData(newData);
  
  }
  if(!response.ok){
    displayErrors([response.statusText])
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
  setSort: SortCallBack,
) => {
  return (
    <td className='k-command-cell'>
      {dataIndex === editId && newAdded && (
        <div className='table--button--group'>
          <button
            onClick={() => {
              execute(editId, setEditId, setNewAdded, setTempData, data, displayErrors, setSort,newAdded)
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

      {dataIndex === editId && !newAdded && (
        <div className='table--button--group'>
          <button
            onClick={() => {
              execute(editId, setEditId, setNewAdded, setTempData, data, displayErrors, setSort,newAdded)
            }}
            className='table--button k-button k-button-md k-rounded-md k-button-solid k-button-solid-light k-grid-save-command'
          >
            Update
          </button>
          <button
            onClick={() => {
              discard(setEditId, setNewAdded, setData, tempData)
            }}
            className='table--button k-button k-button-md k-rounded-md k-button-solid k-button-solid-light k-grid-save-command'
          >
            Cancel
          </button>
        </div>
      )}

      {dataIndex !== editId && (
        <div className='table--button--group'>
          <button
            onClick={() => {
              edit(newAdded, setEditId, dataIndex)
            }}
            className='table--button k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-save-command'
          >
            Edit
          </button>
          <button
            onClick={() => {
              remove(setData,setTempData, dataIndex, data,displayErrors);
            }}
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
    age = calculateAge(new Date(props.dataItem.dateOfBirth))
    if (age < 0) {
      age = null
    }
  }
  return <td>{age}</td>
}

export const addRecord = async(
  newAdded: boolean,
  setEditId: EditIdCallBack,
  setNewAdded: NewAddedCallBack,
  setData: DataCallback,
  setSort: SortCallBack,
  data: User[],
) => {
  setSort([
    {
      field: 'id',
      dir: 'desc',
    },
  ])

  let maxId = 0
  data.forEach((item) => {
    if (item.id > maxId) {
      maxId = item.id
    }
  })

    if (!newAdded) {
    const newRecord = {
      id: maxId + 1,
      name: '',
      gender: '',
      address: '',
      mobileNo: '',
      dateOfBirth: null,
      age: 0,
    }
    setNewAdded(true)
    setData([newRecord, ...data])
    setEditId(maxId + 1)
    }
}

export const gender = (
  gender: string,
  data: User[],
  setData: DataCallback,
  editId: number | null,
) => {
  return (
    <td>
      <DropDown gender={gender} data={data} setData={setData} editId={editId} />
    </td>
  )
}
