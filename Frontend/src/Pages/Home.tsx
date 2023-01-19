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
import { Validate } from "../utils/services";
import { Student, PageState, State } from "../utils/interface";
import { DropDownCell } from "../components/dropDownCell";
import { DatePickerCell } from "../components/datePickerCell";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudents,
  deleteStudent,
  updateStudent,
  addStudent,
} from "./homeSlice";

const initialDataState: PageState = { skip: 0, take: 17 };

function Home() {
  const dispatch = useDispatch();
  const students = useSelector((state: State) => state.home.students);
  const [page, setPage] = React.useState<PageState>(initialDataState);
  const pageChange = (event: GridPageChangeEvent) => {
    setPage({
      skip: event.page.skip,
      take: event.page.take,
    });
  };

  const editField = "inEdit";

  const [data, setData] = React.useState<Student[]>([]);

  React.useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  React.useEffect(() => {
    setData(students);
  }, [students]);

  // modify the data in the store, db etc
  const remove = (dataItem: Student) => {
    dispatch(deleteStudent(dataItem.id));
  };

  const add = (dataItem: Student) => {
    if (Validate(dataItem)) {
      dispatch(addStudent(dataItem));
    }
  };

  const update = (dataItem: Student) => {
    if (Validate(dataItem)) {
      dispatch(updateStudent(dataItem));
      setData(students);
    }
  };

  // Local state operations
  const discard = () => {
    setData(students);
  };

  const cancel = () => {
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
    const newData = data.map((item: Student) =>
      item.id === event.dataItem.id
        ? { ...item, [event.field || ""]: event.value }
        : item
    );
    setData(newData);
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
      data={data.slice(page.skip, page.take + page.skip)}
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
