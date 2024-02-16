import TopBar from "../../components/TopBar/TopBar";
import DataTable from "../../components/DataTable/DataTable";
import { Box } from "@mui/material";
import {
  AddNewBox,
  StyledCard,
} from "../../components/StyledComponents/StyledComponents";
import AddNewUserDialog from "../../components/AddNewUserDialog/AddNewUserDialog";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyToken } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.user);
  useEffect(() => {
    dispatch(verifyToken());
  }, []);

  let role = "";

  if (user !== null) {
    role = user.role;
    console.log(role);
  }

  // useEffect(() => {
  //   if (user === null) {
  //     navigate("/login");
  //   }
  // }, [user]);

  if (user !== null) {
    return (
      <Box>
        <TopBar />
        <StyledCard sx={{ maxWidth: role === "Admin" ? "1152px" : "955px" }}>
          {role === "Admin" && (
            <AddNewBox sx={{ backgroundColor: "rgba(33, 150, 243, 0.08)" }}>
              <AddNewUserDialog />
            </AddNewBox>
          )}
          <DataTable role={role} />
        </StyledCard>
      </Box>
    );
  } else {
    navigate("/login");
    return <></>;
  }
};

export default Home;
