import * as React from 'react';
import { Grid, GridColumn, GridCellProps, GridItemChangeEvent, GridToolbar } from '@progress/kendo-react-grid';
import { MyCommandCell } from '../../components/CommandCell/CommandCell';
import { DropDownCell } from '../../components/DropDownCell/DropDownCell';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { Student } from '../../utils/interfaces';
import { addStudent, deleteStudent, getStudents, updateStudent } from './gridSlice';
const editField = 'inEdit';


export default function Grids() {
    const dispatch = useDispatch();
    const students = useSelector((state: any) => state.grid.students);
    const [data, setData] = React.useState<Student[]>([]);
    

    React.useEffect(() => {
        dispatch(getStudents());
    }, [])

    React.useEffect(() => {
        setData(students);
    }, [students])


    const remove = async (dataItem: Student) => {
        dispatch(deleteStudent(dataItem))
    };

    const add =  (dataItem: Student) => {
        dispatch(addStudent(dataItem));
        

    };

    const update =  (dataItem: Student) => {
        dispatch(updateStudent(dataItem));
    };


    const discard = () => {
        setData(students);
    };

    const cancel = async () => {
        setData(students);
    };

    const enterEdit = (dataItem: Student) => {
        setData(
            data.map((item) =>
                item.id === dataItem.id ? { ...item, inEdit: true } : item
            )
        );
    };

    const itemChange = (event: GridItemChangeEvent) => {
        const newData = data.map((item) =>
            item.id === event.dataItem.id
                ? { ...item, [event.field || '']: event.value }
                : item
        );

        setData(newData);
    };

    const addNew = () => {
        const newDataItem: any = { inEdit: true };
        setData([newDataItem, ...data]);
    };

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
    );

    return (
        <div>
            <Grid
                style={{ height: '600px', marginTop: '20px' }}
                data={data}
                onItemChange={itemChange}
                editField={editField}
                dataItemKey={'id'}
                total={data.length}
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
                <GridColumn field='id' title='id' width='40px' editable={false} />
                <GridColumn field='name' title='Name' width='250px' />
                <GridColumn field='gender' title='Gender' cell={DropDownCell} />
                <GridColumn field='address' title='Address' />
                <GridColumn field='mobile' title='Mobile No' />
                <GridColumn field='dob' title='Date of Birth' editor='date' format='{0:D}' />
                <GridColumn field='age' title='Age' editable={false} width='100px' />
                <GridColumn title='command ' cell={CommandCell} width='200px' />
            </Grid>
            <ToastContainer />
        </div>

    );
}

