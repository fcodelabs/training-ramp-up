import * as React from "react";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridRowSpacingParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import styled from "styled-components";
import "@fontsource/roboto";
import { Box, TextField, MenuItem, Select } from "@mui/material";
import Typography from "@mui/material/Typography";
import generateId from "../../../utility/generateId";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import validatePhoneNumber from "../../../utility/validatePhoneNumber";
import calculateAge from "../../../utility/calculateAge";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import MessageCard from "../Cards/MessageCard";
import { addStudent, removeStudent } from "../../../redux/student/slice";

const StyledEditButton = styled(Button)`
  &&& {
    border-color: #2196f380;
    color: #2196f3;
    font-family: Roboto;
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: 0.46px;
  }
`;

const StyledRemoveButton = styled(Button)`
  &&& {
    border-color: #d32f2f80;
    color: #d32f2f;
    margin-left: 30px;
    font-family: Roboto;
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: 0.46px;
  }
`;

const StyledAddButton = styled(Button)`
  &&& {
    border-color: #2196f380;
    color: #2196f3;
    font-family: Roboto;
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: 0.46px;
  }
`;

const StyledDiscardButton = styled(Button)`
  &&& {
    border-color: #d32f2f80;
    color: #d32f2f;
    font-family: Roboto;
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: 0.46px;
  }
`;

const StyledGridTitle = styled(Typography)`
  &&& {
    display: flex;
    font-family: Roboto;
    font-weight: 400;
    font-size: 24px;
    line-height: 32.02px;
    color: #000000de;
    align-items: flex-start;

    padding: 16px;
  }
`;

const StyledButtonBox = styled(Box)`
  &&& {
    display: flex;
    justify-content: flex-end;
    padding: 16px;
  }
`;

const StyledAddNewButton = styled(Button)`
  &&& {
    background-color: #2196f3;
    color: #ffffff;
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.4px;
  }
`;

const StyledDataTableBox = styled(Box)`
  &&& {
    width: 100%;
    height: auto;
    margin-left: 175px;
    margin-right: 175px;
    border-radius: 4px;
    background: #ffffff;
    box-shadow: 0px 2px 1px -1px #00000033, 0px 1px 1px 0px #00000024,
      0px 1px 3px 0px #0000001f;

    fontfamily: "Roboto";
    fontweight: 400;
    fontsize: 14px;
    lineheight: 20.02px;
    letterspacing: 0.17px;
    .action-buttons {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
    .action-edit-buttons {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 8px;
    }
  }
`;
interface IStudent {
  id: number;
  name: string;
  age: number;
  gender: string;
  address: string;
  mobile: string;
  dob: Date;
  isNew?: boolean;
}

interface IEditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: IEditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = generateId();
    // Add the new row only once
    setRows((oldRows) => [
      { id, name: "", address: "", mobile: "", isNew: true },
      ...oldRows,
    ]);
    // Set the mode for the new row
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <StyledButtonBox>
      <StyledAddNewButton variant="contained" onClick={handleClick}>
        ADD NEW
      </StyledAddNewButton>
    </StyledButtonBox>
  );
}

export default function DataTable() {
  const [rows, setRows] = useState(
    useSelector((state: RootState) => state.student.students)
  );

  const dispatch = useDispatch();

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const [mode, setMode] = useState<"Add" | "Edit">("Add"); // Track the mode (Add or Edit)

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showDiscardUpdateModal, setShowDiscardUpdateModal] = useState(false);
  const [showRemoveConfirmModal, setShowRemoveConfirmModal] = useState(false);
  const [fieldMissingModal, setFieldMissingModal] = useState(false);
  const [showRemoveSuccessCard, setShowRemoveSuccessCard] = useState(false);
  const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false);
  const [updatedRowId, setUpdatedRowId] = useState<GridRowId | null>(null);
  const [editingRowId, setEditingRowId] = useState<GridRowId | null>(null);

  const [attemptedToAdd, setAttemptedToAdd] = useState(false);

  const [selectedRowId, setSelectedRowId] = useState<GridRowId | null>(null);

  const [editedFields, setEditedFields] = useState({
    name: "",
    gender: "",
    address: "",
    mobile: "",
    dob: dayjs(new Date()), // Assuming dob is a date
  });

  const handleConfirmRemove = (id: GridRowId | null) => {
    if (id) {
      setRows(rows.filter((row) => row.id !== id));
      setShowRemoveConfirmModal(false);
      setSelectedRowId(null);
      // Show the RemoveSuccessCard
      setShowRemoveSuccessCard(true);
    }
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    const editedRow = rows.find((row) => row.id === id);

    if (editedRow) {
      setEditedFields({
        name: editedRow.name,
        gender: editedRow.gender,
        address: editedRow.address,
        mobile: editedRow.mobile,
        dob: dayjs(editedRow.dob),
      });
    }

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    setMode("Edit");
    setEditingRowId(id);
  };

  const handleAddClick = (id: GridRowId) => () => {
    // Set attemptedToAdd to true to trigger error state on empty fields
    setAttemptedToAdd(true);

    // Validate all fields before adding a new row
    if (
      !editedFields.name.trim() ||
      !editedFields.gender.trim() ||
      !editedFields.address.trim() ||
      !editedFields.mobile.trim() ||
      dayjs(editedFields.dob).isSame(dayjs(new Date()), "day") ||
      !(ageValues[id] !== undefined && (ageValues[id], 10) < 18)
    ) {
      // Display an error message or take any other appropriate action
      setFieldMissingModal(true);
      console.log("hello 3-1, agevalue", ageValues[id]);
      console.log("hello 3, editedFields", editedFields);
      return;
    }
    console.log(dayjs(new Date()));
    console.log("hello 4, editedFields", editedFields);

    // If all fields are not empty, proceed with adding the row
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    setMode("Add");
    setShowSuccessModal(true);
    setAttemptedToAdd(false); // Reset attemptedToAdd after adding
    dispatch(
      addStudent({
        id: generateId(),
        name: editedFields.name,
        gender: editedFields.gender,
        address: editedFields.address,
        mobile: editedFields.mobile,
        dob: editedFields.dob.toISOString(),
        age: ageValues[id],
      })
    );

    setEditedFields({
      name: "",
      gender: "",
      address: "",
      mobile: "",
      dob: dayjs(new Date()), // Assuming dob is a date
    });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    // Set attemptedToAdd to true to trigger error state on empty fields
    setAttemptedToAdd(true);

    // Validate all fields before updating the row
    if (
      !editedFields.name.trim() ||
      !editedFields.gender.trim() ||
      !editedFields.address.trim() ||
      !editedFields.mobile.trim() ||
      dayjs(editedFields.dob).isSame(dayjs(new Date()), "day") ||
      !(ageValues[id] !== undefined && (ageValues[id], 10) < 18)
    ) {
      // Display an error message or take any other appropriate action
      console.log("hello 3, editedFields", editedFields);
      setFieldMissingModal(true);
      return;
    }

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    setMode("Add");
    setShowUpdateSuccessModal(true);
    setUpdatedRowId(id);
    setAttemptedToAdd(false); // Reset attemptedToAdd after updating
    console.log("editedFields", editedFields);
    setEditedFields({
      name: "",
      gender: "",
      address: "",
      mobile: "",
      dob: dayjs(new Date()), // Assuming dob is a date
    });
    dispatch(
      addStudent({
        id: generateId(),
        name: editedFields.name,
        gender: editedFields.gender,
        address: editedFields.address,
        mobile: editedFields.mobile,
        dob: editedFields.dob.toISOString(),
        age: ageValues[id],
      })
    );
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setSelectedRowId(id);
    setShowRemoveConfirmModal(true);
    dispatch(removeStudent(selectedRowId));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    // Check if there are changes in the row
    const isRowModified = Object.keys(rowModesModel).some(
      (key) => key === id.toString()
    );

    if (isRowModified) {
      // If changes exist, show the discard changes modal
      setShowDiscardModal(true);
    } else {
      // If no changes, proceed with canceling
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });

      const editedRow = rows.find((row) => row.id === id);
      if (editedRow!.isNew) {
        setRows(rows.filter((row) => row.id !== id));
      }
      setMode("Add");
    }
  };

  const handleCancelUpdateClick = (id: GridRowId) => () => {
    // Check if there are changes in the row
    const isRowModified = Object.keys(rowModesModel).some(
      (key) => key === id.toString()
    );

    if (isRowModified) {
      // If changes exist, show the discard changes modal
      setShowDiscardUpdateModal(true);
    } else {
      // If no changes, proceed with canceling
      cancelEdit(id);
    }
  };

  const cancelEdit = (id: GridRowId) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
    setMode("Add");
    setEditingRowId(null);
  };

  const handleConfirmDiscardUpdate = () => {
    if (editingRowId !== null) {
      // Revert changes made during editing process
      setRowModesModel({
        ...rowModesModel,
        [editingRowId]: { mode: GridRowModes.View, ignoreModifications: true },
      });

      // Find the original row data
      const originalRow = rows.find(
        (row) => row.id === parseInt(editingRowId.toString())
      );

      if (originalRow) {
        // Update the row with the original data
        setRows((oldRows) =>
          oldRows.map((row) =>
            row.id === parseInt(editingRowId.toString())
              ? { ...row, ...originalRow }
              : row
          )
        );
      }

      // Reset the state and close the modal
      setMode("Add");
      setEditingRowId(null);
      setShowDiscardUpdateModal(false);
    }
  };

  const handleConfirmDiscardChanges = () => {
    // User confirmed discarding changes, remove the editing row
    const tempeditingRowId = Object.keys(rowModesModel)[0];
    console.log("hello 1");
    console.log("tempeditingRowId", typeof tempeditingRowId);
    console.log("editingRowId", typeof editingRowId);

    if (editingRowId?.toString() === tempeditingRowId) {
      setMode("Add");
      console.log("mode", mode);
      handleConfirmDiscardUpdate();
    } else {
      // Handle discarding changes for non-editing rows
      // You may customize this part according to your requirements
      // ...

      // Reset the state and close the modal
      console.log("hello 2");
      setMode("Add");
      console.log(" hello 4, mode", mode);
      setRowModesModel({});
      setShowDiscardUpdateModal(false);
    }
  };

  const handleDismissDiscardChanges = () => {
    // User dismissed discarding changes, close the modal
    setShowDiscardUpdateModal(false);
    setEditingRowId(null);
  };

  const handleConfirmDiscard = () => {
    // User confirmed discarding changes, remove the editing row
    const editingRowId = Object.keys(rowModesModel)[0];
    setRows(rows.filter((row) => row.id !== parseInt(editingRowId)));
    setRowModesModel({});
    setShowDiscardModal(false);
    setMode("Add");
  };

  const handleDismissDiscard = () => {
    // User dismissed discarding changes, close the modal
    setShowDiscardModal(false);
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const { isNew, ...updatedRow } = newRow as IStudent;
    setRows((oldRows) =>
      oldRows.map((row) =>
        row.id === newRow.id ? { ...row, ...updatedRow } : row
      )
    );
    return { ...updatedRow, isNew: false } as IStudent;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const [ageValues, setAgeValues] = React.useState<{
    [key: string]: number | null;
  }>({});

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 86,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      headerClassName: "custom-header",
    },
    {
      field: "name",
      headerName: "Name",
      type: "string",
      width: 135,
      sortable: true,
      disableColumnMenu: true,
      headerClassName: "custom-header",
      editable: true,
      renderEditCell(params: GridRenderCellParams<any, string>) {
        const isNameEmpty =
          params.value === undefined ||
          params.value === null ||
          params.value.trim() === "";
        console.log("isNameEmpty", isNameEmpty);

        return (
          <TextField
            size="small"
            value={
              editedFields.name === ""
                ? (params.value as string)
                : editedFields.name
            }
            onChange={(event) => {
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: event.target.value,
              });
              setEditedFields((prevFields) => ({
                ...prevFields,
                name: event.target.value,
              }));
            }}
            error={isNameEmpty && attemptedToAdd}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2196F3",
                borderRadius: 0,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2196F3",
              },
            }}
          />
        );
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      type: "singleSelect",
      valueOptions: ["Male", "Female", "Other"],
      width: 135,
      sortable: false,
      disableColumnMenu: true,
      headerClassName: "custom-header",
      editable: true,
      renderEditCell: (params: GridRenderCellParams<any, string>) => {
        const isGenderEmpty = !params.value;

        return (
          <Select
            size="small"
            fullWidth
            value={
              editedFields.gender === ""
                ? (params.value as string)
                : editedFields.gender
            }
            onChange={(e) => {
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: e.target.value,
              });
              setEditedFields((prevFields) => ({
                ...prevFields,
                gender: e.target.value,
              }));
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2196F3",
                borderRadius: 0,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2196F3",
              },
            }}
            error={isGenderEmpty && attemptedToAdd}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
        );
      },
    },

    {
      field: "address",
      headerName: "Address",
      width: 135,
      sortable: false,
      disableColumnMenu: true,
      headerClassName: "custom-header",
      editable: true,
      renderEditCell(params: GridRenderCellParams<any, string>) {
        const isAddressEmpty = !params.value;
        return (
          <TextField
            size="small"
            value={
              editedFields.address === ""
                ? (params.value as string)
                : editedFields.address
            }
            required={true}
            onChange={(event) => {
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: event.target.value,
              });
              setEditedFields((prevFields) => ({
                ...prevFields,
                address: event.target.value,
              }));
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2196F3",
                borderRadius: 0,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2196F3",
              },
            }}
            error={isAddressEmpty && attemptedToAdd}
          />
        );
      },
    },
    {
      field: "mobile",
      headerName: "Mobile No:",
      width: 135,
      sortable: false,
      disableColumnMenu: true,
      headerClassName: "custom-header",
      editable: true,
      valueFormatter(params) {
        return params.value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      },
      renderEditCell(params: GridRenderCellParams<any, string>) {
        const isMobileEmpty = !params.value;
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = event.target.value;
          console.log("newValue", newValue);
          // Check if the entered phone number is valid
          const isValidPhoneNumber = validatePhoneNumber(newValue);

          // Update the cell value if the phone number is valid
          if (isValidPhoneNumber || newValue === "") {
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: newValue,
            });
            setEditedFields((prevFields) => ({
              ...prevFields,
              mobile: event.target.value,
            }));
          }
        };

        return (
          <>
            <TextField
              size="small"
              value={
                editedFields.mobile === ""
                  ? (params.value as string)
                  : editedFields.mobile
              }
              onChange={handleChange}
              error={
                !validatePhoneNumber(params.value as string) && attemptedToAdd
              }
              helperText={
                !validatePhoneNumber(params.value as string) && attemptedToAdd
                  ? "Please enter a valid phone number"
                  : ""
              }
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2196F3",
                  borderRadius: 0,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2196F3",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: 9,
                  width: "auto",
                  height: "auto",
                  letterSpacing: "0.25px",
                  marginLeft: "0px",
                  marginTop: "0px",
                  whiteSpace: "balance",
                },
                marginTop:
                  !validatePhoneNumber(params.value as string) && attemptedToAdd
                    ? "30px"
                    : "0px",
              }}
            />
          </>
        );
      },
    },
    {
      field: "dob",
      headerName: "Date of Birth",
      type: "date",
      width: 205,
      sortable: true,
      disableColumnMenu: true,
      headerClassName: "custom-header",
      editable: true,
      valueFormatter: (params) => {
        const date = dayjs(new Date(params.value));
        return date.format("ddd MMM DD YYYY");
      },

      renderEditCell: (
        params: GridRenderCellParams<any, dayjs.Dayjs | null>
      ) => {
        const isDateEmpty = !params.value;
        const dateValue = params.value ? dayjs(params.value) : null;

        const handleDateChange = (newValue: dayjs.Dayjs | null) => {
          params.api.setEditCellValue({
            id: params.id,
            field: params.field,
            value: newValue,
          });

          // Calculate the age only if newValue is not null
          if (newValue !== null) {
            const newAge = calculateAge(newValue.toDate());
            const rowId = params.id;

            setEditedFields((prevFields) => ({
              ...prevFields,
              dob: newValue,
            }));

            console.log(editedFields.dob);

            setAgeValues((prevAgeValues) => ({
              ...prevAgeValues,
              [rowId]: newAge,
            }));

            // Update the 'age' field
            params.api.setEditCellValue({
              id: params.id,
              field: "age",
              value: newAge,
            });
            console.log(newAge);
          }
        };

        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              sx={{ paddingTop: "0px" }}
            >
              <DatePicker
                value={dateValue}
                onChange={handleDateChange}
                maxDate={dayjs()}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#2196F3",
                        borderRadius: 0,
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#2196F3",
                      },
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    error: isDateEmpty && attemptedToAdd,
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
      width: 101,
      disableColumnMenu: true,
      sortable: false,
      headerClassName: "custom-header",
      editable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => {
        const isAgeEmpty = !params.value;
        const isDateEmpty = !params.value;
        const age =
          ageValues[params.row.id] !== undefined
            ? ageValues[params.row.id]?.toString()
            : "";
        const isBelowMinimumAge = age !== undefined && parseInt(age, 10) < 18;

        if (
          params.row.id in rowModesModel &&
          rowModesModel[params.row.id]?.mode === GridRowModes.Edit
        ) {
          // Render a text field when in edit mode
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                size="small"
                value={age}
                onChange={(event) => {
                  params.api.setEditCellValue({
                    id: params.id,
                    field: params.field,
                    value: event.target.value,
                  });
                  setEditedFields((prevFields) => ({
                    ...prevFields,
                    age: event.target.value,
                  }));
                }}
                error={isBelowMinimumAge || (isDateEmpty && attemptedToAdd)}
                helperText={
                  isBelowMinimumAge
                    ? "Individual is below the minimum age allowed"
                    : ""
                }
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2196F3",
                    borderRadius: 0,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2196F3",
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: 9,
                    width: "100%",
                    letterSpacing: "0.25px",
                    marginLeft: "0px",
                    marginTop: "0px",
                    whiteSpace: "balance",
                  },
                  marginTop: isBelowMinimumAge ? "30px" : "0px",
                }}
              />
            </div>
          );
        } else {
          // Render the age as plain text in view mode
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2">{age}</Typography>
              {isBelowMinimumAge && (
                <Typography variant="caption" color="error">
                  Individual is below the minimum age allowed
                </Typography>
              )}
            </div>
          );
        }
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 195,
      disableColumnMenu: true,
      sortable: false,
      headerClassName: "custom-header",
      type: "actions",
      getActions: ({ id }: { id: GridRowId }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <div>
              {mode === "Add" ? (
                <div className="action-buttons">
                  <StyledAddButton
                    onClick={handleAddClick(id)}
                    size="small"
                    variant="outlined"
                  >
                    ADD
                  </StyledAddButton>
                  <StyledDiscardButton
                    onClick={handleCancelClick(id)}
                    size="small"
                    variant="outlined"
                  >
                    DISCARD CHANGES
                  </StyledDiscardButton>
                </div>
              ) : (
                <div className="action-edit-buttons">
                  <StyledAddButton
                    onClick={handleSaveClick(id)}
                    size="small"
                    variant="outlined"
                  >
                    UPDATE
                  </StyledAddButton>
                  <StyledDiscardButton
                    onClick={handleCancelUpdateClick(id)}
                    size="small"
                    variant="outlined"
                  >
                    CANCEL
                  </StyledDiscardButton>
                </div>
              )}
            </div>,
          ];
        }

        return [
          <div>
            <StyledEditButton
              variant="outlined"
              size="small"
              onClick={handleEditClick(id)}
            >
              EDIT
            </StyledEditButton>
            <StyledRemoveButton
              variant="outlined"
              size="small"
              onClick={handleDeleteClick(id)}
            >
              REMOVE
            </StyledRemoveButton>
          </div>,
        ];
      },
    },
  ];

  return (
    <StyledDataTableBox>
      <StyledGridTitle variant="h4">User Details</StyledGridTitle>

      <DataGrid
        sx={{
          ".MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "&.MuiDataGrid-root": {
            border: "none",
          },

          "& .MuiDataGrid-columnHeaders": {
            fontWeight: 400,
            borderRadius: "var(--none, 0px)",
            borderBottom: "1px solid var(--divider, rgba(0, 0, 0, 0.12))",
            borderLeft:
              "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
            borderRight:
              "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
            borderTop:
              "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
            background: "var(--primary-selected, rgba(33, 150, 243, 0.08))",
            // alignItems: 'space-between !important'
          },
          "& .MuiDataGrid-sortIcon": {
            opacity: "inherit !important",
          },
          "& .MuiDataGrid-iconButtonContainer": {
            visibility: "visible",
          },
          "& .MuiDataGrid-cell": {
            visibility: "visible",
            padding: "1px",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
          ".MuiDataGrid-iconButtonContainer": {
            marginLeft: "50px !important",
          },
          width: "auto",
        }}
        rows={rows}
        columns={columns}
        editMode="row"
        disableRowSelectionOnClick
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{ toolbar: { setRows, setRowModesModel } }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowHeight={(params) =>
          rowModesModel[params.id]?.mode === GridRowModes.Edit ? 100 : 52
        }
      />
      {/* Modal for Adding Success */}
      <Modal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "12px",
          }}
        >
          <MessageCard
            message="A new student added successfully."
            primaryButton={{
              text: "OK",
              onClick: () => setShowSuccessModal(false),
            }}
            primaryOption="OK"
          />
        </Paper>
      </Modal>

      {/* Modal for Discard Changes */}
      {showDiscardModal && (
        <Modal
          open={showDiscardModal}
          onClose={handleDismissDiscard}
          aria-labelledby="discard-modal-title"
          aria-describedby="discard-modal-description"
        >
          <Paper
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "12PX",
            }}
          >
            {/* <DiscardChangesCard
              onConfirm={handleConfirmDiscard}
              onDismiss={handleDismissDiscard}
            /> */}
            <MessageCard
              message="Discard changes?"
              primaryButton={{ text: "DISMISS", onClick: handleDismissDiscard }}
              secondaryButton={{
                text: "CONFIRM",
                onClick: handleConfirmDiscard,
              }}
              primaryOption="DISMISS"
              secondaryOption="CONFIRM"
            />
          </Paper>
        </Modal>
      )}

      {/* Modal for Discard Changes */}
      {showDiscardUpdateModal && (
        <Modal
          open={showDiscardUpdateModal}
          onClose={handleDismissDiscardChanges}
          aria-labelledby="discard-modal-title"
          aria-describedby="discard-modal-description"
        >
          <Paper
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "12PX",
            }}
          >
            {/* <DiscardChangesCard
              onConfirm={handleConfirmDiscardChanges}
              onDismiss={handleDismissDiscardChanges}
            /> */}
            <MessageCard
              message="Discard changes?"
              primaryButton={{
                text: "DISMISS",
                onClick: handleDismissDiscardChanges,
              }}
              secondaryButton={{
                text: "CONFIRM",
                onClick: handleConfirmDiscardChanges,
              }}
              primaryOption="DISMISS"
              secondaryOption="CONFIRM"
            />
          </Paper>
        </Modal>
      )}
      {/* Modal for Confirm Remove */}
      {showRemoveConfirmModal && (
        <Modal
          open={showRemoveConfirmModal}
          onClose={() => {
            setShowRemoveConfirmModal(false);
            setSelectedRowId(null);
          }}
          aria-labelledby="discard-modal-title"
          aria-describedby="discard-modal-description"
        >
          <Paper
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "12PX",
            }}
          >
            {/* <ConfirmRemoveCard
              onConfirm={() => handleConfirmRemove(selectedRowId)}
              onDismiss={() => {
                setShowRemoveConfirmModal(false);
                setSelectedRowId(null);
              }}
            /> */}
            <MessageCard
              message="Are you sure you want to remove this student?"
              primaryButton={{
                text: "DISMISS",
                onClick: () => {
                  setShowRemoveConfirmModal(false);
                  setSelectedRowId(null);
                },
              }}
              secondaryButton={{
                text: "CONFIRM",
                onClick: () => {
                  handleConfirmRemove(selectedRowId);
                },
              }}
              primaryOption="DISMISS"
              secondaryOption="CONFIRM"
            />
          </Paper>
        </Modal>
      )}

      {/* Modal for Remove Success */}
      {showRemoveSuccessCard && (
        <Modal
          open={showRemoveSuccessCard}
          onClose={() => setShowRemoveSuccessCard(false)}
          aria-labelledby="remove-success-modal-title"
          aria-describedby="remove-success-modal-description"
        >
          <Paper
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "12px",
            }}
          >
            {/* <RemoveSuccessCard
              onClose={() => setShowRemoveSuccessCard(false)}
            /> */}
            <MessageCard
              message="The student removed successfully."
              primaryButton={{
                text: "OK",
                onClick: () => setShowRemoveSuccessCard(false),
              }}
              primaryOption="OK"
            />
          </Paper>
        </Modal>
      )}
      {showUpdateSuccessModal && (
        <Modal
          open={showUpdateSuccessModal}
          onClose={() => setShowUpdateSuccessModal(false)}
          aria-labelledby="update-success-modal-title"
          aria-describedby="update-success-modal-description"
        >
          <Paper
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "12px",
            }}
          >
            {/* <UpdateSuccessCard
              onClose={() => setShowUpdateSuccessModal(false)}
            /> */}
            <MessageCard
              message="Student Details updated successfully."
              primaryButton={{
                text: "OK",
                onClick: () => setShowUpdateSuccessModal(false),
              }}
              primaryOption="OK"
            />
          </Paper>
        </Modal>
      )}

      {/* Modal for Field Missing */}
      {fieldMissingModal && (
        <Modal
          open={fieldMissingModal}
          onClose={() => setFieldMissingModal(false)}
          aria-labelledby="field-missing-modal-title"
          aria-describedby="field-missing-modal-description"
        >
          <Paper
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "12px",
            }}
          >
            {/* <FieldMissingCard onClick={() => setFieldMissingModal(false)} /> */}
            <MessageCard
              message="Mandatory fields missing."
              primaryButton={{
                text: "KEEP EDITING",
                onClick: () => setFieldMissingModal(false),
              }}
              primaryOption="KEEP EDITING"
            />
          </Paper>
        </Modal>
      )}
    </StyledDataTableBox>
  );
}