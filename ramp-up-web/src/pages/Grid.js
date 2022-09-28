import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { MyCommandCell } from "../components/MyCommandCell";
import { useNavigate } from "react-router-dom";
import { getStudents } from "../utils/services";
import { Upload } from "@progress/kendo-react-upload";
const editField = "inEdit";
import studentSlice from "../features/studentSlice";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8000");

const GridUI = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    dispatch(studentSlice.actions.getStudents());
  }, []);

  const students = useSelector((state) => state.students.students);
  const logUser = useSelector((state) => state.user.users);

  useEffect(() => {
    if (logUser) {
      setAdmin(logUser.role === "Admin");
    }
  });

  const studentList = students.data;
  useEffect(() => {
    setData(studentList);
  }, [studentList]);

  useEffect(() => {
    socket.on("refetch_data", () => {
      getStudents()
        .then(({ students }) => setData(students.data))
        .catch(() =>
          alert(
            "Failed to retrieve data, please try refreshing the page or try again another time"
          )
        );
    });
    socket.on("student_received", (data) => {
      alert(data);
      window.location.reload(false);
    });
    socket.on("student_deleted", (data) => {
      alert(data);
      window.location.reload(false);
    });
  }, [socket]);

  const remove = (dataItem) => {
    dispatch(studentSlice.actions.deleteStudent(dataItem));
    window.location.reload(false);
  };
  const add = (dataItem) => {
    dataItem.inEdit = true;
    dispatch(studentSlice.actions.createStudent({ dataItem }));
    window.location.reload(false);
  };
  const update = (dataItem) => {
    dataItem.s;
    dataItem.inEdit = false;
    dispatch(studentSlice.actions.updateStudent(dataItem));
    window.location.reload(false);
  };

  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };
  const cancel = (dataItem) => {
    const originalItem = getStudents().find((p) => p.id === dataItem.id);
    const newData = data.map((item) =>
      item.id === originalItem.id ? originalItem : item
    );
    setData(newData);
  };

  const enterEdit = (dataItem) => {
    const newData = data.map((item) =>
      item.id === dataItem.id
        ? { ...item, date: new Date(item.date), inEdit: true }
        : item
    );

    setData(newData);
  };

  const itemChange = (event) => {
    const newData = data.map((item) =>
      item.id === event.dataItem.id
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
  const logout = () => {
    navigate("/");
  };

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
        <>
          {admin ? (
            <button
              title="Add new"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
              onClick={addNew}
            >
              Add new
            </button>
          ) : (
            <div></div>
          )}
        </>
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={logout}
        >
          Logout
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
        <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary">
          {logUser.name}
        </button>
      </GridToolbar>
      <Column field="id" title="ID" width="80px" editable={false} />
      <Column field="name" title="Name" width="200px" />
      <Column field="gender" title="Gender" width="200px" editor="text" />
      <Column field="address" title="Address" width="200px" />
      <Column
        field="mobile_number"
        title="Mobile Number"
        editor="text"
        width="180px"
      />
      <Column
        editor="date"
        format="{0:d}"
        field="date"
        title="Date of Birth"
        width="200px"
      />
      <Column field="age" title="Age" width="130px" editable={false} />

      {admin && <Column cell={CommandCell} width="180px" />}
    </Grid>
  );
};

export default GridUI;
