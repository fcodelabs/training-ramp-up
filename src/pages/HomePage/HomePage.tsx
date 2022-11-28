import * as React from 'react'
import {
    Grid,
    GridCellProps,
    GridColumn,
    GridItemChangeEvent,
    GridToolbar,
} from '@progress/kendo-react-grid'
import { sampleData } from './sampleData'
import '@progress/kendo-theme-default/dist/all.css'
import { CommandCell } from '../../components/CommandCell/CommandCell'
import { DropDownCell } from '../../components/DropDownCell/DropDownCell'
import { Person } from './interfaces'

const dataSet = [...sampleData]

export default function HomePage() {
    const editField = 'inEdit'
    const [data, setData] = React.useState<Person[]>(sampleData)

    const nameRegEx = new RegExp('^([A-z\\s.]{3,80})$')

    const addressRegEx = new RegExp('^([A-z0-9/,\\s]{3,})$')

    const mobileNumRegEx = new RegExp(
        '^([0][0-9]{9}|[0][0-9]{2}[-\\s][0-9]{7})$'
    )

    const generateId = () =>
        dataSet.reduce((acc, current: Person) => Math.max(acc, current.id), 0) +
        1

    const discard = () => {
        data.shift()
        setData([...data])
    }

    const cancel = (dataItem: any) => {
        const temp = dataSet.find((item) => {
            return item.id === dataItem.id
        })
        dataItem = temp
        dataItem.inEdit = false
        setData(dataSet)
    }

    const validate = (item: any) => {
        if (item.name && nameRegEx.test(item.name)) {
            if (item.address && addressRegEx.test(item.address)) {
                if (mobileNumRegEx.test(item.mobileNo)) {
                    if (item.gender !== '') {
                        if (
                            item.dateOfBirth != null &&
                            new Date().getTime() - item.dateOfBirth.getTime() >
                                0
                        ) {
                            return true
                        } else {
                            alert('Please enter valid birthday')
                            return false
                        }
                    } else {
                        alert('Please select a gender')
                        return false
                    }
                } else {
                    alert('Please enter valid mobile number')
                    return false
                }
            } else {
                alert('Please enter valid address')
                return false
            }
        } else {
            alert('Please enter valid name')
            return false
        }
    }

    const add = (dataItem: any) => {
        const item = dataItem
        if (validate(item)) {
            item.id = generateId()
            item.inEdit = false
            dataSet.unshift(item)
            setData(dataSet)
        }
    }

    const edit = (dataItem: any) => {
        const item = dataItem
        item.inEdit = true
        item.editField = ''
        setData([...data])
    }

    const update = (dataItem: any) => {
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

    const remove = (dataItem: any) => {
        const index = dataSet.indexOf(dataItem)
        dataSet.splice(index, 1)
        setData([...dataSet])
    }

    const addNew = () => {
        const newDataItem: Person = {
            inEdit: true,
            id: 0,
        }
        setData([newDataItem, ...data])
    }

    const itemChange = (e: GridItemChangeEvent) => {
        let age = e.dataItem.age

        //Calculate Age
        if (e.field === 'dateOfBirth') {
            const today = new Date().getTime()
            const birthday = e.value.getTime()
            age = Math.floor((today - birthday) / (86400000 * 365))
            console.log(age)
        }

        const newData = data.map((item) =>
            item.id === e.dataItem.id
                ? { ...item, [e.field || '']: e.value, age: age }
                : item
        )
        setData(newData)
    }

    const command = (props: GridCellProps) => (
        <CommandCell
            {...props}
            remove={remove}
            add={add}
            discard={discard}
            edit={edit}
            update={update}
            cancel={cancel}
            editField={editField}
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
            <GridColumn field="id" title="ID" width="40px" editable={false} />
            <GridColumn field="name" title="Name" width="250px" editor="text" />
            <GridColumn field="gender" title="Gender" cell={DropDownCell} />
            <GridColumn field="address" title="Address" editor="text" />
            <GridColumn field="mobileNo" title="Mobile No" editor="text" />
            <GridColumn
                field="dateOfBirth"
                title="Date of Birth"
                editor="date"
                format="{0:D}"
                width="210px"
            />
            <GridColumn field="age" title="Age" editable={false} />
            <GridColumn cell={command} title="Command" width="220px" />
        </Grid>
    )
}
