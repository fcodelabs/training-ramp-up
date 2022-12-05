import * as React from 'react'
import {
    Grid,
    GridCellProps,
    GridColumn,
    GridItemChangeEvent,
    GridToolbar,
} from '@progress/kendo-react-grid'
import { DatePicker } from '@progress/kendo-react-dateinputs'
import '@progress/kendo-theme-default/dist/all.css'
import { sampleData } from '../../utils/sampleData'
import { CommandCell } from '../../components/CommandCell/CommandCell'
import { DropDownCell } from '../../components/DropDownCell/DropDownCell'
import { Person } from '../../utils/interfaces'
import { DatePickerCell } from '../../components/DatePicker/DatePickerCell'

const dataSet = [...sampleData]

export default function HomePage() {
    const editField = 'inEdit'
    const [data, setData] = React.useState(sampleData)

    //RegEx
    const nameRegEx = new RegExp('^([A-z\\s.]{3,80})$')

    const addressRegEx = new RegExp('^([A-z0-9/,\\s]{3,})$')

    const mobileNumRegEx = new RegExp(
        '^([0][0-9]{9}|[0][0-9]{2}[-\\s][0-9]{7})$'
    )

    const validations = new Map([
        ['name', new RegExp('^([A-z\\s.]{3,80})$')],
        ['address', new RegExp('^([A-z0-9/,\\s]{3,})$')],
        ['mobileNo', new RegExp('^([0][0-9]{9}|[0][0-9]{2}[-\\s][0-9]{7})$')],
    ])

    //Validating -Start

    const validateFields = (inputValue: any, field: string): boolean => {
        if (!inputValue) {
            alert('Please enter valid ' + field);
            return false
        }
        validations.forEach(function (value, key) {
            if (key == field && !value.test(inputValue)) {
                alert('Please enter valid ' + field)
                return false
            }
        })

        return true
    }

    const validateBirthDay = (birthday?: Date): boolean => {
        if (birthday != null && new Date().getTime() - birthday.getTime() > 0) {
            return true
        }
        alert('Please select a valid birthday')
        return false
    }

    const validate = (item: Person): boolean => {
        return (
            validateFields(item.name, 'name') &&
            validateFields(item.gender, 'gender') &&
            validateFields(item.address, 'address') &&
            validateFields(item.mobileNo, 'mobileNo') &&
            validateBirthDay(item.dateOfBirth)
        )
    }

    //validating -End

    const generateId = () =>
        dataSet.reduce((max, current: Person) => Math.max(max, current.id), 0) +
        1

    //Add a new row for a new student
    const addNew = () => {
        const newDataItem: Person = {
            inEdit: true,
            id: 0,
        }
        setData([newDataItem, ...data])
    }

    //Add new student
    const add = (dataItem: Person) => {
        const item = dataItem
        if (validate(item)) {
            item.id = generateId()
            item.inEdit = false
            dataSet.unshift(item)
            setData(dataSet)
        }
    }

    //Discard adding a new student
    const discard = () => {
        data.shift()
        setData([...data])
    }

    //Enable edditing a student
    const edit = (dataItem: Person): void => {
        const item = dataItem
        item.inEdit = true
        setData([...data])
    }

    //update a student
    const update = (dataItem: Person) => {
        console.log(validate(dataItem))

        if (validate(dataItem)) {
            const temp = dataSet.find((item) => {
                return item.id === dataItem.id
            })
            if (temp) {
                const index = dataSet.indexOf(temp)
                dataItem.inEdit = false
                dataSet[index] = dataItem
                setData(dataSet)
            }
        }
    }

    //cancel updating a new student
    const cancel = (dataItem: Person): void => {
        const temp = dataSet.find((item) => {
            return item.id === dataItem.id
        })
        if (temp) {
            dataItem = temp
            dataItem.inEdit = false
            setData(dataSet)
        }
    }

    //remove a student
    const remove = (dataItem: Person) => {
        const index = dataSet.indexOf(dataItem)
        dataSet.splice(index, 1)
        setData([...dataSet])
    }

    const itemChange = (e: GridItemChangeEvent) => {
        let age = e.dataItem.age

        //Calculate Age
        if (e.field === 'dateOfBirth') {
            const today = new Date().getTime()
            const birthday = e.value.getTime()
            const tempAge = Math.floor((today - birthday) / (86400000 * 365))
            age=(tempAge>=0)?tempAge:''
        }

        const newData = data.map((item) =>
            item.id === e.dataItem.id
                ? { ...item, [e.field || '']: e.value, age: age }
                : item
        )
        setData(newData)
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
            data={data}
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
                //cell={DatePickerCell}
                editor="date"
            />
            <GridColumn field="age" title="Age" editable={false} />
            <GridColumn cell={command} title="Command" width="220px" />
        </Grid>
    )
}
