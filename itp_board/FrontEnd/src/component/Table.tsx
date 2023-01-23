/* eslint-disable react/prop-types */
import '@progress/kendo-theme-default/dist/all.css'
import {
  GridItemChangeEvent,
  Grid,
  GridColumn,
  GridToolbar,
  GridCellProps,
  GridSortChangeEvent,
} from '@progress/kendo-react-grid'
import { Users } from '../dummy'
import '../App.css'
import { useState } from 'react'
import { command, calcAge, addRecord, gender } from '../Pages/Users/utils/UserFunction'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { orderBy, SortDescriptor } from '@progress/kendo-data-query'

const Table = () => {
  const [data, setData] = useState(Users)
  const [tempData, setTempData] = useState(Users)
  const [editId, setEditId] = useState<number | null>(null)
  const [newAdded, setNewAdded] = useState(false)
  const initialSort: Array<SortDescriptor> = [
    {
      field: 'id',
      dir: 'asc',
    },
  ]
  const [sort, setSort] = useState(initialSort)

  const itemChange = (event: GridItemChangeEvent) => {
    const field = event.field || ''
    const newData = data.map((item) => {
      return item.id === editId ? { ...item, [field]: event.value } : item
    })
    setData(newData)
  }

  const displayErrors = (errors: string[]) => {
    errors.forEach((error) => {
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
        data={orderBy(
          data.map((record) => ({
            ...record,
            inEdit: record.id === editId,
          })),
          sort,
        )}
        editField='inEdit'
        onItemChange={itemChange}
        sortable={true}
        sort={sort}
        onSortChange={(e: GridSortChangeEvent) => {
          setSort(e.sort)
        }}
      >
        <GridToolbar>
          <div>
            <button
              title='Add new'
              className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-light'
              onClick={() => {
                addRecord(newAdded, setEditId, setNewAdded, setData, setSort, data)
              }}
            >
              Add new
            </button>
          </div>
        </GridToolbar>
        <GridColumn field='id' title='ID' editable={false} />
        <GridColumn field='name' title='Name' />
        <GridColumn
          field='gender'
          title='Gender'
          cell={(props: GridCellProps) => {
            return gender(props.dataItem.gender, data, setData, editId)
          }}
        />
        <GridColumn field='address' title='Address' />
        <GridColumn field='mobileNo' title='Mobile No' />
        <GridColumn editor='date' format='{0:D}' field='dateOfBirth' title='Date of Birth' />
        <GridColumn field='age' title='Age' cell={calcAge} />
        <GridColumn
          field='command'
          title='Command'
          cell={(props: GridCellProps) => {
            return command(
              props.dataItem.id,
              editId,
              newAdded,
              setEditId,
              setNewAdded,
              setTempData,
              data,
              setData,
              tempData,
              displayErrors,
              setSort,
            )
          }}
          className='k-text-center'
        />
      </Grid>
    </>
  )
}

export default Table
