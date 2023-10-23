import React, { useState } from "react";
import "./App.css";
import AddNewButton from "./table/AddNewButton";
import StudentTable from "./table/StudentTable";

function App() {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <AddNewButton label="Add New" onClick={() => setVisible(!visible)} />
      <StudentTable
        visible={visible}
        onDiscardClick={() => setVisible(false)}
      />
    </div>
  );
}

export default App;
