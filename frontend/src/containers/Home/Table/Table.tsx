import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  GridRowModesModel,
  GridRowModes,
  GridColDef,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridRenderEditCellParams,
  GridValidRowModel,
  DataGrid,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Columns } from "../../../utilities/index";
import { FixedColumns } from "./TableColumns/FixedColumns/FixedColumns";
import PopupNotification from "../../../components/Notification/Notification";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { GridActionsColumn } from "./TableColumns/ActionColumn/ActionColumn";
import {
  isEmptyFields,
  validateStudent,
} from "../../../utilities/validateStudent";
import {
  discardStudent,
  fetchStudents,
  setStudents,
  addStudent,
  updateStudent,
} from "../../../redux/student/slice";
import { generateNewId } from "../../../utilities/index";
import styled from "styled-components";
import { Socket, io } from "socket.io-client";
import { NotificationTypes } from "../../../utilities/index";
import UserCard from "../../../components/UserCard/UserCard";
import { Role } from "../../../redux/user/slice";
const url = process.env.REACT_APP_API_URL;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: auto;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 15px 5px 15px;
  margin-top: 20px;
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const ButtonWrapper = styled.div`
  padding: 5px 15px 5px 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;
const AdminButtonWrapper = styled.div`
  padding: 10px 15px 10px 15px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: #2196f314;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const StyledDataGrid = styled(DataGrid)(() => ({
  margin: "10px 0",
  "& .MuiDataGrid-sortIcon": {
    opacity: "1 !important",
    visibility: "visible",
  },
  "& .MuiDataGrid-iconButtonContainer": {
    visibility: "visible",
  },
  "&. MuiDataGrid-root-MuiDataGrid-menuIcon": {
    display: "none !important",
  },
  "& .MuiDataGrid-columnSeparator": {
    display: "none !important",
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "rgba(33, 150, 243, 0.1) !important",
  },
  "& .MuiDataGrid-cell:focus-within": {
    outline: "none !important",
  },
  "& .MuiDataGrid-row--editing": {
    boxShadow: "none !important",
  },

  "& .MuiDataGrid-cell": {
    justifyContent: "flex-start !important",
  },
  "& .MuiDataGrid-columnHeaderTitleContainer": {
    justifyContent: "flex-start !important",
  },
  "& .MuiDataGrid-cell.MuiDataGrid-cell--editing": {
    alignItems: "flex-start !important",
    paddingTop: "21px !important",
  },
}));

const Table = () => {
  const rows: GridValidRowModel[] = useAppSelector(
    (state) => state.student.rows
  );
  const isLoading = useAppSelector((state) => state.student.isLoading);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [notification, setNotification] = useState({
    open: false,
    onConfirm: () => {},
    type: "",
  });
  const [AddUserClicked, setAddUserClicked] = useState(false);
  const role = useAppSelector((state) => state.user.role);
  const dispatch = useAppDispatch();

  const handleCloseNotification = () => {
    setNotification({ open: false, onConfirm: () => {}, type: "" });
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    dispatch(updateStudent(updatedRow));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const getRowHeight = (params: { id: GridRowId }) => {
    return rowModesModel[params.id]?.mode === GridRowModes.Edit ? 100 : 60;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "id" },
    });
  };

  const handleSaveClick = (params: GridRenderEditCellParams) => () => {
    const editedRow = rows.find((row) => row.id === params.id)!;

    if (!isEmptyFields(editedRow, Columns)) {
      if (validateStudent(editedRow, Columns)) {
        setRowModesModel({
          ...rowModesModel,
          [params.id]: { mode: GridRowModes.View },
        });

        dispatch(addStudent(editedRow));
      }
    } else {
      setNotification({
        open: true,
        onConfirm: handleCloseNotification,
        type: NotificationTypes.MISSING_FIELDS,
      });
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    const confirmDelete = () => {
      dispatch(discardStudent(Number(id)));
      handleCloseNotification();
    };
    setNotification({
      open: true,
      onConfirm: confirmDelete,
      type: NotificationTypes.DELETE_USER,
    });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    const comfirmDiscard = () => {
      dispatch(fetchStudents());
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View },
      });
      handleCloseNotification();
    };

    setNotification({
      open: true,
      onConfirm: comfirmDiscard,
      type: NotificationTypes.DISCARD_CHANGES,
    });
  };

  const handleAddClick = () => {
    const id = generateNewId(rows);
    dispatch(
      setStudents([
        {
          id,
          name: "",
          gender: "Male",
          address: "",
          mobile: "",
          birthday: "",
          age: "",
          action: "",
          isNew: true,
          error: false,
        },
        ...rows,
      ])
    );

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "id" },
    }));
  };

  const handleEditable = () => {
    return role === Role.ADMIN ? true : false;
  };

  const columns: GridColDef[] =
    role === Role.ADMIN
      ? [
          ...FixedColumns,
          {
            field: "actions",
            type: "actions",
            headerName: "Action",
            flex: 1,
            hideable: true,
            minWidth: 200,
            cellClassName: "actions",
            renderCell: (params: GridRenderCellParams) => (
              <GridActionsColumn
                params={params}
                isInEditMode={
                  rowModesModel[params.id]?.mode === GridRowModes.Edit
                }
                handleSaveClick={handleSaveClick(params)}
                handleCancelClick={handleCancelClick(params.id)}
                handleEditClick={handleEditClick(params.id)}
                handleDeleteClick={handleDeleteClick(params.id)}
              />
            ),
          },
        ]
      : FixedColumns;

  useEffect(() => {
    const socket: Socket = io(`${url}`);
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");

      socket.emit("authenticate", localStorage.getItem("userId"));
    });

    socket.on("added_successfully", (id) => {
      setNotification({
        open: true,
        onConfirm: handleCloseNotification,
        type: NotificationTypes.SAVE_USER,
      });
      socket.emit("messageReceived", "Message received successfully");
    });

    socket.on("add_unsuccessfull", (id) => {
      const handleUnsuccessfull = () => {
        setRowModesModel((oldModel) => ({
          ...oldModel,
          [id]: { mode: GridRowModes.Edit, fieldToFocus: "id" },
        }));

        handleCloseNotification();
      };
      setNotification({
        open: true,
        onConfirm: handleUnsuccessfull,
        type: NotificationTypes.FAIL_SAVE_NEW_USER,
      });
      socket.emit("messageReceived", "Message received successfully");
    });

    socket.on("updated_successfully", (id) => {
      setNotification({
        open: true,
        onConfirm: handleCloseNotification,
        type: NotificationTypes.SAVE_USER,
      });
      socket.emit("messageReceived", "Message received successfully");
    });

    socket.on("update_unsuccessfull", (id) => {
      const handleUnsuccessfull = () => {
        setRowModesModel((oldModel) => ({
          ...oldModel,
          [id]: { mode: GridRowModes.Edit, fieldToFocus: "id" },
        }));

        handleCloseNotification();
      };
      setNotification({
        open: true,
        onConfirm: handleUnsuccessfull,
        type: NotificationTypes.FAIL_UPDATE_USER,
      });
      socket.emit("messageReceived", "Message received successfully");
    });

    socket.on("deleted_successfully", (id) => {
      setNotification({
        open: true,
        onConfirm: handleCloseNotification,
        type: NotificationTypes.DELETE_USER_SUCCESS,
      });
      socket.emit("messageReceived", "Message received successfully");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    dispatch(fetchStudents());
    if (isLoading) {
      setNotification({
        open: true,
        onConfirm: handleCloseNotification,
        type: NotificationTypes.LOADING_DATA,
      });
    }
  }, [dispatch, isLoading]);

  return (
    <Container>
      {role === Role.ADMIN && (
        <AdminButtonWrapper>
          <Button variant="contained" onClick={() => setAddUserClicked(true)}>
            Add new User
          </Button>
        </AdminButtonWrapper>
      )}
      <Title>Student Details</Title>
      <ButtonWrapper>
        {role === Role.ADMIN && (
          <Button variant="contained" onClick={handleAddClick}>
            Add new Student
          </Button>
        )}
      </ButtonWrapper>

      <StyledDataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        isCellEditable={(params) => handleEditable()}
        rowModesModel={rowModesModel}
        checkboxSelection
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        getRowHeight={getRowHeight}
        disableColumnMenu
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
      />
      <PopupNotification
        open={notification.open}
        onClose={handleCloseNotification}
        type={notification.type}
        onSubmit={notification.onConfirm}
      />
      <UserCard
        open={AddUserClicked}
        onClose={() => setAddUserClicked(false)}
      />
    </Container>
  );
};

export default Table;
