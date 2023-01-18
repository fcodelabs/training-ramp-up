import * as React from "react";
import "@progress/kendo-theme-default/dist/all.css";
import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridItemChangeEvent,
  GridPageChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";

import { MyCommandCell } from "../components/myCommandCell";
import {
  insertItem,
  getItems,
  updateItem,
  deleteItem,
} from "../components/services";
import { User, Student } from "../components/interface";
import { DropDownCell } from "../components/dropDownCell";
import { DatePickerCell } from "../components/datePickerCell";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudents,
  deleteStudent,
  enterEditMode,
  cancelEditMode,
  setStudent,
  updateStudent,
} from "./homeSlice";

interface PageState {
  skip: number;
  take: number;
}
const initialDataState: PageState = { skip: 0, take: 17 };

function Home() {
  const dispatch = useDispatch();
  const students = useSelector((state: any) => state.home.students);
  const [page, setPage] = React.useState<PageState>(initialDataState);
  const pageChange = (event: GridPageChangeEvent) => {
    setPage({
      skip: event.page.skip,
      take: event.page.take,
    });
  };

  const editField = "inEdit";

  const [data, setData] = React.useState<User[]>([]);

  React.useEffect(() => {
    dispatch(getStudents());
    const newItems = getItems();
    setData(newItems);
  }, []);

  // modify the data in the store, db etc
  const remove = (dataItem: Student) => {
    console.log(dataItem);
    dispatch(deleteStudent(dataItem.id));
    // const newData = [...deleteItem(dataItem)];
    // setData(newData);
  };

  const add = (dataItem: User) => {
    dataItem.inEdit = true;

    const newData = insertItem(dataItem);
    setData(newData);
  };

  const update = (dataItem: User) => {
    // dataItem.inEdit = false;

    dispatch(updateStudent(dataItem));
    // const newData = updateItem(dataItem);
    // setData(newData);
  };

  // Local state operations
  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };

  const cancel = (dataItem: Student) => {
    // const originalItem = getItems().find((p) => p.ID === dataItem.ID);
    // const newData = data.map((item) =>
    //   item.ID === originalItem?.ID ? originalItem : item
    // );

    // setData(newData);
    dispatch(cancelEditMode(dataItem.id));
  };

  const enterEdit = (dataItem: Student) => {
    // setData(
    //   data.map((item) =>
    //     item.ID === dataItem.ID ? { ...item, inEdit: true } : item
    //   )
    // );
    dispatch(enterEditMode(dataItem.id));
  };

  const itemChange = (event: GridItemChangeEvent) => {
    const newData = students.map((item: Student) =>
      item.id === event.dataItem.id
        ? { ...item, [event.field || ""]: event.value }
        : item
    );

    dispatch(setStudent(newData));
  };

  const addNew = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <Grid
      style={{ height: "100%" }}
      data={students.slice(page.skip, page.take + page.skip)}
      onItemChange={itemChange}
      editField={editField}
      skip={page.skip}
      take={page.take}
      total={data.length}
      pageable={true}
      onPageChange={pageChange}
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
      <Column field="id" title="Id" width="100px" editable={false} />
      <Column field="name" title="Name" />
      <Column field="gender" title="Gender" width="120px" cell={DropDownCell} />
      <Column field="address" title="Address" width="300px" />
      <Column field="mobile" title="Mobile No" width="150px" />
      <Column
        field="birthday"
        title="Date of Birth"
        cell={DatePickerCell}
        width="200px"
        format="{0:D}"
      />

      <Column field="age" title="Age" width="100px" editable={false} />
      <Column title="Command" cell={CommandCell} width="200px" />
    </Grid>
  );
}

export default Home;
