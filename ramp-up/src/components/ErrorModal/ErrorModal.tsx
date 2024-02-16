import { Box, Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import React from "react";

const styles = {
  dismiss: {
    color: "#9C27B0",
  },

  error: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "flex-start",
    padding: "16px 24px",
    alignSelf: "stretch",
  },

  buttonDiv: {
    display: "flex",
    padding: "var(--1, 8px)",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "var(--1, 8px)",
    alignSelf: "stretch",
  },
  box: {
    background: "#FFFFFF",
    position: "absolute" as "absolute",
    width: "444px",
    height: "110px",
    top: "50%",
    left: "50%",
    borderRadius: "12px",
    border: "#FFFFFF",
    boxShadow:
      "0px 11px 15px -7px rgba(0, 0, 0, 0.20), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
    outline: "none",
    transform: "translate(-50%, -50%)",
  },
};

interface IErrorModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
  dismiss: boolean;
  buttonName: string;
  onClick: () => void;
}

function ErrorModal({
  open,
  onClose,
  message,
  dismiss,
  buttonName,
  onClick,
}: IErrorModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.box}>
        <div style={styles.error}>
          <Typography>{message}</Typography>
        </div>
        <div style={styles.buttonDiv}>
          {dismiss && (
            <Button sx={styles.dismiss} onClick={onClose}>
              dismiss
            </Button>
          )}
          <Button onClick={onClick}>{buttonName}</Button>
        </div>
      </Box>
    </Modal>
  );
}

export default ErrorModal;
