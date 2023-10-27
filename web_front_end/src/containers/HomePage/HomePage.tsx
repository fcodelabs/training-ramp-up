import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import StudentDataGrid from "./StudentDataGrid/StudentDataGrid";
import UserDataGrid from "./UserDataGrid/UserDataGrid";
import Header from "../../components/Header/Header";
import ERoleEnum from "../../enum/roleEnum";

export default function HomePage() {
    const currentUserRole = useSelector(
        (state: RootState) => state.userDataList.currentUserRole,
    );

    const [showStudentDataGrid, setShowStudentDataGrid] = useState(
        currentUserRole == ERoleEnum.USER ? false : true,
    );
    const [showUserDataGrid, setShowUserDataGrid] = useState(
        currentUserRole == ERoleEnum.USER ? true : false,
    );

    const [selectedButton, setSelectedButton] = useState(0);

    return (
        <>
            <Header />
            <Box display="flex" justifyContent="start" paddingTop="5em">
                {currentUserRole == ERoleEnum.ADMIN && (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                                m: 2,
                                borderRadius: "30px",
                                backgroundColor: "#ECF0F1",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            }}
                        >
                            <Button
                                sx={{
                                    backgroundColor:
                                        selectedButton === 0
                                            ? "#44BCE7"
                                            : "initial",
                                    color:
                                        selectedButton === 0 ? "white" : "gray",
                                    "&:hover": {
                                        backgroundColor: "#D7E2FF",
                                        color: "gray",
                                    },
                                    borderTopLeftRadius: "30px",
                                    borderBottomLeftRadius: "30px",
                                    fontFamily: "Ubuntu, sans-serif",
                                    fontWeight: "600",
                                    padding: "0.5rem 1rem 0.5rem 1rem",
                                }}
                                onClick={() => {
                                    setShowStudentDataGrid(true);
                                    setShowUserDataGrid(false);
                                    setSelectedButton(0);
                                }}
                            >
                                Student Manage
                            </Button>
                            <Button
                                sx={{
                                    backgroundColor:
                                        selectedButton === 1
                                            ? "#44BCE7"
                                            : "initial",
                                    color:
                                        selectedButton === 1 ? "white" : "gray",
                                    "&:hover": {
                                        backgroundColor: "#D7E2FF",
                                        color: "gray",
                                    },
                                    borderTopRightRadius: "30px",
                                    borderBottomRightRadius: "30px",
                                    fontFamily: "Ubuntu, sans-serif",
                                    fontWeight: "600",
                                    padding: "0.5rem 1rem 0.5rem 1rem",
                                }}
                                onClick={() => {
                                    setShowStudentDataGrid(false);
                                    setShowUserDataGrid(true);
                                    setSelectedButton(1);
                                }}
                            >
                                User Manage
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "70vh",
                    padding: "0 50px 0 50px",
                }}
            >
                {showStudentDataGrid && <StudentDataGrid />}
                {showUserDataGrid && <UserDataGrid />}
            </Box>
        </>
    );
}
