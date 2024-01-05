import { Stack } from "@mui/material";

import Header from "./components/Header/Header";
import DataGridTable from "./components/DataGridTable/DataGridTable";

function App() {
  return (
    <Stack spacing={20} justifyContent="center" alignItems="center">
      <Header />
      <DataGridTable />
    </Stack>
  );
}

export default App;
