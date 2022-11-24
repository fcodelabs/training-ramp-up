import React from "react";
import {
  Grid,
  GridColumn,
  GridToolbar,
  GridCellProps,
  GridItemChangeEvent,
} from "@progress/kendo-react-grid";
import { MyCommandCell } from "./myCommandCell";
import "@progress/kendo-theme-default/dist/all.css";
import { getStudents, insertStudent, deleteItem, updateItem } from "./services";
import "./App.css";

const editField = "inEdit";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = React.useState([] as any);

  React.useEffect(() => {
    const newStudents = getStudents();
    setData(newStudents);
  }, []);

  const itemChange = (event: GridItemChangeEvent) => {
    const newData = data.map((student: { id: number }) =>
      student.id === event.dataItem.id
        ? { ...student, [event.field || ""]: event.value }
        : student
    );

    setData(newData);
  };

  const addNew = () => {
    const newDataItem = { inEdit: true };
    setData([...data, newDataItem]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const add = (dataItem: any) => {
    dataItem.inEdit = true;

    const newData = insertStudent(dataItem);
    setData(newData);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const remove = (dataItem: any) => {
    const newData = [...deleteItem(dataItem)];
    setData(newData);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cancel = (dataItem: any) => {
    const originalItem = getStudents().find((p) => p.id === dataItem.id);
    const newData = data.map((student: { id: number }) =>
      student.id === originalItem?.id ? originalItem : student
    );

    setData(newData);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const enterEdit = (dataItem: any) => {
    setData(
      data.map((student: { id: number }) =>
        student.id === dataItem.id ? { ...student, inEdit: true } : student
      )
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update = (dataItem: any) => {
    dataItem.inEdit = false;
    const newData = updateItem(dataItem);
    setData(newData);
  };

  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
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
    <Grid
      style={{ height: "400px" }}
      data={data}
      onItemChange={itemChange}
      editField={editField}
    >
      <GridToolbar>
        <button
          title="Add new"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={addNew}
        >
          Add new
        </button>
      </GridToolbar>
      <GridColumn field="id" title="ID" width="40px" />
      <GridColumn field="name" title="Name" width="250px" />
      <GridColumn field="gender" title="Gender" />
      <GridColumn field="address" title="Address" />
      <GridColumn field="mobile" title="Mobile No" />
      <GridColumn field="dateOfBirth" title="Date of Birth" />
      <GridColumn field="age" title="Age" />
      <GridColumn cell={CommandCell} />
    </Grid>
  );
}

export default App;
