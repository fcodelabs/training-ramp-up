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
import { CommandCell } from '../../components/commandCell/CommandCell'
import { PageState, Person } from '../../models/interface'
import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns'
import { DatePicker, DatePickerChangeEvent } from '@progress/kendo-react-dateinputs'
import { getItems, checkErr, generateId, checkSimilarity } from '../../services/commandServices'
import { Notification, NotificationGroup } from '@progress/kendo-react-notification'
import { Fade } from '@progress/kendo-react-animation'
import { orderBy, SortDescriptor } from '@progress/kendo-data-query'
import { useDispatch, useSelector } from 'react-redux'
import {
  addPersonDataStart,
  deletePersonDataStart,
  getPersonDataStart,
  updatePersonDataStart,
} from './personDataSlice'
import { delteNotification, getNotificationStart } from './notificationSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from '@progress/kendo-react-buttons'
import { userLogOutStart } from '../signInPage/userSlice'
const editField: string = 'inEdit'
const gender = ['Female', 'Male']
const initialSort: SortDescriptor[] = [{ field: 'PersonID', dir: 'asc' }]
const initialDataState: PageState = { skip: 0, take: 8 }

export const HomePage = (): any => {
  const [data, setData] = React.useState<Person[]>([])
  const [errs, setErr] = React.useState<string[]>([])
  const [personGen, setGender] = React.useState({ value: 'Male' })
  const [birthday, setBirthday] = React.useState<Date>(new Date())
  const [success, setSuccess] = React.useState(false)
  const [sort, setSort] = React.useState(initialSort)
  const [page, setPage] = React.useState<PageState>(initialDataState)
  const [prevState, setPrevState] = React.useState<Person | object>({})

  const distpatch = useDispatch()

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onToggle = () => {
    setSuccess(!success)
    if (!success) {
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }
  }
  const persondata = useSelector((state: any) => state.personData.person)
  const notifications = useSelector((state: any) => state.notification.notifications)
  const userData = useSelector((state: any) => state?.userData?.user?.user)


  const notify = (msg: string): any => toast(msg)
  React.useEffect(() => {
    distpatch(getPersonDataStart())
    distpatch(getNotificationStart())
  }, [])

  React.useEffect(() => {
    setData(persondata)
  }, [persondata])

  React.useEffect(() => {
    if (notifications.length > 0) {
      const notificationTrigger = (): void => {
        notify(notifications[notifications.length - 1].toString())
      }
      notificationTrigger()
      setTimeout(() => {
        distpatch(delteNotification())
      }, 1000)
    }
  }, [notifications])

  React.useEffect(() => {
    setBirthday(new Date())
    setGender({ value: 'Male' })
  }, [persondata])

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

    const newId = generateId(persondata)
    const errs = checkErr(dataItem)

    setErr(errs)

    if (errs.length > 0) {
      onToggle()
    } else {
      data.shift()
      distpatch(addPersonDataStart([dataItem, newId]))
    }
  }

  // Local state operations
  const discard = (): void => {
    const newData = [...data]
    newData.splice(0, 1)
    setData(newData)
    setBirthday(new Date())
    setGender({ value: 'Male' })
  }

  const remove = (dataItem: Person): void => {
    distpatch(deletePersonDataStart(dataItem.PersonID))
  }

  const update = (dataItem: Person): void => {
    dataItem.DateOfBirth = birthday
    dataItem.PersonGender = personGen.value
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    if (checkSimilarity(dataItem, prevState as Person)) {
      alert('No changes made')
    } else {
      const errs = checkErr(dataItem)
      setErr(errs)
      if (errs.length > 0) {
        onToggle()
      } else {
        distpatch(updatePersonDataStart(dataItem))
      }
    }
  }

  const cancel = (dataItem: Person): void => {
    const originalItem = getItems().find((p) => p.PersonID === dataItem.PersonID)
    const newData = data.map((item) =>
      item.PersonID === originalItem?.PersonID ? originalItem : item,
    )

    setData(newData)
  }

  const enterEdit = (dataItem: Person): void => {
    dataItem.DateOfBirth != null && setBirthday(new Date(dataItem.DateOfBirth))
    dataItem.PersonGender != null && setGender({ value: dataItem.PersonGender })
    setPrevState(dataItem)
    setData(
      data.map((item) => (item.PersonID === dataItem.PersonID ? { ...item, inEdit: true } : item)),
    )
  }

  const addNew = (): void => {
    const newDataItem: Person = {
      inEdit: true,
      Discontinued: false,
      PersonID: 0,
    }

    setData([newDataItem, ...data])
  }

  const handleChangeDropDown = (event: DropDownListChangeEvent): void => {
    setGender({
      value: event.target.value,
    })
  }

  const handleChangeDatePicker = (event: DatePickerChangeEvent): void => {
    event.value != null && setBirthday(event.value)
  }

  const pageChange = (event: GridPageChangeEvent): void => {
    setPage(event.page)
  }

  const logOut = (): void => {
    distpatch(userLogOutStart(userData))
  }
  const CommandCellFunc = (props: GridCellProps): JSX.Element => (
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
      <ToastContainer />
      <Grid
        style={{ height: '720px' }}
        data={orderBy(data.slice(page.skip, page.take + page.skip), sort)}
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
          <div className='buttons-container'>
            <button
              title='Add new'
              onClick={addNew}
              className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-error'
            >
              Add new
            </button>

            <Button
              onClick={logOut}
              className='buttons-container-button logout-button'
              imageUrl='https://firebasestorage.googleapis.com/v0/b/dailydiary-96e2f.appspot.com/o/th.jpeg?alt=media&token=3970264f-c4e1-42e4-9d48-0f37af5d4206'
            ></Button>
          </div>
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
                  style={{ width: '300px', backgroundColor: 'white' }}
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
        <Column field='PersonMobileNo' title='Person Mobile No' width='200px' />
        <Column
          field='DateOfBirth'
          title='Date Of Birth'
          cell={(props: GridCellProps) => (
            <td>
              {props?.dataItem?.inEdit === true ? (
                <DatePicker
                  fillMode={'solid'}
                  min={new Date(1970, 1, 1)}
                  max={new Date(2004, 12, 31)}
                  onChange={handleChangeDatePicker}
                  value={birthday}
                />
              ) : (
                new Date(props?.dataItem?.DateOfBirth)?.toString()?.slice(0, 15)
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
                ? durationInYears(new Date(props.dataItem.DateOfBirth), new Date())
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
