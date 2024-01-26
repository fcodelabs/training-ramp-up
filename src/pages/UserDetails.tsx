import TopBar from "../components/TopBar/TopBar";
import DataTable from "../components/DataTable/DataTable";
import { Card } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "calc(100% - 40px)",
  maxWidth: "1152px",
  margin: "0 auto",
  "& .MuiTypography-root": {
    padding: "16px",
    fontSize: "24px",
    fontWeight: 400,
    color: "#000",
  },
}));

const UserDetails = () => {
  return (
    <div>
      <TopBar />
      <StyledCard>
        <DataTable />
      </StyledCard>
    </div>
  );
};

export default UserDetails;
