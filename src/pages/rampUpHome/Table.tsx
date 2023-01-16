import * as React from 'react'
import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridItemChangeEvent,
  GridPageChangeEvent,
  GridSortChangeEvent,
  GridToolbar,
} from '@progress/kendo-react-grid'
import { durationInYears } from '@progress/kendo-date-math'
import { CommandCell } from '../../helpers/CommandCell'
import { PageState, Person } from '../../helpers/interface'
import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns'
import { DatePicker, DatePickerChangeEvent } from '@progress/kendo-react-dateinputs'
import { insertItem, getItems, updateItem, deleteItem, checkErr } from '../../helpers/Services'
import { Notification, NotificationGroup } from '@progress/kendo-react-notification'
import { Fade } from '@progress/kendo-react-animation'
import { orderBy, SortDescriptor } from '@progress/kendo-data-query'

const editField: string = 'inEdit'
const gender = ['Female', 'Male']
const initialSort: SortDescriptor[] = [{ field: 'PersonID', dir: 'asc' }]
const initialDataState: PageState = { skip: 0, take: 10 }

export const Table = (): any => {
  const [data, setData] = React.useState<Person[]>([])
  const [errs, setErr] = React.useState<string[]>([])
  const [personGen, setGender] = React.useState({ value: 'Male' })
  const [birthday, setBirthday] = React.useState<Date>(new Date())
  const [success, setSuccess] = React.useState(false)
  const [sort, setSort] = React.useState(initialSort)
  const [page, setPage] = React.useState<PageState>(initialDataState)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onToggle = () => {
    setSuccess(!success)
    if (!success) {
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }
  }

  React.useEffect(() => {
    const newItems = getItems()
    setData(newItems)
  }, [])

  const itemChange = (event: GridItemChangeEvent): any => {
    const newData = data.map((item) =>
      item.PersonID === event.dataItem.PersonID
        ? { ...item, [event.field ?? '']: event.value }
        : item,
    )

    setData(newData)
  }

  const add = (dataItem: Person): any => {
    dataItem.inEdit = true
    dataItem.DateOfBirth = birthday
    dataItem.PersonGender = personGen.value
    const errs = checkErr(dataItem)
    setErr(errs)
    if (errs.length > 0) {
      onToggle()
    } else {
      const newData = insertItem(dataItem)
      setData(newData)
    }
  }

  // Local state operations
  const discard = (): any => {
    const newData = [...data]
    newData.splice(0, 1)
    setData(newData)
  }

  // modify the data in the store, db etc
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const remove = (dataItem: Person) => {
    const newData = [...deleteItem(dataItem)]
    setData(newData)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const update = (dataItem: Person) => {
    dataItem.DateOfBirth = birthday
    dataItem.PersonGender = personGen.value
    const errs = checkErr(dataItem)
    setErr(errs)
    if (errs.length > 0) {
      onToggle()
    } else {
      const newData = updateItem(dataItem)
      setData(newData)
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const cancel = (dataItem: Person) => {
    const originalItem = getItems().find((p) => p.PersonID === dataItem.PersonID)
    const newData = data.map((item) =>
      item.PersonID === originalItem?.PersonID ? originalItem : item,
    )

    setData(newData)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const enterEdit = (dataItem: Person) => {
    setData(
      data.map((item) => (item.PersonID === dataItem.PersonID ? { ...item, inEdit: true } : item)),
    )
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const addNew = () => {
    const newDataItem: Person = {
      inEdit: true,
      Discontinued: false,
      PersonID: 0,
    }

    setData([newDataItem, ...data])
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeDropDown = (event: DropDownListChangeEvent) => {
    setGender({
      value: event.target.value,
    })
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeDatePicker = (event: DatePickerChangeEvent) => {
    event.value != null && setBirthday(event.value)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const pageChange = (event: GridPageChangeEvent) => {
    setPage(event.page)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const CommandCellFunc = (props: GridCellProps) => (
    <CommandCell
      {...props}
      edit={enterEdit}
      remove={remove}
      add={add}
      editField={editField}
      discard={discard}
      update={update}
      cancel={cancel}
    />
  )

  return (
    <React.Fragment>
      <Grid
        style={{ height: '720px' }}
        data={orderBy(data.slice(page.skip, page.take + page.skip),sort)}
        onItemChange={itemChange}
        editField={editField}
        skip={page.skip}
        take={page.take}
        total={data.length}
        pageable={true}
        onPageChange={pageChange}
        sortable={true}
        sort={sort}
        onSortChange={(e: GridSortChangeEvent) => {
          setSort(e.sort)
        }}
      >
        <GridToolbar>
          <button
            title='Add new'
            onClick={addNew}
            className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-error'
          >
            Add new
          </button>
        </GridToolbar>
        <Column field='PersonID' title='Id' width='100px' editable={false} />
        <Column field='PersonName' title='Person Name' width='200px' />
        <Column
          field='PersonGender'
          title='Person Gender'
          width='150px'
          cell={(props: GridCellProps) => (
            <td>
              {props?.dataItem?.inEdit === true ? (
                <DropDownList
                  style={{ width: '300px' }}
                  data={gender}
                  defaultValue='Male'
                  value={personGen.value}
                  onChange={handleChangeDropDown}
                />
              ) : (
                props?.dataItem?.PersonGender
              )}
            </td>
          )}
        />
        <Column field='PersonAddress' title='Person Address' />
        <Column field='PersonMobileNo' title='Person Mobile No' width='150px' />
        <Column
          field='DateOfBirth'
          title='Date Of Birth'
          cell={(props: GridCellProps) => (
            <td>
              {props?.dataItem?.inEdit === true ? (
                <DatePicker
                  min={new Date(1970, 1, 1)}
                  max={new Date()}
                  value={birthday}
                  onChange={handleChangeDatePicker}
                />
              ) : (
                props?.dataItem?.DateOfBirth?.toString()?.slice(0, 15)
              )}
            </td>
          )}
          width='220px'
          // format='{0:EEE MMM dd yyyy}'
        />

        <Column
          title='Person Age'
          cell={(props: GridCellProps) => (
            <td>
              {props?.dataItem?.inEdit === true
                ? durationInYears(birthday, new Date())
                : // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                props?.dataItem?.DateOfBirth
                ? durationInYears(props.dataItem.DateOfBirth, new Date())
                : ''}
            </td>
          )}
          width='120px'
          editable={false}
        />

        <Column title='Command' cell={CommandCellFunc} width='300px' />
      </Grid>
      <NotificationGroup
        style={{
          right: 0,
          bottom: 0,
          alignItems: 'flex-start',
          flexWrap: 'wrap-reverse',
        }}
      >
        <Fade enter={true} exit={true}>
          {success && (
            <Notification
              type={{ style: 'success', icon: true }}
              closable={true}
              onClose={() => {
                setSuccess(false)
              }}
            >
              {errs.map((element, index) => (
                <li key={index}>{element}</li>
              ))}
            </Notification>
          )}
        </Fade>
      </NotificationGroup>
    </React.Fragment>
  )
}
