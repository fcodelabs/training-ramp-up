import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { STUDENT_ROUTE, USER_ROUTE } from "../../util/routeUtil";
import studentImage from "../../assets/students.jpg";
import userImage from "../../assets/users.jpg";
import Header from "../../components/Header/Header";
import { ERole } from "../../enum/roleEnum";

const HomePage = () => {
  const currentRole = useSelector((state: RootState) => state.userList.currentUserRole);
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Grid container justifyContent="space-evenly" sx={{ height: "100vh" }}>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 10 }}>
          <Typography
            color={"primary"}
            variant="h2"
            component="div"
            gutterBottom
            align="center"
            sx={{ mt: 10 }}
          >
            Welcome to Ramp Up
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card
            sx={{ maxWidth: 800, cursor: "pointer", ":hover": { boxShadow: "0 0 10px 0" } }}
            onClick={() => {
              navigate(STUDENT_ROUTE);
            }}
          >
            <CardMedia component="img" height="300" image={studentImage} alt="students" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Students
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentRole === ERole.ADMIN ? "View and edit student data" : "View student data"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {currentRole === ERole.ADMIN ? (
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Card
              sx={{ maxWidth: 800, cursor: "pointer", ":hover": { boxShadow: "0 0 10px 0" } }}
              onClick={() => {
                navigate(USER_ROUTE);
              }}
            >
              <CardMedia component="img" height="300" image={userImage} alt="users" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Users
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View and edit user data
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
};

export default HomePage;
