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
  useEffect(() => {
    dispatch(verifyToken());
  }, []);
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.user);
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, []);
  
    if (user !== null) {
      return (
        <Box>
          <TopBar />
          <StyledCard>
            <AddNewBox>
              <AddNewUserDialog />
            </AddNewBox>
            <DataTable />
          </StyledCard>
        </Box>
      );
    } else {
      return <></>;
    }
  
   
};

export default Home;
