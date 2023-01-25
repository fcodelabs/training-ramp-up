import * as React from 'react';
import { Grid, GridColumn, GridCellProps, GridItemChangeEvent, GridToolbar } from '@progress/kendo-react-grid';
import { MyCommandCell } from '../../components/MyCommandCell/myCommandCell';
import { DropDownCell } from '../../components/MyDropDownCell/myDropDownCell';
import { insertItem, getItems, updateItem, deleteItem } from './functions';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Student } from './interfaces';
const editField = 'inEdit';


export default function Grids() {

    const [data, setData] = React.useState<Student[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    React.useEffect(() => {

        axios.get('http://localhost:8080/api/student').then( async function (response) {
            // console.log(response.data.data);
            response.data.data.map((item: Student) => {
                item.dob = new Date(item.dob);
                return item;
            })
            setData(response.data.data);
        }).catch(function (error) {
            console.log(error);
        });
        

        // const newItems = getItems();

        // setData(newItems);
    },[loading])


    const remove = async (dataItem: Student) => {
        const newData = [...await deleteItem(dataItem, data)];
        setData(newData);


    };

    const add = async (dataItem: Student) => {
        dataItem.inEdit = true;
        console.log(data);
        const newData = await insertItem(dataItem, data);
        setData(newData);
        setLoading(!loading);
        
    };

    const update = async (dataItem: Student) => {
        dataItem.inEdit = false;
        const newData = await updateItem(dataItem, data);
        setData(newData);
        setLoading(!loading);
    };


    const discard = () => {
        const newData = [...data];
        newData.splice(0, 1)
        setData(newData);
    };

    const cancel = (dataItem: Student) => {
        const originalItem = getItems().find(
            p => p.id === dataItem.id
        );
        const newData = data.map((item) =>
            item.id === originalItem?.id ? originalItem : item
        );

        setData(newData);
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
                        title="Add new"
                        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                        onClick={addNew}
                    >
                        Add new
                    </button>
                </GridToolbar>
                <GridColumn field="id" title="id" width="40px" editable={false} />
                <GridColumn field="name" title="Name" width="250px" />
                <GridColumn field="gender" title="Gender" cell={DropDownCell} />
                <GridColumn field="address" title="Address" />
                <GridColumn field="mobile" title="Mobile No" />
                <GridColumn field="dob" title="Date of Birth" editor="date" format="{0:D}" />
                <GridColumn field="age" title="Age" editable={false} width="100px" />
                <GridColumn title="command " cell={CommandCell} width="200px" />
            </Grid>
            <ToastContainer />
        </div>

    );
}

