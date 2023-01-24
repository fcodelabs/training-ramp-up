/* eslint-disable react/prop-types */
import '@progress/kendo-theme-default/dist/all.css'
import {
  GridItemChangeEvent,
  Grid,
  GridColumn,
  GridToolbar,
  GridCellProps,
  GridSortChangeEvent,
  GridPageChangeEvent,
} from '@progress/kendo-react-grid'
import '../../../../App.css'
import { useState, useEffect } from 'react'
import { command, calcAge, addRecord, gender } from '../../utils/UserFunction'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { orderBy, SortDescriptor } from '@progress/kendo-data-query'
import { getData } from '../../utils/dataBaseInteractions'
import { User,Res,PageState } from '../../utils/types'
import { io } from 'socket.io-client'
const socket = io('http://localhost:4000')


const Table = () => {
  const [data, setData] = useState<User[]>([])
  const [tempData, setTempData] = useState<User[]>([])
  const [editId, setEditId] = useState<number | null>(null)
  const [newAdded, setNewAdded] = useState(false)
  const initialSort: Array<SortDescriptor> = [
    {
      field: 'id',
      dir: 'asc',
    },
  ]
  const initialPageState:PageState = {skip:0,take:10}
  const [sort, setSort] = useState(initialSort)
  const [page, setPage] = useState(initialPageState)
  const [notification, setNotification] = useState('');

  useEffect(() => {
    async function fetchData() {
      const data = await getData(displayErrors)
      setData(data);
      setTempData(data)
    }
    socket.on('new_student_added', (response:Res) => {
      setNotification(`New Student added with the id:${response.id}`)
      fetchData()
    })
    socket.on('student_edited', (response:Res) => {
      setNotification(`Student data edited with the id:${response.id}`)
      fetchData()
    })
    socket.on('student_deleted', (response:Res) => {
      console.log(response);
      setNotification(`Student data deleted with the id:${response}`)

      fetchData()
    })

    fetchData()
  }, [socket])

  const itemChange = (event: GridItemChangeEvent) => {
    const field = event.field || ''
    const newData = data.map((item) => {
      return item.id === editId ? { ...item, [field]: event.value } : item
    })
    setData(newData)
  }

  const pageChange = (event:GridPageChangeEvent)=>{
    setPage(event.page);
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
    <h4>{notification}</h4>
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
          data
            .map((record) => ({
              ...record,
              inEdit: record.id === editId,
            }))
            .slice(page.skip, page.take + page.skip),
          sort,
        )}
        editField='inEdit'
        onItemChange={itemChange}
        sortable={true}
        sort={sort}
        onSortChange={(e: GridSortChangeEvent) => {
          setSort(e.sort)
        }}
        pageable={true}
        skip={page.skip}
        take={page.take}
        total={data.length}
        onPageChange={pageChange}
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
