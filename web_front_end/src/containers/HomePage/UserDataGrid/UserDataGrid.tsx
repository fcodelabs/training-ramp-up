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
    GridPreProcessEditCellProps,
} from "@mui/x-data-grid";
import { RootState, useAppDispatch } from "../../../redux/store";
import { userDataActions } from "../../../redux/user/userSlice";
import { useSelector } from "react-redux";
import {
    validateEmail,
    validateName,
    validatePassword,
    validateUser,
} from "../../../util/validateUser";
import roleEnum from "../../../enum/roleEnum";

interface IUserData {
    userId: number;
    userName: string;
    userEmail: string;
    userPassword: string;
    role: string;
}

function UserDataGrid() {
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [isAddUserButtonDisabled, setAddUserButtonDisabled] = useState(false); // Add this state variable
    const dispatch = useAppDispatch();
    const userDataLists = useSelector(
        (state: RootState) => state.userDataList.userEntries,
    );
    const currentUserRole = useSelector(
        (state: RootState) => state.userDataList.currentUserRole,
    );

    useEffect(() => {
        dispatch(userDataActions.fetchUsersData());
    }, [dispatch]);

    let columns: GridColDef[] = [
        {
            field: "userName",
            headerName: "User Name",
            type: "string",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = !validateName(params.props.value);
                return {
                    ...params.props,
                    style: { color: hasError ? "red" : "green" },
                };
            },
        },
        {
            field: "userEmail",
            headerName: "User Email",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = !validateEmail(params.props.value);
                return {
                    ...params.props,
                    style: { color: hasError ? "red" : "green" },
                };
            },
        },
        {
            field: "userPassword",
            headerName: "Password",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = !validatePassword(params.props.value);
                return {
                    ...params.props,
                    style: { color: hasError ? "red" : "green" },
                };
            },
        },
        {
            field: "role",
            headerName: "Role",
            editable: true,
            headerAlign: "left",
            align: "left",
            width: 150,
            headerClassName: "headerCellStyles",
            type: "singleSelect",
            valueOptions: ["admin", "user"],
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

    if (currentUserRole == roleEnum.USER) {
        // Hide specific columns based on the role
        const columnsToHide = ["actions"];
        columns = columns.filter(column => !columnsToHide.includes(column.field));
    }
    
    const transformedUserData = userDataLists.map((row) => ({
        ...row,
        
    }));

    function handleAddRow() {
        if (currentUserRole == roleEnum.USER) {
            // If the current user role is "user," prevent adding a user
            alert("You do not have permission to add a user.");
            return;
        }
        const newRow: IUserData = {
            userId: -1,
            userName: "",
            userEmail: "",
            userPassword: "",
            role: roleEnum.USER,
        };
        dispatch(userDataActions.addUserData(newRow));
        setRowModesModel((oldModel) => ({
            [newRow.userEmail]: {
                mode: GridRowModes.Edit,
                fieldToFocus: "userName",
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
        const { userId, ...updatedFields } = newRow;

        const validationData = [
            { value: updatedFields.userName, type: "userName" },
            { value: updatedFields.userEmail, type: "userEmail" },
            { value: updatedFields.userPassword, type: "userPassword" },
        ];

        for (const data of validationData) {
            const error = validateUser(
                data.value,
                data.type as "userName" | "userEmail" | "userPassword",
            );
            if (error) {
                alert(error);
                return Promise.resolve();
            }
        }

        const data: IUserData = {
            userId: userId,
            userName: updatedFields.userName as string,
            userEmail: updatedFields.userEmail as string,
            userPassword: updatedFields.userPassword as string,
            role: updatedFields.role as string,
        };
        dispatch(userDataActions.updateUserData(data));
        return { ...oldRow, ...newRow };
    }

    const handleEditRowClick = (row: GridRowModel) => () => {
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [row.id]: { mode: GridRowModes.Edit, fieldToFocus: "userName" },
        }));
    };

    const handleDeleteRowClick = (row: GridRowModel) => () => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            dispatch(userDataActions.removeUserData(row.id));
        }
        setAddUserButtonDisabled(false); 
    };

    const handleCancelRowClick = (row: GridRowModel) => () => {
        if (!row.someProperty) {
            dispatch(userDataActions.removeUserData(row.id));
            return;
        }

        setRowModesModel((oldModel) => ({
            ...oldModel,
            [row.id]: { mode: GridRowModes.View, ignoreModifications: true },
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
                Add User
            </Button>
            <DataGrid
                sx={{
                    height: "50vh",
                    backgroundColor: "#ecf0f1",
                    borderRadius: "8px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
                rows={transformedUserData}
                getRowId={(row) => row.userEmail}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={setRowModesModel}
                processRowUpdate={handleProcessRowUpdate}
            />
        </Box>
    );
}

export default UserDataGrid;
