import * as React from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { MyCommandCell } from "../Components/MyCommandCell";
import {
  insertItem,
  getItems,
  updateItem,
  deleteItem,
} from "../Utils/services";
import { Upload } from "@progress/kendo-react-upload";
// import { DropDownList } from "@progress/kendo-react-dropdowns";

const editField = "inEdit";

const Main = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    let newItems = getItems();
    setData(newItems);
  }, []); // modify the data in the store, db etc

  const remove = (dataItem) => {
    const newData = [...deleteItem(dataItem)];
    setData(newData);
  };

  const add = (dataItem) => {
    dataItem.inEdit = true;
    const newData = insertItem(dataItem);
    setData(newData);
  };

  const update = (dataItem) => {
    dataItem.inEdit = false;
    const newData = updateItem(dataItem);
    setData(newData);
  }; // Local state operations

  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };

  const cancel = (dataItem) => {
    const originalItem = getItems().find((p) => p.ID === dataItem.ID);
    const newData = data.map((item) =>
      item.ID === originalItem.ID ? originalItem : item
    );
    setData(newData);
  };

  const enterEdit = (dataItem) => {
    setData(
      data.map((item) =>
        item.ID === dataItem.ID ? { ...item, inEdit: true } : item
      )
    );
  };

  const itemChange = (event) => {
    const newData = data.map((item) =>
      item.ID === event.dataItem.ID
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

    // const gender = ["Male", "Female", "Other"];
  );

  return (
    // <div>
    //       <div>Gender</div>
    //       <DropDownList style={{
    //       width: '300px'
    //     }} data={gender} />
    //     </div>
    <Grid
      style={{
        height: "1000px",
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
      <Column field="ID" title="ID" width="50px" editable={false} />
      <Column field="StudentName" title="Student Name" width="200px" />
      <Column
        field="Gender"
        title="Gender"
        width="150px"
        // <DropDownList style={{
        // width: '300px'}} data={gender}
      />
      <Column field="Address" title="Address" width="200px" />
      <Column field="MobileNo" title="Mobile No" width="120px" />
      <Column
        field="DOB"
        title="Date of Birth"
        editor="date"
        format="{0:d}"
        width="150px"
      />
      {/* <Column field="Age" title="Age" width="120px" editor="numeric" /> */}
      <Column field="Age" title="Age" width="150px" editable={false} />
      <Column cell={CommandCell} title="Command" width="200px" />
    </Grid>
  );
};

export default Main;

// const gender = ["Male", "Female", "Other"];
//   return <div>
//       <div>Gender</div>
//       <DropDownList style={{
//       width: '300px'
//     }} data={gender} />
//     </div>;
