import TopBar from "../components/TopBar/TopBar";
import DataTable from "../components/DataTable/DataTable";
import { Box } from "@mui/material";
import {
  AddNewBox,
  StyledCard,
} from "../components/StyledComponents/StyledComponents";
import AddNewUserDialog from "../components/AddNewUserDialog/AddNewUserDialog";

const UserDetails = () => {
  return (
    <Box>
      <TopBar />

      <StyledCard>
        <AddNewBox sx={{ backgroundColor: "rgba(33, 150, 243, 0.08)" }}>
          <AddNewUserDialog/>
        </AddNewBox>

        <DataTable />
      </StyledCard>
    </Box>
  );
};

export default UserDetails;
