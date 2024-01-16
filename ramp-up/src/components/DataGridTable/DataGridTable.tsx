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
import { formatPhoneNumber } from "../../utility/formatPhoneNumber";
import { ageCalculator } from "../../utility/ageCalculator";
import { validatePhoneNumber } from "../../utility/validatePhoneNumber";
import SingleButtonPopupMessage from "../SingleButtonPopupMessage/SingleButtonPopupMessage";
import DoubleButtonPopupMessage from "../DoubleButtonPopupMessage/DoubleButtonPopupMessage";
import { dataGridStyles } from "../../styles/dataGridStyles";

let idValue = 0;

const uniqueIdGenerator = () => {
  idValue += 1;
  return idValue;
};

const idReducer = () => {
  idValue -= 1;
};

interface IEditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: IEditToolbarProps) {
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
        User Details
      </Typography>

      <Grid
        container={isMobile ? false : true}
        justifyContent="flex-end"
        alignItems="flex-end"
        padding="12px"
      >
        <Grid item>
          <Button
            size="small"
            variant="contained"
            onClick={handleClick}
            sx={{ backgroundColor: "rgba(33, 150, 243, 1)" }}
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
  const [editedSuccessfullyPopup, setEditedSuccessfullyPopup] = useState(false);
  const [unableToAddPopup, setUnableToAdd] = useState(false);
  const [unableToEditPopup, setUnableToEdit] = useState(false);
  const [discardChangesPopup, setDiscardChangesPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
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
    setDeletePopup(true);
    setCurrentRowId(id);
  };

  const handleConfirmDeleteClick = (id: GridRowId) => {
    dispatch(updateStudent(initialRows.filter((row) => row.id !== id)));
    idReducer();
  };

  const handleDiscardClick = (id: GridRowId) => () => {
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
      setKeepEditingPopup(true);

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
      setAgeValidateError(false);
      setNumberValidateError(false);
      if (newRow!.isNew) {
        setAddedSuccessfullyPopup(true);
      } else {
        setEditedSuccessfullyPopup(true);
      }
    } catch (error) {
      if (newRow!.isNew) {
        setUnableToAdd(true);
      } else {
        setUnableToEdit(true);
      }
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
      headerAlign: "left",
      align: "left",
      width: 60,
      disableColumnMenu: true,
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
      headerAlign: "left",
      align: "left",
      width: 100,
      sortable: true,
      editable: true,
      disableColumnMenu: true,

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
          sx={dataGridStyles.textFieldStyles}
        />
      ),
    },
    {
      field: "gender",
      headerName: "Gender",
      headerAlign: "left",
      align: "left",
      type: "singleSelect",
      valueOptions: ["male", "Female", "Other"],
      width: 120,
      sortable: false,
      disableColumnMenu: true,
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
          sx={dataGridStyles.genderFieldStyles}
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
      headerAlign: "left",
      align: "left",
      width: 150,
      sortable: false,
      disableColumnMenu: true,
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
          sx={dataGridStyles.textFieldStyles}
        />
      ),
    },
    {
      field: "mobileno",
      headerName: "Mobile No:",
      headerAlign: "left",
      align: "left",
      sortable: false,
      disableColumnMenu: true,
      width: 150,
      editable: true,
      valueFormatter: (params) => {
        return formatPhoneNumber(params.value);
      },
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
            },
          }}
          sx={{
            ...dataGridStyles.mobileFieldStyles,
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
              border: numbervalidateError
                ? ""
                : "1px solid rgba(33, 150, 243, 1)",
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
      headerAlign: "left",
      align: "left",
      type: "date",
      valueFormatter: (params) => {
        const date = dayjs(new Date(params.value));
        return date.format("ddd MMM DD YYYY");
      },
      sortable: true,
      disableColumnMenu: true,
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
                disableFuture
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
                    sx: dataGridStyles.birthdayFieldStyles,
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
      headerAlign: "left",
      align: "left",
      type: "number",
      editable: true,
      disableColumnMenu: true,
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
            },
          }}
          sx={{
            ...dataGridStyles.ageFieldStyles,
            "& .MuiOutlinedInput-root": {
              border: numbervalidateError
                ? ""
                : "1px solid rgba(33, 150, 243, 1)",
              borderRadius: 0,
            },
            marginTop: agevalidateError ? "33px" : "0px",
          }}
        />
      ),
    },

    {
      field: "actions",
      type: "actions",
      headerAlign: "left",
      align: "left",
      headerName: "Action",
      width: 215,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        const editedRow = initialRows.find((row) => row.id === id);

        if (isInEditMode) {
          if (editedRow!.isNew) {
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
                  onClick={handleDiscardClick(id)}
                  sx={{
                    width: "145px",
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
            <Stack direction="row" spacing={1} paddingY="10px">
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={handleSaveClick(id)}
                sx={{ fontSize: "13px", fontWeight: 500 }}
              >
                Update
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={handleDiscardClick(id)}
                sx={{
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                Cancel
              </Button>
            </Stack>,
          ];
        }

        return [
          <Stack direction="row" spacing={1}>
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
            sx={dataGridStyles.gridStyles}
            initialState={{
              pagination: {
                paginationModel: {
                  page: 0,
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10, 25, 50]}
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
      {editedSuccessfullyPopup && (
        <SingleButtonPopupMessage
          open={editedSuccessfullyPopup}
          title={"Student detailes updated successfully."}
          handleClick={() => setEditedSuccessfullyPopup(false)}
          buttonName="Ok"
        />
      )}
      {unableToEditPopup && (
        <SingleButtonPopupMessage
          open={unableToEditPopup}
          title={"Cannot update student details.Please try again later"}
          handleClick={() => setUnableToEdit(false)}
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
      {deletePopup && (
        <DoubleButtonPopupMessage
          open={deletePopup}
          title={"Are you sure you want to remove this student?"}
          handleClickFirstButton={() => setDeletePopup(false)}
          handleClickSecondButton={() => {
            handleConfirmDeleteClick(currentRowId as GridRowId);
            setDeletePopup(false);
          }}
          firstButtonName="Dismiss"
          secondButtonName="Confirm"
        />
      )}
    </>
  );
};

export default DataGridTable;
