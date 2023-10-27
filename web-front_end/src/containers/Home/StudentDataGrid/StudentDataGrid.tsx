import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowModel,
  GridEventListener,
  GridRowEditStopReasons,
  GridToolbarContainer,
  GridPreProcessEditCellProps,
  GridEditDateCell,
  GridRenderEditCellParams,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { studentActions } from "../../../redux/student/studentSlice";
import {
  validateInputStudent,
  validateNameInput,
  validateAddressInput,
  validateMobileInput,
  maxDateStudent,
  minDateStudent,
} from "../../../util/validationUtilStudent";
import { generateAge } from "../../../util/generateAgeUtil";
import { ERoleTypeEnum } from "../../../enum/roleTypeEnum";

interface IStudentEntry {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobileNumber: string;
  dob: string;
}

const StudentDataGrid = () => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const dispatch = useAppDispatch();
  const studentList = useSelector((state: RootState) => state.studentEntries.studentEntries);
  const currentRoleType = useSelector((state: RootState) => state.userEntries.currentRoleType);

  useEffect(() => {
    dispatch(studentActions.fetchStudent());
  }, [dispatch]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  function EditToolbar() {
    const handleAddNew = () => {
      const newStudent: IStudentEntry = {
        id: -1,
        name: "",
        address: "",
        mobileNumber: "",
        dob: "",
        gender: "",
      };
      dispatch(studentActions.addStudentEntry(newStudent));
      setRowModesModel(oldModel => ({
        [newStudent.id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
        ...oldModel,
      }));
    };

    return (
      <GridToolbarContainer
        sx={{
          backgroundColor: "#ecf0f1",
        }}
      >
        {currentRoleType === ERoleTypeEnum.ADMIN && (
          <Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddNew}
            variant="contained"
            sx={{
              "& .MuiButton-label": {
                textTransform: "none",
              },
              margin: "1em",
            }}
          >
            Add Student
          </Button>
        )}
      </GridToolbarContainer>
    );
  }

  const handleSaveClick = (row: GridRowModel) => () => {
    setRowModesModel({ ...rowModesModel, [row.id]: { mode: GridRowModes.View } });
  };

  const handleEditClick = (row: GridRowModel) => () => {
    setRowModesModel({ ...rowModesModel, [row.id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (row: GridRowModel) => () => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      dispatch(studentActions.deleteStudentEntry(row.id));
    }
  };

  const handleCancelClick = (row: GridRowModel) => () => {
    if (row.name == "" || row.mobileNumber == "" || row.address == "" || row.age == 0) {
      dispatch(studentActions.deleteStudentEntry(row.id));
      return;
    }
    setRowModesModel({
      ...rowModesModel,
      [row.id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    const { id, name, gender, address, mobileNumber, dob } = newRow;

    const validationData = [
      { value: name, type: "name" },
      { value: address, type: "address" },
      { value: mobileNumber, type: "mobileNumber" },
    ];

    for (const data of validationData) {
      const error = validateInputStudent(
        data.value,
        data.type as "name" | "address" | "mobileNumber",
      );
      if (error) {
        alert(error);
        if (data.type === "mobileNumber") {
          console.log(data.value);
        }
        return Promise.resolve();
      }
    }
    const updatedStudent: IStudentEntry = {
      id: id,
      name: name,
      address: address,
      mobileNumber: mobileNumber,
      dob: dob.toISOString(),
      gender: gender,
    };
    dispatch(studentActions.saveAndUpdateStudentEntry(updatedStudent));
    return Promise.resolve({ ...oldRow, ...newRow });
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      editable: false,
      align: "center",
      headerAlign: "center",
      maxWidth: 100,
      minWidth: 60,
      headerClassName: "header-cell",
    },
    {
      field: "name",
      headerName: "Name",
      editable: true,
      align: "center",
      headerAlign: "center",
      maxWidth: 250,
      minWidth: 200,
      headerClassName: "header-cell",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = !validateNameInput(params.props.value);
        return { ...params.props, style: { color: hasError ? "red" : "green" } };
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      align: "center",
      headerAlign: "center",
      maxWidth: 170,
      minWidth: 130,
      editable: true,
      headerClassName: "header-cell",
      type: "singleSelect",
      valueOptions: ["Male", "Female"],
    },
    {
      field: "address",
      headerName: "Address",
      align: "center",
      headerAlign: "center",
      maxWidth: 170,
      minWidth: 130,
      editable: true,
      headerClassName: "header-cell",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = !validateAddressInput(params.props.value);
        return { ...params.props, style: { color: hasError ? "red" : "green" } };
      },
    },
    {
      field: "mobileNumber",
      headerName: "MobileNumber",
      type: "string",
      align: "center",
      headerAlign: "center",
      maxWidth: 170,
      minWidth: 130,
      editable: true,
      headerClassName: "header-cell",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = !validateMobileInput(params.props.value);
        return { ...params.props, style: { color: hasError ? "red" : "green" } };
      },
    },
    {
      field: "dob",
      headerName: "Date Of Birth",
      type: "date",
      editable: true,
      align: "center",
      headerAlign: "center",
      maxWidth: 200,
      minWidth: 150,
      headerClassName: "header-cell",
      renderEditCell: (params: GridRenderEditCellParams) => {
        return (
          <GridEditDateCell
            {...params}
            inputProps={{ max: maxDateStudent(), min: minDateStudent() }}
          />
        );
      },
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      editable: false,
      align: "center",
      headerAlign: "center",
      maxWidth: 130,
      minWidth: 100,
      headerClassName: "header-cell",
    },
  ];

  if (currentRoleType === ERoleTypeEnum.ADMIN) {
    columns.push({
      field: "actions",
      type: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      maxWidth: 250,
      minWidth: 200,
      headerClassName: "header-cell",
      cellClassName: "actions",
      getActions: row => {
        const id = row.id;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={
                <SaveIcon
                  sx={{
                    color: "green",
                  }}
                />
              }
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(row)}
            />,
            <GridActionsCellItem
              key={id}
              icon={
                <CancelIcon
                  sx={{
                    color: "blue",
                  }}
                />
              }
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(row.row)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={
              <EditIcon
                sx={{
                  color: "yellowgreen",
                }}
              />
            }
            label="Edit"
            onClick={handleEditClick(row)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={
              <DeleteIcon
                sx={{
                  color: "red",
                }}
              />
            }
            label="Delete"
            onClick={handleDeleteClick(row)}
            color="inherit"
          />,
        ];
      },
    });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "top",
        marginTop: "1em",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          margin: "1em",
          width: "80%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          sx={{
            backgroundColor: "#ecf0f1",
          }}
          rows={studentList.map(student => ({
            ...student,
            dob: new Date(student.dob),
            age: generateAge(student.dob),
          }))}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange =>
            setRowModesModel(handleRowModesModelChange)
          }
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          autoHeight
          slots={{
            toolbar: currentRoleType === "ADMIN" ? EditToolbar : undefined,
          }}
        />
      </Box>
    </Box>
  );
};


export default StudentDataGrid;
