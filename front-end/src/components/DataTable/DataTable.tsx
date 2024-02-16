import * as React from "react";
import {
  styled,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { replaceStudents } from "../../redux/studentsSlice/stdentsSlice";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import calculateAge from "../../utility/calculateAge/calculateAge";
import validateMobileNumber from "../../utility/validateMobilwNumber/validateMobileNumber";
import OneButtonDialog from "../OneButtonDialog/OneButtonDialog";
import TwoButtonDialog from "../TwoButtonDialog/TwoButtonDialog";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  borderRadius: "0",
  "& .MuiDataGrid-columnHeader": {
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
}));

const AddNewBox = styled(Box)(({ theme }) => ({
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

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "4px",
  border: "1px solid",
  padding: "4px 10px",
}));

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;
  const currentStudents = useSelector((state: RootState) => state.students);
  const lastId = currentStudents.length;
  const [id, setId] = React.useState(lastId + 1);

  const handleAddNewClick = () => {
    setId(id + 1);
    const newRecord = {
      id,
      name: "",
      gender: "",
      address: "",
      mobileNumber: "",
      birthday: "",
      age: "",
      isNew: true,
    };
    setRows((oldRows) => [newRecord, ...oldRows]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <>
      <Box>
        <Typography>User Details</Typography>
      </Box>
      <AddNewBox>
        <Button variant="contained" onClick={handleAddNewClick}>
          ADD NEW
        </Button>
      </AddNewBox>
    </>
  );
}

export default function DataTable() {
  const currentStudents = useSelector((state: RootState) => state.students);
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState(currentStudents);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [numbervalidateError, setNumberValidateError] = React.useState(false);
  const [agevalidateError, setAgeValidateError] = React.useState(false);
  const [keepEditingIsOpen, setKeepEditingIsOpen] = React.useState(false);
  const [saveedSuccessIsOpen, setSavedSuccessIsOpen] = React.useState(false);
  const [discrdChangesIsOpen, setDiscardChangesIsOpen] = React.useState(false);
  const [updatesuccessIsOpen, setupdatesuccessIsOpen] = React.useState(false);
  const [removeConfirmIsOpen, setremoveConfirmIsOpen] = React.useState(false);
  const [removeSuccesIsOpen, setremoveSuccesIsOpen] = React.useState(false);
  const [currentid, setCurrentId] = React.useState<GridRowId | null>(null);
  const [nameIsEmpty, setNameIsEmpty] = React.useState(false);
  const [genderIsEmpty, setGenderIsEmpty] = React.useState(false);
  const [addressIsEmpty, setAddressIsEmpty] = React.useState(false);
  const [mobileNumberIsEmpty, setMobileNumberIsEmpty] = React.useState(false);
  const [birthdayIsEmpty, setBirthdayIsEmpty] = React.useState(false);
  const [isAdding, setIsading] = React.useState(false);
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    setIsading(true);
  };

  const handleUpdateClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    setIsading(false);
  };

  const handleRemoveClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
    setremoveConfirmIsOpen(false);
    setremoveSuccesIsOpen(true);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    console.log(11);
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
    setDiscardChangesIsOpen(false);
    setAgeValidateError(false);
    setNumberValidateError(false);
    setNameIsEmpty(false);
    setGenderIsEmpty(false);
    setAddressIsEmpty(false);
    setMobileNumberIsEmpty(false);
    setBirthdayIsEmpty(false);
  };

  const handleDiscardChangesClick = (id: GridRowId) => () => {
    setDiscardChangesIsOpen(true);
    setCurrentId(id);
  };

  const handleRemoveButtonclick = (id: GridRowId) => () => {
    setremoveConfirmIsOpen(true);
    setCurrentId(id);
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    const name = newRow.name;
    const gender = newRow.gender;
    const address = newRow.address;
    const birthday = newRow.birthday;
    const mobileNumber = newRow.mobileNumber;
    const age = newRow.age;
    const validNumber = validateMobileNumber(mobileNumber);
    const validAge = age >= 18;

    setNumberValidateError(false);
    setAgeValidateError(false);
    setNameIsEmpty(false);
    setGenderIsEmpty(false);
    setAddressIsEmpty(false);
    setMobileNumberIsEmpty(false);
    setBirthdayIsEmpty(false);
    if (name === "") {
      setNameIsEmpty(true);
    }
    if (gender === "") {
      setGenderIsEmpty(true);
    }
    if (address === "") {
      setAddressIsEmpty(true);
    }
    if (age === "") {
      setBirthdayIsEmpty(true);
    }
    if (mobileNumber === "") {
      setMobileNumberIsEmpty(true);
    }
    if (
      name === "" ||
      gender === "" ||
      address === "" ||
      birthday === null ||
      mobileNumber === "" ||
      age === ""
    ) {
      console.log("empty fields error");
      setKeepEditingIsOpen(true);
      return {};
    }
    if (!validNumber && !validAge) {
      console.log("invalid number and age error");
      setNumberValidateError(true);
      setAgeValidateError(true);
      return {};
    }
    if (!validNumber) {
      console.log("invalid number error");
      setNumberValidateError(true);
      return {};
    }
    if (!validAge) {
      console.log("invalid age error");
      setAgeValidateError(true);
      return {};
    }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    try {
      dispatch(replaceStudents(rows));
      if (isAdding) {
        setSavedSuccessIsOpen(true);
      }
      if (!isAdding) {
        setupdatesuccessIsOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 64,
      disableColumnMenu: true,
      headerAlign: "left",
      align: "left",
      type: "number",
      sortable: false,
    },
    {
      field: "name",
      editable: true,
      headerName: "Name",
      width: 135,
      disableColumnMenu: true,
      headerAlign: "left",
      align: "left",
      type: "string",
      renderEditCell: (params: GridRenderCellParams<any, string>) => (
        <TextField
          size="small"
          sx={{
            border: nameIsEmpty
              ? "1px solid rgba(211, 47, 47, 1)"
              : "1px solid rgba(33, 150, 243, 1)",
            "& .MuiOutlinedInput-root fieldset": {
              border: "none",
              margin: "16px",
            },
          }}
          value={params.value as string}
          onChange={(e) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: e.target.value,
            })
          }
        />
      ),
    },
    {
      field: "gender",
      editable: true,
      headerName: "Gender",
      width: 132,
      disableColumnMenu: true,
      sortable: false,
      type: "singleSelect",
      valueOptions: ["Male", "Female", "Other"],
      renderEditCell: (params: GridRenderCellParams<any, string>) => (
        <Select
          size="small"
          sx={{
            border: genderIsEmpty
              ? "1px solid rgba(211, 47, 47, 1)"
              : "1px solid rgba(33, 150, 243, 1)",
            borderRadius: "0",
          }}
          fullWidth
          value={params.value as string}
          onChange={(e) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: e.target.value,
            })
          }
        >
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      ),
    },
    {
      field: "address",
      editable: true,
      headerName: "Address",
      width: 137,
      disableColumnMenu: true,
      sortable: false,
      type: "string",
      renderEditCell: (params: GridRenderCellParams<any, string>) => (
        <TextField
          size="small"
          sx={{
            border: addressIsEmpty
              ? "1px solid rgba(211, 47, 47, 1)"
              : "1px solid rgba(33, 150, 243, 1)",
            "& .MuiOutlinedInput-root fieldset": {
              border: "none",
            },
          }}
          InputProps={{ disableUnderline: true }}
          value={params.value as string}
          onChange={(e) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: e.target.value,
            })
          }
        />
      ),
    },
    {
      field: "mobileNumber",
      editable: true,
      headerName: "Mobile No:",
      width: 135,
      disableColumnMenu: true,
      sortable: false,
      type: "string",
      renderEditCell: (params: GridRenderCellParams<any, string>) => (
        <TextField
          size="small"
          value={params.value as string}
          onChange={(e) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: e.target.value,
            })
          }
          InputProps={{
            sx: {
              border:
                numbervalidateError || mobileNumberIsEmpty
                  ? "1px solid rgba(211, 47, 47, 1)"
                  : "1px solid rgba(33, 150, 243, 1)",
              borderRadius: "0",
            },
          }}
          sx={{
            "& .MuiFormHelperText-root": {
              fontSize: 10,
              marginLeft: "0px",
            },
            marginTop: numbervalidateError ? "37px" : "0px",
            "& .MuiOutlinedInput-root fieldset": {
              border: "none",
            },
          }}
          error={numbervalidateError}
          helperText={
            numbervalidateError ? "Please enter a valid phone number" : null
          }
        />
      ),
    },
    {
      field: "dateofbirth",
      headerName: "Date of Birth",
      headerAlign: "left",
      align: "left",
      type: "date",
      valueFormatter: (params) => {
        const date = dayjs(new Date(params.value));
        return date.format("ddd MMM DD YYYY");
      },
      sortable: true,
      editable: true,
      width: 205,
      renderEditCell: (
        params: GridRenderCellParams<any, dayjs.Dayjs | null>
      ) => {
        const dateValue = params.value ? dayjs(params.value) : null;
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              sx={{ paddingTop: "0px" }}
            >
              <DatePicker
                value={dateValue}
                defaultValue={dayjs()}
                onChange={(newValue) => {
                  params.api.setEditCellValue({
                    id: params.id,
                    field: params.field,
                    value: newValue,
                  });
                  params.api.setEditCellValue({
                    id: params.id,
                    field: "age",
                    value: calculateAge(newValue),
                  });
                }}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: {
                      border: birthdayIsEmpty
                        ? "1px solid rgba(211, 47, 47, 1)"
                        : "1px solid rgba(33, 150, 243, 1)",
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      "& .MuiOutlinedInput-root fieldset": {
                        border: "none",
                      },
                    },
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        );
      },
    },
    {
      field: "age",
      headerName: "Age",
      width: 97,
      disableColumnMenu: true,
      sortable: false,
      type: "number",
      headerAlign: "left",
      align: "left",
      editable: true,
      renderEditCell: (params: GridRenderCellParams<any, string>) => (
        <TextField
          size="small"
          value={params.value as string}
          error={agevalidateError}
          helperText={
            agevalidateError
              ? "Individual is below the minimum age allowed"
              : null
          }
          InputProps={{
            sx: {
              border: agevalidateError
                ? "1px solid rgba(211, 47, 47, 1)"
                : "1px solid rgba(33, 150, 243, 1)",
              borderRadius: "0",
            },
          }}
          sx={{
            "& .MuiFormHelperText-root": {
              fontSize: 9,
              marginLeft: "0px",
              width: "100%",
            },
            marginTop: agevalidateError ? "35px" : "0px",
            "& .MuiOutlinedInput-root fieldset": {
              border: "none",
            },
          }}
        />
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 195,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        const editingRow = rows.find((row) => row.id === id);
        const isEditModeNew = editingRow?.isNew;

        if (isInEditMode) {
          if (isEditModeNew) {
            return [
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <GridActionsCellItem
                  icon={
                    <StyledButton variant="outlined" size="small">
                      ADD
                    </StyledButton>
                  }
                  label="Add"
                  sx={{
                    color: "primary.main",
                    width: "auto",
                  }}
                  onClick={handleSaveClick(id)}
                />
                <GridActionsCellItem
                  icon={
                    <StyledButton variant="outlined" size="small" color="error">
                      DSCARD CHANGES
                    </StyledButton>
                  }
                  label="DSCARD CHANGES"
                  className="textPrimary"
                  onClick={handleDiscardChangesClick(id)}
                  color="inherit"
                />
              </Box>,
            ];
          }
          return [
            <GridActionsCellItem
              icon={
                <StyledButton variant="outlined" size="small">
                  update
                </StyledButton>
              }
              label="Update"
              onClick={handleUpdateClick(id)}
              color="inherit"
              sx={{ padding: "16px" }}
            />,
            <GridActionsCellItem
              icon={
                <StyledButton variant="outlined" size="small" color="error">
                  Cancel
                </StyledButton>
              }
              label="Cancel"
              onClick={handleDiscardChangesClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={
              <StyledButton variant="outlined" size="small">
                Edit
              </StyledButton>
            }
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <StyledButton variant="outlined" size="small" color="error">
                Remove
              </StyledButton>
            }
            label="Remove"
            onClick={handleRemoveButtonclick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <div style={{ height: "auto", width: "100%" }}>
        <StyledDataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick={true}
          editMode="row"
          getRowHeight={() => "auto"}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </div>

      <OneButtonDialog
        title="Mandatory fields missing"
        buttonText="KEEP EDITING"
        isOpen={keepEditingIsOpen}
        setOpen={setKeepEditingIsOpen}
      />

      <OneButtonDialog
        title="Saved successfully"
        buttonText="OK"
        isOpen={saveedSuccessIsOpen}
        setOpen={setSavedSuccessIsOpen}
      />

      <TwoButtonDialog
        title="Discard changes?"
        buttonText1="DISMISS"
        buttonText2="COnfirm"
        isOpen={discrdChangesIsOpen}
        handleClickFirstButton={() => setDiscardChangesIsOpen(false)}
        handleClickSecondButton={handleCancelClick(currentid as GridRowId)}
      />

      <OneButtonDialog
        title="Student details updated successfully"
        buttonText="OK"
        isOpen={updatesuccessIsOpen}
        setOpen={setupdatesuccessIsOpen}
      />

      <TwoButtonDialog
        title="Are you sure you want to remove this student?"
        buttonText1="DISMISS"
        buttonText2="COnfirm"
        isOpen={removeConfirmIsOpen}
        handleClickFirstButton={() => setremoveConfirmIsOpen(false)}
        handleClickSecondButton={handleRemoveClick(currentid as GridRowId)}
      />

      <OneButtonDialog
        title="The student removed successfully"
        buttonText="OK"
        isOpen={removeSuccesIsOpen}
        setOpen={setremoveSuccesIsOpen}
      />
    </>
  );
}
