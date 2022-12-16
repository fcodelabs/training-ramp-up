import * as React from 'react'
import { useState, useEffect } from 'react'
// import * as ReactDOM from 'react-dom'
import {
  Grid,
  GridCellProps,
  GridColumn,
  GridItemChangeEvent,
  GridToolbar
} from '@progress/kendo-react-grid'
import { Button } from '@progress/kendo-react-buttons'
import '@progress/kendo-theme-default/dist/all.css'
import CommandCell from '../CommandCell/CommandCell'
import { durationInYears, addYears } from '@progress/kendo-date-math'
import DropDownCell from '../DropDownCell/DropDownCell'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import {
  addStudent,
  editStudent,
  getAllStudents,
  removeStudent
} from '../../pages/Home/HomeSlice'
import Person, { UpdatedPerson } from '../../utils/interface'

const PersonTableView = () => {
  const students = useSelector((state: any) => state.students.students)
  // const error = useSelector((state: any) => state.students.error)
  const editField: string = 'inEdit'

  const dispatch = useDispatch()
  const [data, setData] = useState(students)

  useEffect(() => {
    dispatch(getAllStudents())
  }, [])

  useEffect(() => {
    setData(students)
  }, [students])

  const [changes, setChanges] = useState<UpdatedPerson[]>([])

  const validateAdd = (person: Person) => {
    const name = /^([A-z\s.]{3,20})$/

    const address = /^([A-z0-9/,\s]{5,})$/

    const mobileNo = /^([0][0-9]{9})$/

    const dob: boolean =
      person.dob !== null && new Date() >= addYears(person.dob, 18)

    if (!name.test(person.name)) {
      alert('Enter valid name')
      return false
    }
    if (person.gender === '') {
      alert('Select valid gender')
      return false
    }
    if (!address.test(person.address)) {
      alert('Enter the address')
      return false
    }
    if (!mobileNo.test(person.mobileNo)) {
      alert('Enter Valid phone number')
      return false
    }
    if (!dob) {
      alert('Enter Valid Date of birth\nAge need to be more than 18 years!!!!')
      return false
    }
    return true
  }

  const validateUpdate = (person: UpdatedPerson) => {
    const name = /^([A-z\s.]{3,20})$/

    const address = /^([A-z0-9/,\s]{5,})$/

    const mobileNo = /^([0][0-9]{9})$/

    const dob: boolean =
      person.dob !== undefined && new Date() >= addYears(person.dob, 18)

    if (person.name !== undefined && !name.test(person.name)) {
      alert('Enter valid name')
      return false
    }
    if (person.gender !== undefined && person.gender === '') {
      alert('Select valid gender')
      return false
    }
    if (person.address !== undefined && !address.test(person.address)) {
      alert('Enter the address')
      return false
    }
    if (person.mobileNo !== undefined && !mobileNo.test(person.mobileNo)) {
      alert('Enter Valid phone number')
      return false
    }
    if (person.dob !== undefined && !dob) {
      alert('Enter Valid Date of birth\nAge need to be more than 18 years!!!!')
      return false
    }
    return true
  }

  const add = (dataItem: Person): any => {
    if (validateAdd(dataItem)) {
      console.log(dataItem)
      dispatch(addStudent(dataItem))
    }
  }

  const update = (dataItem: Person): void => {
    const updatePerson = changes.find(
      (person: UpdatedPerson) => person.id === dataItem.id
    )

    if (updatePerson == null) return
    const temp: UpdatedPerson = {
      id: updatePerson?.id
    }
    if (updatePerson?.mobileNo !== '') {
      temp.mobileNo = updatePerson?.mobileNo
    }
    if (updatePerson?.name !== '') {
      temp.name = updatePerson?.name
    }
    if (updatePerson?.gender !== '') {
      temp.gender = updatePerson?.gender
    }
    if (updatePerson?.address !== '') {
      temp.address = updatePerson?.address
    }
    if (updatePerson?.dob !== undefined) {
      temp.dob = updatePerson?.dob
    }

    if (validateUpdate(temp)) {
      dispatch(editStudent(temp))

      const index = changes.findIndex(
        (record: UpdatedPerson) => record.id === updatePerson.id
      )
      changes.slice(index, 1)
      setChanges(changes)
    }
  }

  const discard = (): void => {
    const newData = [...data]
    newData.splice(0, 1)
    setData(newData)
  }

  const cancel = (dataItem: Person): void => {
    const originalItem = students.find(
      (person: Person) => person.id === dataItem.id
    )
    const newData = data.map((item: Person) =>
      item.id === originalItem.id ? originalItem : item
    )
    setData(newData)
  }

  const enterEdit = (dataItem: Person): void => {
    setData(
      data.map((person: Person) =>
        person.id === dataItem.id ? { ...person, inEdit: true } : person
      )
    )
  }

  const remove = (dataItem: Person): void => {
    dispatch(removeStudent(dataItem))
  }

  const command = (props: GridCellProps): any => (
    <CommandCell
      gridCellProps={props}
      edit={(p: Person) => {
        enterEdit(p)
      }}
      remove={(p: Person) => {
        remove(p)
      }}
      add={(p: Person) => {
        add(p)
      }}
      discard={discard}
      update={(p: Person) => {
        update(p)
      }}
      cancel={(p: Person) => {
        cancel(p)
      }}
    />
  )

  const itemChange = (event: GridItemChangeEvent): void => {
    const newData = data.map((person: Person) =>
      person.id === event.dataItem.id
        ? { ...person, [event.field ?? '']: event.value }
        : person
    )
    setData(newData)

    if (event.field != null) {
      const match: UpdatedPerson = changes.filter(
        (item) => item.id === event.dataItem.id
      )[0]
      if (match != null) {
        const newPersons = changes.map((person: UpdatedPerson) =>
          person.id === event.dataItem.id
            ? { ...person, [event.field ?? '']: event.value }
            : person
        )
        setChanges(newPersons)
      } else {
        const newDataItem: UpdatedPerson = {
          id: event.dataItem.id,
          dob: undefined,
          name: '',
          gender: '',
          address: '',
          mobileNo: ''
        }
        const newPerson = { ...newDataItem, [event.field]: event.value }
        setChanges([...changes, newPerson])
      }
    }
  }

  const addNew = (): void => {
    const date = new Date()
    const newDate = addYears(date, -18)
    const newDataItem: Person = {
      inEdit: true,
      id: 0,
      dob: newDate,
      name: '',
      gender: '',
      address: '',
      mobileNo: ''
    }
    setData([newDataItem, ...data])
  }

  const calAge = (secondProps: GridCellProps) => {
    const current = new Date()
    const dob = secondProps.dataItem.dob
    let age: number | string = durationInYears(dob, current)
    if (age < 0) {
      age = ''
    }
    return <td>{age}</td>
  }

  return (
    <Grid
      style={{ width: '100%', minHeight: '400px', maxHeight: '600px' }}
      data={data}
      onItemChange={itemChange}
      editField={editField}
    >
      <GridToolbar>
        <Button
          title="Add New"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-secondary"
          onClick={addNew}
        >
          Add New
        </Button>
      </GridToolbar>
      <GridColumn field="id" title="ID" width="80px" editable={false} />
      <GridColumn field="name" title="Name" width="200px" editor="text" />
      <GridColumn
        field="gender"
        title="Gender"
        width="150px"
        cell={DropDownCell}
      />
      <GridColumn field="address" title="Address" width="200px" editor="text" />
      <GridColumn
        field="mobileNo"
        title="Mobile No"
        width="200px"
        editor="text"
      />
      <GridColumn
        field="dob"
        title="Date Of Birth"
        width="250px"
        format="{0:D}"
        editor="date"
      />
      <GridColumn title="Age" width="108px" editable={false} cell={calAge} />
      <GridColumn title="command" width="170px" cell={command} />
    </Grid>
  )
}

export default PersonTableView
