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
import { getStudents,addStudent, setStudents, deleteStudent, updateStudent} from './HomePageSlice'
import { useAppSelector, useAppDispatch } from '../../hooks'


export default function HomePage() {
  
    const editField = 'inEdit'
    const students = useAppSelector((state) => state.home.students)
    const dispatch = useAppDispatch()
   
    
    
    React.useEffect(() => {
        dispatch(getStudents())  
        //setData(students)  
        //console.log(data);
              
    },[])

    const validations = new Map([
        ['name', new RegExp('^([A-z\\s.]{3,80})$')],
        ['address', new RegExp('^([A-z0-9/,\\s]{3,})$')],
        ['mobileNo', new RegExp('^([0][0-9]{9}|[0][0-9]{2}[-\\s][0-9]{7})$')],    
    ])

    //Validation

    const validateFields = (inputValue: any, field: string): boolean => {
        if (!inputValue) {
            alert('Please enter valid ' + field)
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

    const validate = (item: Person): boolean => {
        return (
            validateFields(item.name, 'name') &&
            validateFields(item.gender, 'gender') &&
            validateFields(item.address, 'address') &&
            validateFields(item.mobileNo, 'mobileNo') &&
            validateFields(item.dateOfBirth, 'dateOfBirth')
        )
    }


    //Add a new row for a new student
    const addNew = () => {        
        const newDataItem: Person = {
            inEdit: true,
            dateOfBirth:undefined
        }
        
        dispatch(setStudents([newDataItem,...students]));
    }

    //Add new student
    const add = (dataItem: Person) => {
        const student :Person= {
            name:dataItem.name,
            gender:dataItem.gender,
            address:dataItem.address,
            dateOfBirth:dataItem.dateOfBirth,
            age:dataItem.age,
            mobileNo:dataItem.mobileNo,
            inEdit:false
        }
        if (validate(student)) {
            dispatch(addStudent(student))
        }
    }

    //Discard adding a new student
    const discard = () => {
        const tempArray =[...students]
        tempArray.shift()
        dispatch(setStudents(tempArray))
    }

    //Enable edditing a student
    const edit = (dataItem: Person): void => {
        const tempArray=[...students]
        const temp={...dataItem}
        temp.inEdit=true;
        const index=tempArray.indexOf(dataItem)
        tempArray[index]=temp
        dispatch(setStudents(tempArray))
    }

    //update a student
    const update = (dataItem: Person) => {
        if (validate(dataItem)) {

            dispatch(updateStudent(dataItem))
        }
    }

    //cancel updating a new student
    const cancel = (dataItem: Person): void => {
        dispatch(getStudents())
    }

    //remove a student
    const remove = (dataItem: Person) => {
        const id = dataItem.id
        dispatch(deleteStudent(id))
    }

    const itemChange = (e: GridItemChangeEvent) => {
        let age = e.dataItem.age

        //Calculate Age
        if (e.field === 'dateOfBirth') {
            const today = new Date().getTime()
            const birthday = e.value.getTime()
            const tempAge = Math.floor((today - birthday) / (86400000 * 365))
            age = tempAge >= 18 ? tempAge : ''
        }

        const newData = students.map((item) =>
            item.id === e.dataItem.id
                ? { ...item, [e.field || '']: e.value, age: age }
                : item
        )
        dispatch(setStudents(newData));
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
