import * as React from 'react'
import { useState } from 'react'
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
import {
  deleteItem,
  getPersons,
  insertPerson,
  updatePerson
} from './PersonTableViewOperations'
import Person from '../../utils/interface'
// import DropDownCell from '../DropDownCell/DropDownCell'
import CommandCell from '../CommandCell/CommandCell'
import { durationInYears } from '@progress/kendo-date-math'
import DropDownCell from '../DropDownCell/DropDownCell'
import personTableViewValidation from './personTableViewValidation'

const PersonTableView: React.FC = () => {
  const [data, setData] = useState<Person[]>(getPersons())
  const editField: string = 'inEdit'

  const add = (dataItem: Person): any => {
    if (personTableViewValidation(dataItem)) {
      dataItem.inEdit = true
      const newData = insertPerson(dataItem)
      setData(newData)
    }
  }

  const update = (dataItem: Person): void => {
    if (personTableViewValidation(dataItem)) {
      const newData = updatePerson(dataItem)
      setData(newData)
    }
  }

  const discard = (): void => {
    const newData = [...data]
    newData.splice(0, 1)
    setData(newData)
  }

  const cancel = (dataItem: Person): void => {
    const originalItem: Person[] = getPersons().filter(
      (p) => p.personID === dataItem.personID
    )
    if (originalItem.length <= 0) return
    const newData = data.map((person) =>
      person.personID === originalItem[0].personID ? originalItem[0] : person
    )

    setData(newData)
  }

  const enterEdit = (dataItem: Person): void => {
    setData(
      data.map((person) =>
        person.personID === dataItem.personID
          ? { ...person, inEdit: true }
          : person
      )
    )
  }

  const remove = (dataItem: Person): void => {
    const newData = [...deleteItem(dataItem)]
    setData(newData)
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
    const newData = data.map((person) =>
      person.personID === event.dataItem.personID
        ? { ...person, [event.field ?? '']: event.value }
        : person
    )
    setData(newData)
  }

  const addNew = (): void => {
    const newDataItem: Person = {
      inEdit: true,
      personID: 0,
      dob: new Date(),
      personName: '',
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
    if (age < 0) { age = '' }
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
      <GridColumn field="personID" title="ID" width="80px" editable={false} />
      <GridColumn field="personName" title="Name" width="200px" editor="text" />
      <GridColumn field="gender" title="Gender" width="150px" cell={DropDownCell}/>
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
