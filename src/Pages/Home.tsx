import * as React from 'react'
import '@progress/kendo-theme-default/dist/all.css'
import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridItemChangeEvent,
  GridPageChangeEvent,
  GridToolbar,
} from '@progress/kendo-react-grid'

import { MyCommandCell } from '../components/myCommandCell'
import { insertItem, getItems, updateItem, deleteItem } from '../components/services'
import { User } from '../components/interface'
import { DropDownCell } from '../components/dropDownCell'

interface PageState {
  skip: number
  take: number
}
const initialDataState: PageState = { skip: 0, take: 17 }

function Home() {
  const [page, setPage] = React.useState<PageState>(initialDataState)
  const pageChange = (event: GridPageChangeEvent) => {
    setPage({
      skip: event.page.skip,
      take: event.page.take,
    })
  }

  const editField = 'inEdit'

  const [data, setData] = React.useState<User[]>([])

  React.useEffect(() => {
    const newItems = getItems()
    setData(newItems)
  }, [])

  // modify the data in the store, db etc
  const remove = (dataItem: User) => {
    const newData = [...deleteItem(dataItem)]
    setData(newData)
  }

  const add = (dataItem: User) => {
    dataItem.inEdit = true

    const newData = insertItem(dataItem)
    setData(newData)
  }

  const update = (dataItem: User) => {
    dataItem.inEdit = false
    const newData = updateItem(dataItem)
    setData(newData)
  }

  // Local state operations
  const discard = () => {
    const newData = [...data]
    newData.splice(0, 1)
    setData(newData)
  }

  const cancel = (dataItem: User) => {
    const originalItem = getItems().find((p) => p.ID === dataItem.ID)
    const newData = data.map((item) => (item.ID === originalItem?.ID ? originalItem : item))

    setData(newData)
  }

  const enterEdit = (dataItem: User) => {
    setData(data.map((item) => (item.ID === dataItem.ID ? { ...item, inEdit: true } : item)))
  }

  const itemChange = (event: GridItemChangeEvent) => {
    const newData = data.map((item) =>
      item.ID === event.dataItem.ID ? { ...item, [event.field || '']: event.value } : item,
    )

    setData(newData)
  }

  const addNew = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <Grid
      style={{ height: '100%' }}
      data={data.slice(page.skip, page.take + page.skip)}
      onItemChange={itemChange}
      editField={editField}
      skip={page.skip}
      take={page.take}
      total={data.length}
      pageable={true}
      onPageChange={pageChange}
    >
      <GridToolbar>
        <button
          title='Add new'
          className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary'
          onClick={addNew}
        >
          Add new
        </button>
      </GridToolbar>
      <Column field='ID' title='Id' width='100px' editable={false} />
      <Column field='Name' title='Name' />
      <Column field='Gender' title='Gender' width='120px' cell={DropDownCell} />
      <Column field='Address' title='Address' width='300px' />
      <Column field='Mobile' title='Mobile No' width='150px' />
      <Column field='DOB' title='Date of Birth' editor='date' width='200px' format='{0:D}' />

      <Column field='Age' title='Age' width='100px' editable={false} />
      <Column title='Command' cell={CommandCell} width='200px' />
    </Grid>
  )
}

export default Home
