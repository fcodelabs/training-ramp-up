/* eslint-disable react/prop-types */
import '@progress/kendo-theme-default/dist/all.css'
import {
  GridItemChangeEvent,
  Grid,
  GridColumn,
  GridToolbar,
  GridCellProps,
} from '@progress/kendo-react-grid'
import { Users } from '../dummy'
import '../App.css'
import { useState } from 'react'
import { command } from '../Pages/Users/UserFunction'


const Table = () => {
  const [data, setData] = useState(Users)
  const [editId, setEditId] = useState<number | null>(null)
  const [newAdded, setNewAdded] = useState(false)

  const itemChange = (event: GridItemChangeEvent) => {
    const field = event.field || ''
    const newData = data.map((item, index) => {
      return index === editId ? { ...item, [field]: event.value } : item
    })
    setData(newData)
  }



  return (
    <>

      <Grid
        data={data.map((record, index) => ({
          ...record,
          inEdit: index === editId,
        }))}
        editField='inEdit'
        onItemChange={itemChange}
      >
        <GridToolbar>
          <div>
            <button
              title='Add new'
              className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-light'
            >
              Add new
            </button>
          </div>
        </GridToolbar>
        <GridColumn field='id' title='ID' />
        <GridColumn field='name' title='Name' />
        <GridColumn field='gender' title='Gender' />
        <GridColumn field='address' title='Address' />
        <GridColumn field='mobileNo' title='Mobile No' />
        <GridColumn editor='date' format='{0:D}' field='dateOfBirth' title='Date of Birth' />
        <GridColumn field='age' title='Age'/>
        <GridColumn
          field='command'
          title='Command'
          cell={(props: GridCellProps) => {
            return command()
          }}
          className='k-text-center'
        />
      </Grid>
    </>
  )
}

export default Table
