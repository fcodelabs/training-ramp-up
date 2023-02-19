import * as React from 'react'
import {
  Grid,
  GridColumn,
  GridCellProps,
  GridItemChangeEvent,
  GridToolbar,
} from '@progress/kendo-react-grid'
import { MyCommandCell } from '../../components/CommandCell/CommandCell'
import { DropDownCell } from '../../components/DropDownCell/DropDownCell'
import { DateCell } from '../../components/DateCell/DateCell'
import { ToastContainer } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { Student } from '../../utils/interfaces'
import { addStudent, deleteStudent, getStudents, updateStudent } from './gridSlice'
import { checkValid } from '../../utils/validators'
import ButtonAppBar from '../../components/AppBar/AppBar'
const editField = 'inEdit'

export default function Grids() {
  const dispatch = useDispatch()
  const students = useSelector((state: any) => state.grid.students)
  const role = useSelector((state: any) => state.user.role)

  console.log(role)
  const [data, setData] = React.useState<Student[]>([])
  const [admin, setAdmin] = React.useState<boolean>(false)

  React.useEffect(() => {
    dispatch(getStudents())
  }, [])

  React.useEffect(() => {
    if (role === 'admin') {
      setAdmin(true)
    }
    console.log(admin)
    setData(students)
  }, [students])

  const remove = async (dataItem: Student) => {
    dispatch(deleteStudent(dataItem))
  }

  const add = (dataItem: Student) => {
    dispatch(addStudent(dataItem))
  }

  const update = (dataItem: Student) => {
    if (checkValid(dataItem)) {
      dispatch(updateStudent(dataItem))
    }
  }

  const discard = () => {
    setData(students)
  }

  const cancel = () => {
    setData(students)
  }

  const enterEdit = (dataItem: Student) => {
    setData(data.map((item) => (item.id === dataItem.id ? { ...item, inEdit: true } : item)))
  }

  const itemChange = (event: GridItemChangeEvent) => {
    const newData = data.map((item) =>
      item.id === event.dataItem.id ? { ...item, [event.field || '']: event.value } : item,
    )

    setData(newData)
  }

  const addNew = () => {
    const newDataItem: any = { inEdit: true }
    setData([newDataItem, ...data])
  }

  const CommandCell = (props: GridCellProps) => (
    <MyCommandCell
      {...props}
      edit={enterEdit}
      remove={remove}
      add={add}
      discard={discard}
      update={update}
      cancel={cancel}
      editField={editField}
    />
  )

  return (
    <div>
      <ButtonAppBar />

      <Grid
        style={{ height: '90%', marginTop: '20px' }}
        data={data}
        onItemChange={itemChange}
        editField={editField}
        dataItemKey={'id'}
        total={data.length}
      >
        <GridToolbar>
          {admin ? (
            <button
              title='Add new'
              className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary'
              onClick={addNew}
            >
              Add new
            </button>
          ) : null}
        </GridToolbar>
        <GridColumn field='id' title='id' width='40px' editable={false} />
        <GridColumn field='name' title='Name' width='250px' />
        <GridColumn field='gender' title='Gender' cell={DropDownCell} />
        <GridColumn field='address' title='Address' />
        <GridColumn field='mobile' title='Mobile No' />
        <GridColumn field='dob' title='Date of Birth' format='{0:D}' cell={DateCell} />
        <GridColumn field='age' title='Age' editable={false} width='100px' />
        {admin ? <GridColumn title='command ' cell={CommandCell} width='200px' /> : null}
      </Grid>
      <ToastContainer />
    </div>
  )
}
