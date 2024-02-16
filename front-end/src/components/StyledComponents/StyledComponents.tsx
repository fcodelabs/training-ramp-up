import { styled } from "@mui/material/styles";
import { Box, Button, AppBar, Card, Dialog } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  borderRadius: "0",
  border: "none",
  "& .MuiDataGrid-columnHeader": {
    display: "flex",
    backgroundColor: "rgba(33, 150, 243, 0.08)",
  },
  "& .MuiDataGrid-colomnHeader-Cell": {
    padding: "6px 16px",
  },
  "& .MuiDataGrid-cell": {
    padding: "6px 16px",
  },
  "& .MuiDataGrid-row.Mui-selected": {
    boxShadow: "none",
  },
  "& .MuiDataGrid-coloumnHeaderTitleContainer": {
    justifyContent: "space-between",
  },
  "& .MuiDataGrid-columnHeader .MuiDataGrid-iconButtonContainer": {
    width: "auto",
    visibility: "visible",
  },
  "& .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted) .MuiDataGrid-sortIcon":
    {
      opacity: 0.5,
    },
}));

export const AddNewBox = styled(Box)(({ theme }) => ({
  height: "36px",
  display: "flex",
  alignItems: "center",
  padding: "16px",
  position: "relative",
  "& .MuiButton-root": {
    position: "absolute",
    right: "0",
    margin: "16px",
    backgroundColor: "#2196F3",
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "4px",
  border: "1px solid",
  padding: "4px 10px",
}));

export const StyledTopBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#000",
  boxShadow: "none",
  backgroundPaper: "#fff",
  borderBottom: "1px solid #e0e0e0",
  margin: "0 0 84px 0",
  height: "52px",
  "& .MuiToolbar-root": {
    justifyContent: "space-between",
    alignItems: "center",
    height: "52px",
    minHeight: "52px",
  },
  "& .MuiButton-root": {
    borderRadius: "4px",
    border: "1px solid rgba(33, 150, 243, 0.50)",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    color: "#2196F3",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  "& .MuiTypography-root": {
    fontSize: "24px",
    fontWeight: 600,
    color: "#1E88E5",
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  width: "calc(100% - 40px)",
  maxWidth: "1152px",
  margin: "0 auto",
  marginBottom: "84px",
  "& .MuiTypography-root": {
    padding: "16px",
    fontSize: "24px",
    fontWeight: 400,
    color: "#000",
  },
}));

export const StyledAddDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "calc(100% - 32px)",
    maxWidth: "632px",
    minHeight: "382px",
    borderRadius: "12px",
    padding: "16px 24px",
  },
  "& .MuiDialogTitle-root": {
    padding: "16px 0",
    color: "rgba(0, 0, 0, 0.87)",
    fontStyle: "normal",
    fontSize: "24px",
    fontWeight: 400,
  },
  "& .MuiDialogContent-root": {
    padding: "5px 0",
    display: "flex",
    flexDirection: "column",

    "& .MuiTextField-root": {
      "& .MuiInputBase-root": {
        height: "56px",
        padding: "0 12px",
        fontSize: "16px",
        fontWeight: 400,
        fontStyle: "normal",
        color: "rgba(0, 0, 0, 0.87)",
      },
    },
    "& .MuiButton-root": {
      width: "fit-content",
      padding: "6px 16px",
      borderRadius: "4px",
    },
  },
}));
