import "./App.css";
import "@progress/kendo-theme-default/dist/all.css";
import { TablePage } from "./pages/tablePage";
import { FileUpload } from "./pages/fileUpload";

function App() {
  return (
    <div>
      <h1>Student Records</h1>
      <TablePage />
      <FileUpload />
    </div>
  );
}

export default App;
