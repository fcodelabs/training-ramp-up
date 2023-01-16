import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridColumn,
  GridToolbar,
  GridItemChangeEvent,
} from '@progress/kendo-react-grid'
import products from '../../products.json'
import { Calendar,DatePicker } from '@progress/kendo-react-dateinputs'
import '@progress/kendo-theme-default/dist/all.css'
import { Button } from '@progress/kendo-react-buttons'
import { MyCommandCell } from './MyCommandcell'
import React from 'react'
import { User } from '../../interfaces/interfaces'
import { getItems, insertItem } from '../../services/services'
import { GenderCell } from './GenderCell'
import DateCell from './DateCell'


const editField = 'inEdit';

const DataGrid = () => {
  const [data, setData] = React.useState<any[]>([])

  React.useEffect(() => {
    // eslint-disable-next-line prefer-const
    let newItems = getItems()
    setData(newItems)
  }, [])

  const add = (dataItem: User) => {
    dataItem.inEdit = true;
    // console.log(dataItem.username)
    const newData = insertItem(dataItem);
    setData(newData);
  };

  const enterEdit = (dataItem: User) => {
    setData(
      data.map((item) =>
        item.userId === dataItem.userId ? { ...item, inEdit: true } : item
      )
    );
  };

  const itemChange = (event: GridItemChangeEvent) => {
    const newData = data.map((item) =>
      item.userId === event.dataItem.userId
        ? { ...item, [event.field || '']: event.value }
        : item
    );

    setData(newData);
  };

  const addNew = () => {
    const newDataItem = { inEdit: true, Discontinued: false }

    setData([newDataItem, ...data])
  }

    // Local state operations
    const discard = () => {
      const newData = [...data];
      newData.splice(0, 1);
      setData(newData);
    };

  const CommandCell = (props: GridCellProps) => (
    <MyCommandCell
    {...props}
    edit={enterEdit}
    // remove={remove}
    add={add}
    discard={discard}
    // update={update}
    // cancel={cancel}
    editField={editField}
    />
  )
  return (
    <Grid
    style={{ height: '420px', margin: '100px' }}
    data={data}
    onItemChange={itemChange}
    editField={editField}
    >
      <GridToolbar>
        <button
          style={{padding:'3px 8px 6px 8px', margin:'10px'}}
          title='Add new'
          className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-secondary'
          onClick={addNew}
        >
          Add new
        </button>
      </GridToolbar>
      <GridColumn editable={false} field='userId' title='ID' width='150px' />
      <GridColumn field='username' title='Name' width='150px' />
      <GridColumn field='gender' title='Gender' width='150px' cell={GenderCell}/>
      <GridColumn field='address' title='address' width='150px' />
      <GridColumn field='mobile' title='mobile' width='150px' />
      <GridColumn field='dob' editor='date' format="{0:D}" title='dob' width='200px' />
      <GridColumn field='age' title='age' width='150px' />
      <GridColumn title='command' cell={CommandCell} width='200px' />
    </Grid>
  )
}
export default DataGrid
