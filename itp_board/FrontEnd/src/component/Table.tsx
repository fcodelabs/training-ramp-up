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
import { command, calcAge, addRecord } from '../Pages/Users/UserFunction'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Table = () => {
  const [data, setData] = useState(Users)
  const [tempData, setTempData] = useState(Users)
  const [editId, setEditId] = useState<number | null>(null)
  const [newAdded, setNewAdded] = useState(false)

  const itemChange = (event: GridItemChangeEvent) => {
    const field = event.field || ''
    const newData = data.map((item, index) => {
      return index === editId ? { ...item, [field]: event.value } : item
    })
    setData(newData)
  }

  const displayErrors = (errors:string[]) =>{
    errors.forEach((error)=>{
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    })
  }

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
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
              onClick={() => {
                addRecord(newAdded, setEditId, setNewAdded, setData, data)
              }}
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
        <GridColumn field='age' title='Age' cell={calcAge} />
        <GridColumn
          field='command'
          title='Command'
          cell={(props: GridCellProps) => {
            return command(
              props.dataIndex,
              editId,
              newAdded,
              setEditId,
              setNewAdded,
              setTempData,
              data,
              setData,
              tempData,
              displayErrors
            )
          }}
          className='k-text-center'
        />
      </Grid>
    </>
  )
}

export default Table
