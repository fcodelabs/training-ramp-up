import { Stack } from "@mui/material";
import Header from "../../components/Header/Header";
import AdminDataGridTable from "../../components/DataGridTable/AdminDataGridTable";
import ObserverDataGridTable from "../../components/DataGridTable/ObserverDataGridTable";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const userRole = location.state && location.state.role;
  useEffect(() => {}, []);
  return (
    <Stack spacing={20} justifyContent="center" alignItems="center">
      <Header />
      {userRole === "Admin" ? (
        <AdminDataGridTable />
      ) : (
        <ObserverDataGridTable />
      )}
    </Stack>
  );
};

export default HomePage;
