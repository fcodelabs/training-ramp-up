import * as React from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { MyCommandCell } from "./myCommandCell";
import {
  insertStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "./services";
import { Upload } from "@progress/kendo-react-upload";
const editField = "inEdit";

const GridUI = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    let newItems = getStudents();
    setData(newItems);
  }, []);

  const remove = (dataItem) => {
    const newData = deleteStudent(dataItem);
    setData(newData);
  };
  const add = (dataItem) => {
    dataItem.inEdit = true;
    const newData = insertStudent(dataItem);
    setData(newData);
  };
  const update = (dataItem) => {
    dataItem.inEdit = false;
    const newData = updateStudent(dataItem);
    setData(newData);
  };

  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };
  const cancel = (dataItem) => {
    const originalItem = getStudents().find(
      (p) => p.StudentID === dataItem.StudentID
    );
    const newData = data.map((item) =>
      item.StudentID === originalItem.StudentID ? originalItem : item
    );
    setData(newData);
  };

  const enterEdit = (dataItem) => {
    setData(
      data.map((item) =>
        item.StudentID === dataItem.StudentID ? { ...item, inEdit: true } : item
      )
    );
  };
  const itemChange = (event) => {
    const newData = data.map((item) =>
      item.StudentID === event.dataItem.StudentID
        ? { ...item, [event.field || ""]: event.value }
        : item
    );
    setData(newData);
  };
  const addNew = () => {
    const newDataItem = {
      inEdit: true,
      Discontinued: false,
    };
    setData([newDataItem, ...data]);
  };

  const CommandCell = (props) => (
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
      style={{
        height: "100%",
      }}
      data={data}
      onItemChange={itemChange}
      editField={editField}
    >
      <GridToolbar>
        <button
          title="Add new"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={addNew}
        >
          Add new
        </button>
        <Upload
          restrictions={{
            allowedExtensions: [".csv", ".xlsx"],
          }}
          autoUpload={false}
          defaultFiles={[]}
          withCredentials={false}
          saveUrl={"https://demos.telerik.com/kendo-ui/service-v4/upload/save"}
          removeUrl={
            "https://demos.telerik.com/kendo-ui/service-v4/upload/remove"
          }
        />
      </GridToolbar>
      <Column field="StudentID" title="ID" width="80px" editable={false} />
      <Column field="StudentName" title="Name" width="200px" />
      <Column field="Gender" editor="dropdown" title="Gender" width="200px" />

      <Column field="Address" title="Address" width="200px" />
      <Column field="ContactNumber" title="Mobile Number" width="180px" />
      <Column
        editor="date"
        format="{0:d}"
        field="Birth"
        title="Date of Birth"
        width="200px"
      />
      <Column field="Age" title="Age" editor="numeric" width="130px" />

      <Column cell={CommandCell} width="180px" />
    </Grid>
  );
};

export default GridUI;
