import React from "react";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import AddNewUserModal from "../../../components/AddNewUserModal/AddNewUserModal";

const styles = {
    addNewDiv: {
        padding: "8px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "16px",
        alignSelf: "stretch",
        background: "rgba(148, 205, 251, 0.10)"
      },
}

export const StyledButton = styled(Button)((theme) => ({
    padding: "6px 16px",
    fontWeight: 500,
    letterSpacing: "0.4px",
    fontSize: "14px",
    fontFamily: "Roboto,sans-serif",
    fontStyle: "normal",
    lineHeight: "24px",
    backgroundColor: "#2196F3",
    color: "#FFFFFF",
    '&:hover': {
        backgroundColor: "#2196F3",
    },
}));

function AddUser(){
    const [isOpen, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    return(
    <div style={styles.addNewDiv}>
        <StyledButton
            onClick={() => setOpen(true)}
        >
            Add new User
        </StyledButton>
        <AddNewUserModal
            open={isOpen}
            onClose={handleClose}
            />
    </div>
    )
}

export default AddUser;