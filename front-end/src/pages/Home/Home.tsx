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
import { useIdleTimer } from "react-idle-timer";
import { logOut } from "../../redux/slices/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.user);
  useEffect(() => {
    dispatch(verifyToken());
  }, []);

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user]);

  let role = "";
  if (user !== null) {
    role = user.role;
  }

  const onIdle = () => {
    dispatch(logOut());
  };

  const {  } = useIdleTimer({
    onIdle,
    timeout: 1000 * 60 * 15,
  });

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
};

export default Home;
