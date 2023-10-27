import React from "react";
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
  GridPreProcessEditCellProps,
  GridRenderEditCellParams,
  GridEditDateCell,
} from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useEffect, useState } from "react";
import { studentActions } from "../../../redux/student/slice";
import {
  maxDate,
  minDate,
  validateAddress,
  validateFields,
  validateMobile,
  validateName,
} from "../../../util/validationUtil";
import { generateAge } from "../../../util/generateAgeUtil";
import { Typography } from "@mui/material";
import { ERole } from "../../../enum/roleEnum";

interface IStudentData {
  id: number;
  name: string;
  address: string;
  mobile: string;
  dob: string;
  gender: string;
  age: number;
}

const StudentDataGrid = () => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const dispatch = useAppDispatch();
  const studentList = useSelector((state: RootState) => state.studentList.studentList);
  const role = useSelector((state: RootState) => state.userList.currentUserRole);

  useEffect(() => {
    dispatch(studentActions.fetchStudent());
  }, [dispatch]);

  const handleAddNew = () => {
    const newStudent: IStudentData = {
      id: -1,
      name: "",
      address: "",
      mobile: "",
      dob: new Date().toISOString(),
      age: 0,
      gender: "Male",
    };
    dispatch(studentActions.addStudent(newStudent));
    setRowModesModel(oldModel => ({
      [newStudent.id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      ...oldModel,
    }));
  };

  const handleSaveClick = (row: GridRowModel) => () => {
    setRowModesModel({
      ...rowModesModel,
      [row.id]: { mode: GridRowModes.View },
    });
  };

  const handleCancelClick = (row: GridRowModel) => () => {
    if (row.name == "" || row.mobile == "" || row.address == "" || row.age == 0) {
      dispatch(studentActions.removeStudent(row.id));
      return;
    }
    setRowModesModel({
      ...rowModesModel,
      [row.id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleDeleteClick = (row: GridRowModel) => () => {
    dispatch(studentActions.removeStudent(row.id));
  };

  const handleProcessRowUpdate = async (newRow: GridRowModel, oldRow: GridRowModel) => {
    const { id, name, address, mobile, dob, gender, age } = newRow;
    const data: IStudentData = {
      id: id,
      name: name,
      address: address,
      mobile: mobile,
      dob: dob.toISOString(),
      gender: gender,
      age: age,
    };
    const validations = validateFields(name, address, mobile);
    if (validations) {
      return Promise.reject(alert(validations));
    }
    dispatch(studentActions.updateStudent(data));
    return Promise.resolve({ ...newRow, ...oldRow });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80, editable: true },
    {
      field: "name",
      headerName: "Name",
      type: "string",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = !validateName(params.props.value);
        return { ...params.props, style: { color: hasError ? "red" : "black" } };
      },
    },
    {
      field: "address",
      headerName: "Address",
      type: "string",
      width: 180,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = !validateAddress(params.props.value);
        return { ...params.props, style: { color: hasError ? "red" : "black" } };
      },
    },
    {
      field: "mobile",
      headerName: "Mobile",
      type: "string",
      width: 180,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = !validateMobile(params.props.value);
        return { ...params.props, style: { color: hasError ? "red" : "black" } };
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 180,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Male", "Female"],
    },
    {
      field: "dob",
      headerName: "DOB",
      type: "date",
      width: 180,
      editable: true,
      renderEditCell: (params: GridRenderEditCellParams) => {
        return <GridEditDateCell {...params} inputProps={{ max: maxDate(), min: minDate() }} />;
      },
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 80,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      getActions: row => {
        const id = row.id;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(row.row)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
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
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() =>
              setRowModesModel(oldModel => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
              }))
            }
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(row)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  if (role !== ERole.ADMIN) {
    columns.splice(columns.length - 1, 1);
  }

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddNew}
        sx={{ mb: 2 }}
      >
        Add Student
      </Button>
      <Typography variant="h5" align="center" color={"gray"} sx={{ mb: 2 }}>
        Manage Students
      </Typography>
      <DataGrid
        sx={{
          boxShadow: 4,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          cursor: "pointer",
        }}
        rows={studentList.map(student => ({
          ...student,
          dob: new Date(student.dob),
          age: generateAge(student.dob),
        }))}
        columns={columns}
        editMode="row"
        columnHeaderHeight={80}
        rowModesModel={rowModesModel}
        onRowModesModelChange={newRowModesModel => {
          setRowModesModel(newRowModesModel);
        }}
        processRowUpdate={handleProcessRowUpdate}
      />
    </Box>
  );
};

export default StudentDataGrid;
