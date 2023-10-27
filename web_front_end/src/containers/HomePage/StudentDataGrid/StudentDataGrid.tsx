import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
    GridRowModes,
    DataGrid,
    GridColDef,
    GridActionsCellItem,
    GridRowModesModel,
    GridRowModel,
    GridRenderEditCellParams,
    GridEditDateCell,
    GridPreProcessEditCellProps,
} from "@mui/x-data-grid";
import { RootState, useAppDispatch } from "../../../redux/store";
import { tableDataActions } from "../../../redux/student/studentSlice";
import { useSelector } from "react-redux";
import {
    maxDate,
    minDate,
    validateStudent,
    validateStudentAddress,
    validateStudentMobile,
    validateStudentName,
} from "../../../util/validateStudent";
import { generateAge } from "../../../util/generateAge";
import ERoleEnum from "../../../enum/genderEnum";

interface ITableData {
    studentId: number;
    studentName: string;
    studentAddress: string;
    studentMobile: string;
    studentDob: string;
    studentGender: string;
    age: number;
}

function StudentDataGrid() {
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [isAddUserButtonDisabled, setAddUserButtonDisabled] = useState(false); // Add this state variable
    const dispatch = useAppDispatch();
    const studentDataList = useSelector(
        (state: RootState) => state.tableDataList.tableDataEntries,
    );

    useEffect(() => {
        dispatch(tableDataActions.fetchTableData());
    }, [dispatch]);

    const columns: GridColDef[] = [
        {
            field: "studentId",
            headerName: "ID",
            width: 90,
            headerClassName: "headerCellStyles",
        },
        {
            field: "studentName",
            headerName: "Name",
            type: "string",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = !validateStudentName(params.props.value);
                return {
                    ...params.props,
                    style: { color: hasError ? "red" : "green" },
                };
            },
        },
        {
            field: "studentGender",
            headerName: "Gender",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
            type: "singleSelect",
            valueOptions: ["male", "female"],
        },
        {
            field: "studentAddress",
            headerName: "Address",
            type: "string",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = !validateStudentAddress(params.props.value);
                return {
                    ...params.props,
                    style: { color: hasError ? "red" : "green" },
                };
            },
        },
        {
            field: "studentMobile",
            headerName: "Mobile No",
            type: "string",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = !validateStudentMobile(params.props.value);
                return {
                    ...params.props,
                    style: { color: hasError ? "red" : "green" },
                };
            },
        },
        {
            field: "studentDob",
            headerName: "Date of Birth",
            type: "date",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
            renderEditCell: (params: GridRenderEditCellParams) => {
                return (
                    <GridEditDateCell
                        {...params}
                        inputProps={{ max: maxDate(), min: minDate() }}
                    />
                );
            },
        },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            editable: false,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Command",
            width: 200,
            cellClassName: "actions",
            headerClassName: "headerCellStyles",
            getActions: (row) => {
                const id = row.id;
                const isInEdit = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEdit) {
                    return [
                        <GridActionsCellItem
                            key={id}
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveRowClick(row)}
                            sx={{
                                color: "primary.main",
                                ":hover": {
                                    color: "#0984e3 !important",
                                    cursor: "pointer",
                                },
                            }}
                        />,
                        <GridActionsCellItem
                            key={id}
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={handleCancelRowClick(row)}
                            color="inherit"
                            sx={{
                                ":hover": {
                                    color: "red !important",
                                    cursor: "pointer",
                                },
                            }}
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        key={id}
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={handleEditRowClick(row)}
                        color="inherit"
                        sx={{
                            ":hover": {
                                color: "green !important",
                                cursor: "pointer",
                            },
                        }}
                    />,
                    <GridActionsCellItem
                        key={id}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteRowClick(row)}
                        color="inherit"
                        sx={{
                            ":hover": {
                                color: "red !important",
                                cursor: "pointer",
                            },
                        }}
                    />,
                ];
            },
        },
    ];

    const transformedStudentData = studentDataList.map((row) => ({
        ...row,
        studentDob: new Date(row.studentDob),
        age: generateAge(row.studentDob),
    }));

    function handleAddRow() {
        const newRow: ITableData = {
            studentId: -1,
            studentName: "",
            studentAddress: "",
            studentMobile: "",
            studentDob: maxDate(),
            age: 0,
            studentGender: ERoleEnum.MALE,
        };
        dispatch(tableDataActions.addTableData(newRow));
        setRowModesModel((oldModel) => ({
            [newRow.studentId]: {
                mode: GridRowModes.Edit,
                fieldToFocus: "studentName",
            },
            ...oldModel,
        }));
        setAddUserButtonDisabled(true);
    }

    const handleSaveRowClick = (row: GridRowModel) => () => {
        setRowModesModel({
            ...rowModesModel,
            [row.id]: { mode: GridRowModes.View },
        });
        setAddUserButtonDisabled(false);
    };

    function handleProcessRowUpdate(
        newRow: GridRowModel,
        oldRow: GridRowModel,
    ) {
        const { studentId, ...updatedFields } = newRow;

        const validationData = [
            { value: updatedFields.studentName, type: "studentName" },
            { value: updatedFields.studentAddress, type: "studentAddress" },
            { value: updatedFields.studentMobile, type: "studentMobile" },
        ];

        for (const data of validationData) {
            const error = validateStudent(
                data.value,
                data.type as "studentName" | "studentAddress" | "studentMobile",
            );
            if (error) {
                alert(error);
                return Promise.resolve();
            }
        }

        const data: ITableData = {
            studentId: studentId,
            studentName: updatedFields.studentName as string,
            studentAddress: updatedFields.studentAddress as string,
            studentMobile: updatedFields.studentMobile as string,
            studentDob: (updatedFields.studentDob as Date).toISOString(),
            studentGender: updatedFields.studentGender as string,
            age: updatedFields.age as number,
        };

        dispatch(tableDataActions.updateTableData(data));
        return { ...oldRow, ...newRow };
    }

    const handleEditRowClick = (row: GridRowModel) => () => {
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [row.id]: { mode: GridRowModes.Edit, fieldToFocus: "studentName" },
        }));
    };

    const handleDeleteRowClick = (row: GridRowModel) => () => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            dispatch(tableDataActions.removeTableData(row.id));
        }
        setAddUserButtonDisabled(false);
    };

    const handleCancelRowClick = (row: GridRowModel) => () => {
        if (!row.someProperty) {
            dispatch(tableDataActions.removeTableData(row.id));
            return;
        }

        setRowModesModel((oldModel) => ({
            ...oldModel,
            [row.id]: { mode: GridRowModes.View },
        }));
        setAddUserButtonDisabled(false);
    };

    return (
        <Box
            sx={{
                backgroundColor: "#ecf0f1",
                padding: "10px",
                borderRadius: "18px",
                overflowX: "auto",
            }}
        >
            <Button
                size="small"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddRow}
                sx={{
                    mb: 2,
                    marginRight: "10px",
                    borderRadius: "8px",
                    backgroundColor: "#0984e3",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
                disabled={isAddUserButtonDisabled}
            >
                Add Student
            </Button>
            <DataGrid
                sx={{
                    height: "50vh",
                    backgroundColor: "#ecf0f1",
                    borderRadius: "8px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
                rows={transformedStudentData}
                getRowId={(row) => row.studentId}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={setRowModesModel}
                processRowUpdate={handleProcessRowUpdate}
            />
        </Box>
    );
}

export default StudentDataGrid;
