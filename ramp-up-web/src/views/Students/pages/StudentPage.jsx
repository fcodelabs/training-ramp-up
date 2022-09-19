/* eslint-disable react/prop-types */
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { useState, useEffect } from "react";
import { MyCommandCell } from "../components/CommandCell";
import { Upload } from "@progress/kendo-react-upload";
import { editField } from "../constants";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../services/api";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function StudentPage() {
  const [entries, setEntries] = useState([]);
  const [updatingEntry, setUpdatingEntry] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [changingEntry, setChangingEntry] = useState(null);

  useEffect(() => {
    socket.on("student_received", (data) => {
      alert(data);
      getEntries(true);
    });
    socket.on("student_updated", (data) => {
      alert(data[0]);
      getEntries(true, data[1]);
    });
    socket.on("student_deleted", (data) => {
      alert(data[0]);
      getEntries(true, data[1]);
    });
    return () => {
      socket.off();
    };
  }, [socket]);

  const getEntries = (notify, id) =>
    getStudents().then((res) => {
      let sortedEntries = res.sort((a, b) => parseInt(a.ID) - parseInt(b.ID));
      setChangingEntry((changingEntry) => {
        if (notify && changingEntry !== null) {
          if (id === undefined) {
            if (changingEntry.new) {
              sortedEntries.unshift(changingEntry);
              setUpdatingEntry(changingEntry);
            }
            return changingEntry;
          } else if (id === changingEntry.ID) {
            setUpdatingEntry(null);
            return null;
          } else {
            if (changingEntry.new) {
              sortedEntries.unshift(changingEntry);
            }
            return changingEntry;
          }
        } else {
          return changingEntry;
        }
      });
      setEntries(sortedEntries);
    });

  useEffect(() => getEntries, []);

  const birthdayChange = (value, dataItem) => {
    const today = new Date();
    const birthdate = getBirthday(value);
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    const birthYear = birthdate.getFullYear();
    const birthMonth = birthdate.getMonth();
    const birthDay = birthdate.getDate();
    let years = currentYear - birthYear;
    let months = 0;
    let days = 0;
    if (currentMonth >= birthMonth) {
      months = currentMonth - birthMonth;
    } else {
      years--;
      months = 12 + currentMonth - birthMonth;
    }
    if (currentDay >= birthDay) {
      days = currentDay - birthDay;
    } else {
      months--;
      days = 31 + currentDay - birthDay;
    }
    if (months < 0) {
      months = 11;
      years--;
    }
    const age = `${years} years ${months} months ${days} days`;
    const newEntry = entries.map((entry) =>
      entry.ID === dataItem.ID
        ? { ...entry, ["Birthday"]: value, ["Age"]: age }
        : entry
    );
    setEntries(newEntry);
  };

  const getBirthday = (birthday) => {
    var date = birthday.split("/");
    var d = parseInt(date[0], 10),
      m = parseInt(date[1], 10),
      y = parseInt(date[2], 10);
    return new Date(y, m - 1, d);
  };

  const BirthdayPicker = (props) => {
    const { dataItem } = props;
    return (
      <td>
        <DatePicker
          format="dd/MM/yyyy"
          defaultValue={getBirthday(dataItem.Birthday)}
          max={new Date()}
          disabled={!dataItem.inEdit}
          onChange={(e) => {
            if (
              e.value !== null &&
              e.value.getFullYear().toString().length === 4
            ) {
              const birthday = e.value.toLocaleDateString("en-GB");
              birthdayChange(birthday, dataItem);
            }
          }}
        />
      </td>
    );
  };

  const genderChange = (value, dataItem) => {
    const newEntry = entries.map((entry) =>
      entry.ID === dataItem.ID ? { ...entry, ["Gender"]: value } : entry
    );
    setEntries(newEntry);
  };

  const getGender = (dataItem) => {
    const gender = entries.find((e) => e.ID === dataItem.ID).Gender;
    return gender;
  };

  const GenderList = (props) => {
    const { dataItem } = props;
    return (
      <td>
        <DropDownList
          data={["Male", "Female"]}
          disabled={!dataItem.inEdit}
          defaultValue={getGender(dataItem)}
          onChange={(e) => {
            const gender = e.value;
            genderChange(gender, dataItem);
          }}
        />
      </td>
    );
  };

  const CommandCell = (props) => (
    <MyCommandCell
      {...props}
      edit={startEdit}
      remove={deleteEntry}
      add={insertEntry}
      discard={discardEntry}
      update={updateEntry}
      cancel={cancelChanges}
      editField={editField}
    />
  );

  const insertEntry = (entry) => {
    delete entry.inEdit;
    delete entry.new;
    setUpdatingEntry(null);
    setChangingEntry(null);
    addStudent(entry)
      .then((response) => {
        socket.emit("student_added", response);
        getEntries();
        alert(response);
      })
      .catch((e) => console.log(e));
  };

  const updateEntry = (entry) => {
    setUpdatingEntry(null);
    setChangingEntry(null);
    delete entry.inEdit;
    delete entry.new;
    updateStudent(entry)
      .then((response) => {
        socket.emit("student_edit", [response, entry.ID]);
        getEntries();
        alert(response);
      })
      .catch((e) => console.log(e));
  };

  const deleteEntry = (entry) => {
    deleteStudent(entry.ID)
      .then((response) => {
        socket.emit("student_remove", [response, entry.ID]);
        getEntries();
        alert(response);
      })
      .catch((e) => console.log(e));
  };

  const discardEntry = () => {
    const newEntries = [...entries];
    newEntries.splice(0, 1);
    setEntries(newEntries);
    setUpdatingEntry(null);
    setChangingEntry(null);
  };

  const cancelChanges = (entry) => {
    const index = entries.findIndex((e) => e.ID === entry.ID);
    const newEntries = entries;
    newEntries[index] = updatingEntry;
    setEntries(newEntries);
    setUpdatingEntry(null);
    setChangingEntry(null);
  };

  const startEdit = (entry) => {
    if (updatingEntry === null) {
      const newEntries = entries.map((e) => {
        if (e.ID === entry.ID) {
          setUpdatingEntry(entry);
          setChangingEntry(entry);
          return { ...e, inEdit: true };
        } else {
          return e;
        }
      });
      setEntries(newEntries);
    }
  };

  const fieldChange = (event) => {
    const inEditID = event.dataItem.ID;
    const field = event.field || "";
    const newEntries = entries.map((entry) =>
      entry.ID === inEditID ? { ...entry, [field]: event.value } : entry
    );
    const changingEntry = newEntries.find((e) => e.ID === inEditID);
    setEntries(newEntries);
    setChangingEntry(changingEntry);
  };

  const addEntry = () => {
    const date = new Date().toLocaleDateString("en-GB");
    if (updatingEntry === null) {
      const newEntry = {
        Birthday: date,
        new: true,
        inEdit: true,
      };
      setEntries([newEntry, ...entries]);
      setUpdatingEntry(newEntry);
      setChangingEntry(newEntry);
    }
  };

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
        <GridColumn field="command" cell={CommandCell} />
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
