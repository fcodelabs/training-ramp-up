import * as React from 'react'
import {
    Grid,
    GridCellProps,
    GridColumn,
    GridItemChangeEvent,
    GridToolbar,
} from '@progress/kendo-react-grid'
import '@progress/kendo-theme-default/dist/all.css'
import { CommandCell } from '../../components/CommandCell/CommandCell'
import { DropDownCell } from '../../components/DropDownCell/DropDownCell'
import { Person } from '../../utils/interfaces'
import { DatePickerCell } from '../../components/DatePickerCell/DatePickerCell'
import {
    getStudents,
    addStudent,
    setStudents,
    deleteStudent,
    updateStudent,
} from './slice/HomePageSlice'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { validate } from '../../utils/validations'

export default function HomePage() {
    const editField = 'inEdit'
    const students = useAppSelector((state) => state.home.students)
    const dispatch = useAppDispatch()
    const [changedFields, setChangedFields] = React.useState<Array<Person>>([])
    React.useEffect(() => {
        dispatch(getStudents())
    }, [])

    //Add a new row for a new student
    const addNew = () => {
        const newDataItem: Person = {
            inEdit: true,
            dateOfBirth: undefined,
        }

        dispatch(setStudents([newDataItem, ...students]))
    }

    //Add new student
    const add = (dataItem: Person) => {
        const student: Person = {
            name: dataItem.name,
            gender: dataItem.gender,
            address: dataItem.address,
            dateOfBirth: dataItem.dateOfBirth,
            age: dataItem.age,
            mobileNo: dataItem.mobileNo,
            inEdit: false,
        }
        if (validate(student)) {
            dispatch(addStudent(student))
        }
    }

    //Discard adding a new student
    const discard = () => {
        const tempArray = [...students]
        tempArray.shift()
        dispatch(setStudents(tempArray))
    }

    //Enable edditing a student
    const edit = (dataItem: Person): void => {
        const tempArray = [...students]
        const temp = { ...dataItem }
        temp.inEdit = true
        const index = tempArray.indexOf(dataItem)
        tempArray[index] = temp
        dispatch(setStudents(tempArray))
    }

    //update a student
    const update = (dataItem: Person) => {
        const fieldsToBeUpdated = changedFields.filter(
            (item) => item.id == dataItem.id
        )[0]

        if (fieldsToBeUpdated != undefined) {
            if (validate(dataItem)) {
                //calling update methid
                dispatch(updateStudent(fieldsToBeUpdated))
                const index = changedFields.indexOf(fieldsToBeUpdated)
                changedFields.splice(index, 1)
            }
        } else {
            alert('None of thefields has been changed')
        }
    }

    //cancel updating a new student
    const cancel = (): void => {
        dispatch(getStudents())
    }

    //remove a student
    const remove = (dataItem: Person) => {
        const id = dataItem.id
        dispatch(deleteStudent(id))
    }

    const itemChange = (e: GridItemChangeEvent) => {
        let age = e.dataItem.age

        const bdField = 'dateOfBirth'
        //Calculate Age
        if (e.field === bdField) {
            const today = new Date().getTime()
            const birthday = e.value.getTime()
            const tempAge = Math.floor((today - birthday) / (86400000 * 365))
            age = tempAge >= 0 ? tempAge : ''
        }

        const newData = students.map((item) =>
            item.id === e.dataItem.id
                ? { ...item, [e.field || '']: e.value, age: age }
                : item
        )

        if (e.dataItem.id != undefined && e.field) {
            const ob: Person = changedFields.filter(
                (item) => item.id == e.dataItem.id
            )[0]

            if (ob != undefined) {
                ob[e.field as keyof Person] = e.value
            } else {
                const changedOb: Person = {
                    id: e.dataItem.id,
                }
                changedOb[e.field as keyof Person] = e.value

                changedFields.unshift(changedOb)
            }

            setChangedFields([...changedFields])
        }

        dispatch(setStudents(newData))
    }

    //command cell

    const command = (props: GridCellProps) => (
        <CommandCell
            {...props}
            remove={remove}
            add={add}
            discard={discard}
            edit={edit}
            update={update}
            cancel={cancel}
        />
    )

    return (
        <Grid
            style={{ height: '650px', margin: '4vh' }}
            data={students}
            editField={editField}
            onItemChange={itemChange}
        >
            <GridToolbar>
                <button
                    title="Add new"
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                    onClick={addNew}
                >
                    Add new
                </button>
            </GridToolbar>
            <GridColumn
                field="id"
                title="ID"
                width="40px"
                editable={false}
                className="k-grid-textbox"
            />
            <GridColumn field="name" title="Name" width="250px" editor="text" />
            <GridColumn field="gender" title="Gender" cell={DropDownCell} />
            <GridColumn field="address" title="Address" editor="text" />
            <GridColumn field="mobileNo" title="Mobile No" editor="text" />
            <GridColumn
                field="dateOfBirth"
                title="Date of Birth"
                format="{0:D}"
                width="210px"
                cell={DatePickerCell}
            />
            <GridColumn field="age" title="Age" editable={false} />
            <GridColumn cell={command} title="Command" width="220px" />
        </Grid>
    )
}
