import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridRowId,
  GridRowModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { MenuItem, Select, TextField } from "@mui/material";

import DialogBox from "../DialogBox/DialogBox";

const initialRows: IRowData[] = [
  {
    id: 1,
    name: "Jon",
    gender: "",
    address: "",
    mobileNo: "",
    dob: "",
    age: 14,
  },
  {
    id: 2,
    name: "Cersei",
    gender: "",
    address: "",
    mobileNo: "",
    dob: "",
    age: 31,
  },
  {
    id: 3,
    name: "Jaime",
    gender: "",
    address: "",
    mobileNo: "",
    dob: "",
    age: 31,
  },
  {
    id: 4,
    name: "Arya",
    gender: "",
    address: "",
    mobileNo: "",
    dob: "",
    age: 11,
  },
  {
    id: 5,
    name: "Daenerys",
    gender: "",
    address: "",
    mobileNo: "",
    dob: "",
    age: 25,
  },
  {
    id: 6,
    name: "Neth",
    gender: "",
    address: "",
    mobileNo: "",
    dob: "",
    age: 150,
  },
  {
    id: 7,
    name: "Ferrara",
    gender: "",
    address: "",
    mobileNo: "",
    dob: "",
    age: 44,
  },
  {
    id: 8,
    name: "Rossini",
    gender: "",
    address: "",
    mobileNo: "",
    dob: "",
    age: 36,
  },
  {
    id: 9,
    name: "Harvey",
    gender: "",
    address: "",
    mobileNo: "",
    dob: "",
    age: 65,
  },
];
interface IEditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  rowModesModel: GridRowModesModel;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IRowData {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobileNo: string;
  dob: string;
  age: number;
  isNew?: boolean;
}

export default function DataGrids() {
  const [rows, setRows] = React.useState<IRowData[]>(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const [openSaveDialog, setOpenSaveDialog] = React.useState(false);
  const [openDiscardDialog, setOpenDiscardDialog] = React.useState(false);
  const [isEditOperation, setIsEditOperation] = React.useState<boolean>(false);
  const [removeDialogOpen, setRemoveDialogOpen] = React.useState(false);
  const [rowToRemoveId, setRowToRemoveId] = React.useState<GridRowId | null>(
    null
  );
  const [studentRemoved, setStudentRemoved] = React.useState(false);
  const [mobNumberError, setmobNumberError] = useState<string | null>(null);
  const [isAnyRowInEditMode, setIsAnyRowInEditMode] = useState(false);

  const handleMobileNoChange = (
    value: string,
    params: GridRenderCellParams<IRowData>
  ) => {
    const mobNumberRegex = /^\+?\d+$/;

    if (
      (value.length < 10 || value.length > 10) &&
      mobNumberRegex.test(value)
    ) {
      setmobNumberError(null);

      const formattedNumber = value.replace(
        /(\d{3})(\d{3})(\d{4})/,
        "+$1 - $2 - $3"
      );

      params.api.setEditCellValue({
        id: params.id,
        field: params.field!,
        value: formattedNumber,
      });
    } else {
      setmobNumberError("Please enter a valid Mobile number");
    }
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "user-details",
      width: 137,
      sortable: false,
    },

    {
      field: "name",
      headerName: "Name",
      headerClassName: "user-details",
      width: 135,
      editable: true,

      renderEditCell: (params) => (
        <TextField
          size="small"
          variant="outlined"
          InputLabelProps={{ shrink: false }}
          autoFocus
          value={params.value as string}
          onChange={(e) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: e.target.value,
            })
          }
          sx={{
            // borderRadius: "0px",
            border: "1px solid rgba(33,150,243,1)",
            boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2)",
          }}
        />
      ),
    },

    {
      field: "gender",
      headerName: "Gender",
      headerClassName: "user-details",
      sortable: false,
      width: 137,
      editable: true,
      renderEditCell: (params) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return (
            <>
              <Select
                value={(params.value as string) || ""}
                onChange={(e) => {
                  params.api.setEditCellValue({
                    id: params.id,
                    field: "gender",
                    value: e.target.value,
                  });
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                fullWidth
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </>
          );
        }
      },
    },
    {
      field: "address",
      headerName: "Address",
      headerClassName: "user-details",
      sortable: false,
      width: 137,
      editable: true,

      renderEditCell: (params) => (
        <TextField
          size="small"
          variant="outlined"
          InputLabelProps={{ shrink: false }}
          value={params.value as string}
          onChange={(e) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: e.target.value,
            })
          }
          sx={{
            borderRadius: "0px",
            border: "1px solid rgba(33,150,243,1)",
            boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2)",
          }}
        />
      ),
    },
    {
      field: "mobileNo",
      headerName: "Mobile No:",
      headerClassName: "user-details",
      sortable: false,
      type: "string",
      headerAlign: "left",
      width: 135,
      editable: true,

      renderEditCell: (params) => (
        <div>
          <TextField
            size="small"
            variant="outlined"
            InputLabelProps={{ shrink: false }}
            value={params.value as string}
            onChange={(e) => handleMobileNoChange(e.target.value, params)}
            sx={{
              borderRadius: "5px",
              border: mobNumberError
                ? "2px solid red"
                : "1px solid rgba(33,150,243,1)",
              boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2)",
            }}
          />
          {mobNumberError && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {mobNumberError}
            </div>
          )}
        </div>
      ),
    },
    {
      field: "dob",
      headerName: "Date of Birth",
      headerClassName: "user-details",
      headerAlign: "left",
      type: "date",
      width: 175,
      editable: true,
      valueGetter: (params) => {
        return params.row.dob ? new Date(params.row.dob) : null;
      },
      renderEditCell: (params) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return (
            <TextField
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: false }}
              value={params.row.dob ? params.row.dob.split("T")[0] : ""}
              type="date"
              fullWidth
              onChange={(e) =>
                params.api.setEditCellValue({
                  id: params.id,
                  field: "dob",
                  value: e.target.value,
                })
              }
              sx={{
                borderRadius: "0px",
                border: "1px solid rgba(33,150,243,1)",
                boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2)",
              }}
            />
          );
        }
      },
      renderCell: (params) => {
        const dob = params.row.dob;
        if (dob) {
          const formattedDate = new Date(dob).toLocaleDateString();
          return formattedDate;
        }
        return null;
      },
    },
    // ...

    {
      field: "age",
      headerName: "Age",
      headerClassName: "user-details",
      sortable: false,
      headerAlign: "left",
      width: 101,
      editable: true,
      renderEditCell: (params) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit;

        const age =
          params.value !== null && params.value !== undefined
            ? params.value.toString()
            : "";

        const dob = params.row.dob;
        if (dob) {
          const today = new Date();
          const birthDate = new Date(dob);
          const age = today.getFullYear() - birthDate.getFullYear();
        }

        const showErrorMessage = age !== "" && age < 18;

        if (isInEditMode) {
          return (
            <div>
              <TextField
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: false }}
                error={showErrorMessage}
                value={age !== undefined ? age.toString() : ""}
              />
            </div>
          );
        }
      },
      renderCell: (params) => {
        const dob = params.row.dob;
        if (dob) {
          const today = new Date();
          const birthDate = new Date(dob);
          const age = today.getFullYear() - birthDate.getFullYear();
          if (age < 18) {
            return (
              <TextField
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: false }}
                value={age !== undefined ? age.toString() : ""}
              />
            );
          }
          return age;
        }
        return null;
      },
    },

    {
      field: "action",
      headerName: "Action",
      type: "actions",
      headerClassName: "user-details",
      headerAlign: "left",
      sortable: false,
      width: 190,

      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "25px",
                gap: "5px",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                style={{ width: "auto" }}
                onClick={handleSaveClick(id)}
              >
                Add
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                style={{ width: "auto" }}
                onClick={handleCancelClick(id)}
              >
                Discard Changes
              </Button>
              ,
            </div>,
          ];
        }

        return [
          <Button variant="outlined" size="small" onClick={handleEditClick(id)}>
            Edit
          </Button>,

          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={handleDeleteClick(id)}
          >
            Remove
          </Button>,
        ];
      },
    },
  ];

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    const editedRowIndex = rows.findIndex((row) => row.id === id);
    if (editedRowIndex !== -1) {
      const updatedRows = [...rows];
      updatedRows[editedRowIndex] = { ...rows[editedRowIndex], isNew: false };
      setRows(updatedRows);
    }

    setIsEditOperation(rowModesModel[id]?.mode === GridRowModes.Edit);
    setOpenSaveDialog(true);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

    setRows((oldRows) => {
      const editedRow = oldRows.find((row) => row.id === id);
      const updatedRows = oldRows.filter((row) => row.id !== id);
      return [...updatedRows, editedRow!];
      //return updatedRows;
    });
  };
  const handleCloseSaveDialog = () => {
    // Close the Save dialog and reset the state
    setOpenSaveDialog(false);
    setIsEditOperation(false); // Reset the edit operation state
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    // setRows(rows.filter((row) => row.id !== id));
    setRowToRemoveId(id);
    setRemoveDialogOpen(true);
  };

  const handleRemoveDialogConfirm = () => {
    if (rowToRemoveId !== null) {
      setRows(rows.filter((row) => row.id !== rowToRemoveId));
      setStudentRemoved(true);
    }
    setRemoveDialogOpen(false);
  };

  const handleRemoveDialogDismiss = () => {
    setRemoveDialogOpen(false);
    setRowToRemoveId(null);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setOpenDiscardDialog(true);
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleCloseDiscardDialog = () => {
    // Close the Discard dialog and reset the state
    setOpenDiscardDialog(false);
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false } as IRowData;
    setRows((oldRows) =>
      oldRows.map((row) => (row.id === newRow.id ? updatedRow : row))
    );
    // setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);

    const inEditMode = Object.values(newRowModesModel).some(
      (rowMode) => rowMode.mode === GridRowModes.Edit
    );
    setIsAnyRowInEditMode(inEditMode);
  };

  function EditToolbar(props: IEditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleAddNew = () => {
      const newId = Math.max(...rows.map((row) => row.id)) + 1;

      const newRow = {
        id: newId,
        name: "",
        gender: "",
        address: "",
        mobileNo: null,
        dob: null,
        age: null,
        Action: "Edit",
      };

      setRowModesModel((prevRowModesModel) => ({
        ...prevRowModesModel,
        [newId]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      }));

      setRows((prevRows) => [newRow, ...prevRows]);
    };

    return (
      <div
        style={{
          display: "flex",
          padding: "6px 16px 6px 16px",
          justifyContent: "flex-end",
        }}
      >
        <GridToolbarContainer>
          <Button variant="contained" size="medium" onClick={handleAddNew}>
            ADD NEW
          </Button>
        </GridToolbarContainer>
      </div>
    );
  }

  return (
    <div
      style={{
        minWidth: "1500px",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: "fit-content",
          width: "80%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",

          "& .user-details": {
            backgroundColor: "rgba(33, 150, 243, 0.08)",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            padding: "16px",
            fontSize: "24px",
            fontWeight: "400",
            fontFamily: "Roboto,sans-serif",
            lineHeight: "32.02px",
          }}
        >
          User Details
        </div>

        {openSaveDialog && (
          <DialogBox
            open={openSaveDialog}
            onClose={handleCloseSaveDialog}
            dialogContent={
              isEditOperation
                ? "Student Details updated successfully"
                : "A new student added successfully"
            }
            buttonLabel="OK"
            buttonAction={handleCloseSaveDialog}
          />
        )}

        {openDiscardDialog && (
          <DialogBox
            open={openDiscardDialog}
            onClose={handleCloseDiscardDialog}
            dialogContent="Discard changes?"
            buttonLabel="CONFIRM"
            buttonAction={() => {
              handleCloseDiscardDialog();
            }}
            secondary={true}
            secondaryButtonLabel="DISMISS"
            secondaryButtonAction={handleCloseDiscardDialog}
          />
        )}

        {removeDialogOpen && (
          <DialogBox
            open={removeDialogOpen}
            onClose={handleRemoveDialogDismiss}
            dialogContent="Are you sure you want to remove this student?"
            buttonLabel="CONFIRM"
            buttonAction={handleRemoveDialogConfirm}
            secondary={true}
            secondaryButtonLabel="DISMISS"
            secondaryButtonAction={handleRemoveDialogDismiss}
          />
        )}

        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          processRowUpdate={processRowUpdate}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel, rowModesModel },
          }}
          pageSizeOptions={[5, 10, 15]}
          checkboxSelection
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
          getRowHeight={(params) => (params.id in rowModesModel ? 80 : 48)}
        />
      </Box>
    </div>
  );
}
