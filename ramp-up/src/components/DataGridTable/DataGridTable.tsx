import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateStudent } from "../../redux/slice/studentSlice";
import {
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRenderCellParams,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { ageCalculator, validatePhoneNumber } from "../../utility";
import SingleButtonPopupMessage from "../SingleButtonPopupMessage/SingleButtonPopupMessage";
import DoubleButtonPopupMessage from "../DoubleButtonPopupMessage/DoubleButtonPopupMessage";

let idValue = 0;

const uniqueIdGenerator = () => {
  idValue += 1;
  return idValue;
};

const idReducer = () => {
  idValue -= 1;
};

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  idValue = useSelector((state: RootState) => state.student.students).reduce(
    (maxId, obj) => Math.max(maxId, obj.id),
    0
  );
  const currentRows = useSelector((state: RootState) => state.student.students);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 400px)");
  const { setRowModesModel } = props;

  const handleClick = () => {
    const id = uniqueIdGenerator();
    dispatch(
      updateStudent([
        {
          id,
          name: "",
          gender: "",
          address: "",
          mobileno: "",
          dateofbirth: dayjs(new Date()),
          age: "",
          isNew: true,
        },
        ...currentRows,
      ])
    );
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Typography
        padding="12px"
        sx={{ fontSize: "24px", fontWeight: 400, fontFamily: "Roboto" }}
      >
        User Profile
      </Typography>

      <Grid
        container={isMobile ? false : true}
        justifyContent="flex-end"
        alignItems="flex-end"
        padding="12px"
      >
        <Grid item>
          <Button
            color="primary"
            size="small"
            variant="contained"
            onClick={handleClick}
          >
            Add New
          </Button>
        </Grid>
      </Grid>
    </GridToolbarContainer>
  );
}

const DataGridTable = () => {
  const initialRows: GridRowsProp = useSelector(
    (state: RootState) => state.student.students
  );
  const dispatch = useDispatch();
  const [numbervalidateError, setNumberValidateError] = useState(false);
  const [agevalidateError, setAgeValidateError] = useState(false);
  const [keepEditingPopup, setKeepEditingPopup] = useState(false);
  const [addedSuccessfullyPopup, setAddedSuccessfullyPopup] = useState(false);
  const [unableToAddPopup, setUnableToAdd] = useState(false);
  const [discardChangesPopup, setDiscardChangesPopup] = useState(false);
  const [isConfirmingDiscardChanges, setIsConfirmingDiscardChanges] =
    useState(false);
  const [currentRowId, setCurrentRowId] = useState<GridRowId | null>(null);

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
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
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    dispatch(updateStudent(initialRows.filter((row) => row.id !== id)));
    idReducer();
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setDiscardChangesPopup(true);
    setCurrentRowId(id);
  };
  const handleConfirmClick = (id: GridRowId) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = initialRows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      dispatch(updateStudent(initialRows.filter((row) => row.id !== id)));
    }
    idReducer();
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    const isPhoneNumberValid = validatePhoneNumber(newRow.mobileno);
    const isAgeValid = newRow.age > 18;

    if (newRow.name === "" || newRow.gender === "" || newRow.address === "") {
      initialRows.map((row) =>
        row.id === newRow.id ? setKeepEditingPopup(true) : row
      );
      return {};
    }
    if (!isPhoneNumberValid && !isAgeValid) {
      setNumberValidateError(true);
      setAgeValidateError(true);
      return {};
    }
    if (!isPhoneNumberValid) {
      setNumberValidateError(true);
      return {};
    }
    if (!isAgeValid) {
      setAgeValidateError(true);
      return {};
    }
    try {
      dispatch(
        updateStudent(
          initialRows.map((row) => (row.id === newRow.id ? updatedRow : row))
        )
      );
      setAddedSuccessfullyPopup(true);
    } catch (error) {
      setUnableToAdd(true);
      console.error(error);
      return {};
    }
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const columns: GridColDef[] = [
    {
      field: "id",
      type: "number",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      width: 80,
      sortable: false,
      valueFormatter: (params) => {
        const id = Number(params.value);
        const formattedId = id.toString().padStart(2, "0");
        return formattedId;
      },
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      width: 100,
      sortable: true,
      editable: true,

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
          sx={{
            boxShadow: "0px 3px 1px -2px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(33, 150, 243, 1)",
            borderRadius: "5px",
          }}
        />
      ),
    },
    {
      field: "gender",
      headerName: "Gender",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      type: "singleSelect",
      valueOptions: ["male", "Female", "Other"],
      width: 120,
      sortable: false,
      editable: true,
      renderEditCell: (params: GridRenderCellParams<any, string>) => (
        <Select
          size="small"
          fullWidth
          value={params.value as string}
          onChange={(e) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: e.target.value,
            })
          }
          sx={{
            boxShadow: "0px 3px 1px -2px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(33, 150, 243, 1)",
            borderRadius: "5px",
          }}
        >
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      ),
    },
    {
      field: "address",
      headerName: "Address",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      width: 150,
      sortable: false,
      editable: true,
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
          sx={{
            boxShadow: "0px 3px 1px -2px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(33, 150, 243, 1)",
            borderRadius: "5px",
          }}
        />
      ),
    },
    {
      field: "mobileno",
      headerName: "Mobile No:",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      sortable: false,
      width: 150,
      editable: true,
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
              boxShadow: "0px 3px 1px -2px rgba(0, 0, 0, 0.2)",
              border: numbervalidateError
                ? ""
                : "1px solid rgba(33, 150, 243, 1)", // Adjust the border as needed
            },
          }}
          sx={{
            "& .MuiFormHelperText-root": {
              fontSize: 10,
              marginLeft: "0px",
            },
            marginTop: numbervalidateError ? "35px" : "0px",
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
      headerClassName: "super-app-theme--header",
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
                onChange={(newValue) => {
                  params.api.setEditCellValue({
                    id: params.id,
                    field: params.field,
                    value: newValue,
                  });
                  params.api.setEditCellValue({
                    id: params.id,
                    field: "age",
                    value: ageCalculator(newValue),
                  });
                }}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: {
                      boxShadow: "0px 3px 1px -2px rgba(0, 0, 0, 0.2)",
                      border: "1px solid rgba(33, 150, 243, 1)",
                      borderRadius: "5px",
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center",
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
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      type: "number",
      editable: true,
      sortable: false,
      width: 100,
      renderEditCell: (params: GridRenderCellParams<any, string>) => (
        <TextField
          size="small"
          value={params.value as string}
          error={agevalidateError}
          helperText={
            agevalidateError
              ? "individual is below the minimum age allowed"
              : null
          }
          InputProps={{
            sx: {
              boxShadow: "0px 3px 1px -2px rgba(0, 0, 0, 0.2)",
              border: numbervalidateError
                ? ""
                : "1px solid rgba(33, 150, 243, 1)", // Adjust the border as needed
            },
          }}
          sx={{
            "& .MuiFormHelperText-root": {
              fontSize: 9,
              marginLeft: "0px",
              width: "100%",
            },
            marginTop: agevalidateError ? "35px" : "0px",
          }}
        />
      ),
    },

    {
      field: "actions",
      type: "actions",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",

      headerName: "Actions",
      width: 215,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <Stack direction="column" spacing={1} paddingY="10px">
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={handleSaveClick(id)}
                sx={{ width: "30px", fontSize: "13px", fontWeight: 500 }}
              >
                Add
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={handleCancelClick(id)}
                sx={{
                  width: "150px",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                Discard Changes
              </Button>
            </Stack>,
          ];
        }

        return [
          <Stack direction="row" spacing={3}>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={handleEditClick(id)}
              sx={{ fontSize: "13px", fontWeight: 500 }}
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={handleDeleteClick(id)}
              sx={{ fontSize: "13px", fontWeight: 500 }}
            >
              Remove
            </Button>
          </Stack>,
        ];
      },
    },
  ];

  return (
    <>
      <Container>
        <Paper
          sx={{
            height: "auto",
            width: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "rgba(33, 150, 243, 0.08)",
            },
          }}
        >
          <DataGrid
            rows={initialRows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            getRowHeight={() => "auto"}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setRowModesModel },
            }}
            sx={{
              root: {
                "& .MuiDataGrid-row.Mui-selected": {
                  boxShadow: "none",
                },
              },
            }}
          />
        </Paper>
      </Container>
      {keepEditingPopup && (
        <SingleButtonPopupMessage
          open={keepEditingPopup}
          title={"Mandatory fields are missing."}
          handleClick={() => setKeepEditingPopup(false)}
          buttonName="Keep Editing"
        />
      )}
      {addedSuccessfullyPopup && (
        <SingleButtonPopupMessage
          open={addedSuccessfullyPopup}
          title={"A new student added successfully."}
          handleClick={() => setAddedSuccessfullyPopup(false)}
          buttonName="Ok"
        />
      )}
      {unableToAddPopup && (
        <SingleButtonPopupMessage
          open={unableToAddPopup}
          title={"Unable to add a new student.Please try again later"}
          handleClick={() => setUnableToAdd(false)}
          buttonName="Try again"
        />
      )}
      {discardChangesPopup && (
        <DoubleButtonPopupMessage
          open={discardChangesPopup}
          title={"Discard changes?"}
          handleClickFirstButton={() => setDiscardChangesPopup(false)}
          handleClickSecondButton={() => {
            handleConfirmClick(currentRowId as GridRowId);
            setDiscardChangesPopup(false);
          }}
          firstButtonName="Dismiss"
          secondButtonName="Confirm"
        />
      )}
    </>
  );
};

export default DataGridTable;
