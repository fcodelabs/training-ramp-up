import * as React from 'react';
import { Grid, GridColumn, GridCellProps, GridItemChangeEvent, GridToolbar} from '@progress/kendo-react-grid';
import { MyCommandCell } from '../../components/MyCommandCell/myCommandCell';
import { DropDownCell } from '../../components/MyDropDownCell/myDropDownCell';
import { insertItem, getItems, updateItem, deleteItem } from './functions';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Student } from './interfaces';
const editField = 'inEdit';


export default function Grids () {
  const [data, setData] = React.useState<Student[]>([]);
  React.useEffect(()=>{
    const newItems = getItems();
    setData(newItems);
},[])


const remove = (dataItem: Student) => {
    const newData = [...deleteItem(dataItem)];
    setData(newData);
};

const add = (dataItem: Student) => {
    dataItem.inEdit = true;
    const newData = insertItem(dataItem);
    setData(newData);
};

const update = (dataItem: Student) => {
    dataItem.inEdit = false;
    const newData = updateItem(dataItem);
    setData(newData);
};


const discard = () => {
    const newData = [...data];
    newData.splice(0, 1)
    setData(newData);
};

const cancel = (dataItem: Student) => {
    const originalItem = getItems().find(
        p => p.ID === dataItem.ID
    );
    const newData = data.map((item) =>
        item.ID === originalItem?.ID ? originalItem : item
    );

    setData(newData);
};

const enterEdit = (dataItem: Student) => {
    setData(
        data.map((item) =>
            item.ID === dataItem.ID ? { ...item, inEdit: true } : item
        )
    );
};

const itemChange = (event: GridItemChangeEvent) => {
    const newData = data.map((item) =>
        item.ID === event.dataItem.ID
            ? { ...item, [event.field || '']: event.value }
            : item
    );

    setData(newData);
};

const addNew = () => {
    const newDataItem: any  = { inEdit: true};
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
        dataItemKey={'ID'}
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
        <GridColumn field="ID" title="ID" width="40px" editable={false} />
        <GridColumn field="Name" title="Name" width="250px" />
        <GridColumn field="Gender" title="Gender" cell={DropDownCell}/>
        <GridColumn field="Address" title="Address" />
        <GridColumn field="MobileNo" title="Mobile No"/>
        <GridColumn field="DateofBirth" title="Date of Birth" editor="date" format="{0:D}"/>
        <GridColumn field="Age" title="Age" editable = {false} width="100px"/>
        <GridColumn title= "command " cell = {CommandCell}  width="150px" />
      </Grid>
      <ToastContainer/>
      </div>
      
    );
}

