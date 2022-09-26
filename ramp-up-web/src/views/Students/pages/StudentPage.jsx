import { useEffect } from "react";
import { useSelector, useStore } from "react-redux";
import io from "socket.io-client";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { Upload } from "@progress/kendo-react-upload";
import MyCommandCell from "../components/CommandCell";
import BirthdayPicker from "../components/BirthdayPicker";
import GenderList from "../components/GenderList";
import { addEntry, fieldChange } from "../utils/functions";
import { editField, URL } from "../../../constants";

const socket = io.connect(URL);

function StudentPage() {
  const store = useStore();
  const entries = useSelector(() => store.getState().entries);

  useEffect(() => {
    const loadStudents = async () =>
      store.dispatch({
        type: "getStudents",
        payload: { notify: false, id: undefined },
      });
    loadStudents();
  }, []);

  useEffect(() => {
    socket.on("student_received", (data) => {
      alert(data);
      store.dispatch({
        type: "getStudents",
        payload: { notify: true, id: undefined },
      });
    });
    socket.on("student_updated", (data) => {
      alert(data[0]);
      store.dispatch({
        type: "getStudents",
        payload: { notify: true, id: data[1] },
      });
    });
    socket.on("student_deleted", (data) => {
      alert(data[0]);
      store.dispatch({
        type: "getStudents",
        payload: { notify: true, id: data[1] },
      });
    });
    return () => {
      socket.off();
    };
  }, [socket]);

  return (
    <div
      style={{
        display: "grid",
        height: "100vh",
        alignContent: "space-between",
      }}
    >
      <Grid data={entries} editField={editField} onItemChange={fieldChange}>
        <GridToolbar>
          <Button onClick={addEntry}>Add New</Button>
        </GridToolbar>
        <GridColumn field="ID" editable={false} />
        <GridColumn field="Name" />
        <GridColumn field="Gender" cell={GenderList} />
        <GridColumn field="Address" />
        <GridColumn field="Number" title="Mobile No" />
        <GridColumn
          field="Birthday"
          title="Date of Birth"
          cell={BirthdayPicker}
        />
        <GridColumn field="Age" editable={false} />
        <GridColumn field="command" cell={MyCommandCell} />
      </Grid>
      <Upload
        batch={false}
        multiple={true}
        defaultFiles={[]}
        withCredentials={false}
        restrictions={{
          allowedExtensions: [".xlsx"],
        }}
      />
    </div>
  );
}

export default StudentPage;
