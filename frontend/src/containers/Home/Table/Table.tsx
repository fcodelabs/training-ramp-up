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
} from "@mui/x-data-grid";
import { FixedColumns } from "./TableColumns/FixedColumns/FixedColumns";
import ErrorPopup from "../../../components/Notification/Notification";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { emptyColumns } from "../../../components/TableSkeletons/TableSkeletons";
import GridActionsColumn from "./TableColumns/ActionColumn/ActionColumn";
import { validateUser } from "../../../utilities/validateUser";
import {
  discardUser,
  fetchUsers,
  setUsers,
  addUser,
  updateUser,
} from "../../../redux/user/userSlice";
import { generateNewId } from "../../../utilities/index";
import styled from "styled-components";

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
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const ButtonWrapper = styled.div`
  padding: 5px 15px 15px 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const StyledDataGrid = styled(DataGrid)(() => ({
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
  const rows: GridValidRowModel[] = useAppSelector((state) => state.user.rows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [notification, setNotification] = useState({
    open: false,
    onConfirm: () => {},
    type: "",
  });
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
    dispatch(updateUser(updatedRow));
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
      [id]: { mode: GridRowModes.Edit },
    });
  };

  const handleSaveClick = (params: GridRenderEditCellParams) => () => {
    const editedRow = rows.find((row) => row.id === params.id)!;

    if (
      validateUser(
        editedRow,
        emptyColumns.map((column) => column.field)
      )
    ) {
      dispatch(addUser(editedRow));
      setRowModesModel({
        ...rowModesModel,
        [params.id]: { mode: GridRowModes.View },
      });
      const errorComfirm = () => {
        dispatch(discardUser(Number(params.id)));
      };
      const error = rows.find((row) => row.id === params.id)!.error;
      const isNew = rows.find((row) => row.id === params.id)!.isNew;
      console.log(rows);
      if (isNew && !error) {
        setNotification({
          open: true,
          onConfirm: handleCloseNotification,
          type: "SAVE_NEW_USER",
        });
      } else if (!isNew && !error) {
        setNotification({
          open: true,
          onConfirm: handleCloseNotification,
          type: "SAVE_USER",
        });
      } else if (isNew && error) {
        setNotification({
          open: true,
          onConfirm: errorComfirm,
          type: "FAIL_SAVE_NEW_USER",
        });
      } else {
        setNotification({
          open: true,
          onConfirm: () => {},
          type: "FAIL_UPDATE_USER",
        });
      }
    } else {
      setRowModesModel({
        ...rowModesModel,
        [params.id]: { mode: GridRowModes.Edit },
      });
      setNotification({
        open: true,
        onConfirm: handleCloseNotification,
        type: "MISSING_FIELDS",
      });
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    const confirmDelete = () => {
      dispatch(discardUser(Number(id)));
      handleCloseNotification();
      setNotification({
        open: true,
        onConfirm: handleCloseNotification,
        type: "DELETE_USER_SUCCESS",
      });
    };

    setNotification({
      open: true,
      onConfirm: confirmDelete,
      type: "DELETE_USER",
    });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    const comfirmDiscard = () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
      if (rows.find((row) => row.id === id)!.isNew) {
        dispatch(discardUser(Number(id)));
      }
      handleCloseNotification();
    };

    setNotification({
      open: true,
      onConfirm: comfirmDiscard,
      type: "DISCARD_CHANGES",
    });
  };

  const handleAddClick = () => {
    const id = generateNewId(rows);
    dispatch(
      setUsers([
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

  const columns: GridColDef[] = [
    ...FixedColumns,
    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      flex: 1,
      minWidth: 200,
      cellClassName: "actions",
      renderCell: (params) => (
        <GridActionsColumn
          params={params}
          isInEditMode={rowModesModel[params.id]?.mode === GridRowModes.Edit}
          handleSaveClick={handleSaveClick(params)}
          handleCancelClick={handleCancelClick(params.id)}
          handleEditClick={handleEditClick(params.id)}
          handleDeleteClick={handleDeleteClick(params.id)}
        />
      ),
    },
  ];

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <Container>
      <Title>User Details</Title>
      <ButtonWrapper>
        <Button variant="contained" onClick={handleAddClick}>
          Add new
        </Button>
      </ButtonWrapper>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        checkboxSelection
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        getRowHeight={getRowHeight}
        disableColumnMenu
      />
      <ErrorPopup
        open={notification.open}
        onClose={handleCloseNotification}
        type={notification.type}
        onSubmit={notification.onConfirm}
      />
    </Container>
  );
};

export default Table;
