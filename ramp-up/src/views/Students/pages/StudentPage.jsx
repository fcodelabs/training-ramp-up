import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { useState } from "react";
import { MyCommandCell } from "../components/commandCell";

function StudentPage() {
  const [entries, setEntries] = useState([]);
  const [editID, setEditID] = useState(null);
  const [updatingEntry, setUpdatingEntry] = useState({});
  const editField = "inEdit";

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
    entry.inEdit = true;
    entry.inEdit = false;
    entry.new = false;
    let index = entries.findIndex((e) => e.ID === entry.ID);
    const newEntries = entries;
    newEntries[index] = entry;
    setEntries(newEntries);
    setEditID(null);
  };

  const updateEntry = (entry) => {
    let index = entries.findIndex((e) => e.ID === entry.ID);
    const newEntries = entries;
    newEntries[index] = entry;
    setEntries(newEntries);
    setEditID(null);
    setUpdatingEntry(null);
  };

  const deleteEntry = (entry) => {
    let index = entries.findIndex((e) => e.ID === entry.ID);
    const newEntries = [...entries];
    newEntries.splice(index);
    setEntries(newEntries);
  };

  const discardEntry = () => {
    const newEntries = [...entries];
    newEntries.splice(0, 1);
    setEntries(newEntries);
    setEditID(null);
  };

  const cancelChanges = (entry) => {
    const index = entries.findIndex((e) => e.ID === entry.ID);
    const newEntries = entries;
    newEntries[index] = updatingEntry;
    setEntries(newEntries);
    setEditID(null);
    setUpdatingEntry(null);
  };

  const startEdit = (entry) => {
    const newEntries = entries.map((e) => {
      if (e.ID === entry.ID) {
        setEditID(e.ID);
        setUpdatingEntry(entry);
        return { ...e, inEdit: true };
      } else {
        return e;
      }
    });
    setEntries(newEntries);
  };

  const fieldChange = (event) => {
    const inEditID = event.dataItem.ID;
    const field = event.field || "";
    const newEntry = entries.map((entry) =>
      entry.ID === inEditID ? { ...entry, [field]: event.value } : entry
    );
    setEntries(newEntry);
  };

  const addEntry = () => {
    const newEntry = {
      ID: entries.length + 1,
      new: true,
    };
    setEntries([newEntry, ...entries]);
    setEditID(newEntry.ID);
  };

  return (
    <Grid
      data={entries.map((entry) => ({
        ...entry,
        inEdit: entry.ID === editID,
      }))}
      editField={editField}
      onItemChange={fieldChange}
    >
      <GridToolbar>
        <Button onClick={addEntry}>Add New</Button>
      </GridToolbar>
      <GridColumn field="ID" editable={false} />
      <GridColumn field="Name" />
      <GridColumn field="Gender" />
      <GridColumn field="Address" />
      <GridColumn field="Number" title="Mobile No" />
      <GridColumn field="Birthday" title="Date of Birth" />
      <GridColumn field="Age" />
      <GridColumn field="command" cell={CommandCell} />
    </Grid>
  );
}

export default StudentPage;
