import Button from "@mui/material/Button";
import React from "react";
import { useState } from "react";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  GridColDef,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  useGridApiRef,
  GridRenderEditCellParams,
  DataGrid,
} from "@mui/x-data-grid";
import { FixedColumns } from "./FixedColumns/FixedColumns";
import ErrorPopup from "../../../components/Notification/Notification";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
  emptyColumns,
  emptyRows,
} from "../../../components/TableSkeletons/TableSkeletons";
import GridActionsColumn from "./ActionColumn/ActionColumn";
import { validateUser } from "../../../utilities/ValidateUser";
import { addUser, discardUser } from "../../../redux/user/userSlice";
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
  const initialRows: GridRowsProp = useAppSelector((state) => state.user.rows);
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [notification, setNotification] = useState({
    open: false,
    onConfirm: () => {},
    type: "",
  });
  const dispatch = useAppDispatch();
  const apiRef = useGridApiRef();

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
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
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
    const editedRow = initialRows.find((row) => row.id === params.id)!;
    const isNew = params.row.isNew;
    try {
      if (
        validateUser(
          editedRow,
          emptyColumns.map((column) => column.field)
        )
      ) {
        setRows(
          rows.map((row) =>
            row.id === params.id ? { ...row, error: false } : row
          )
        );
        setRowModesModel({
          ...rowModesModel,
          [params.id]: { mode: GridRowModes.View },
        });
        if (isNew) {
          setNotification({
            open: true,
            onConfirm: handleCloseNotification,
            type: "SAVE_NEW_USER",
          });
        } else {
          setNotification({
            open: true,
            onConfirm: handleCloseNotification,
            type: "SAVE_USER",
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
    } catch (error) {
      console.log(isNew);

      setRows(
        rows.map((row) =>
          row.id === params.id ? { ...row, error: true } : row
        )
      );
      setRowModesModel({
        ...rowModesModel,
        [params.id]: { mode: GridRowModes.View },
      });
      const errorComfirm = () => {
        setRows(rows.filter((row) => row.id !== params.id));
        dispatch(discardUser(Number(params.id)));
      };
      if (isNew) {
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
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    const confirmDelete = () => {
      setRows(rows.filter((row) => row.id !== id));
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
        setRows(rows.filter((row) => row.id !== id));
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
    setRows((oldRows) => [
      {
        id,
        uid: id,
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
      ...oldRows,
    ]);
    dispatch(
      addUser({
        id: id,
        uid: id,
        name: "",
        gender: "Male",
        address: "",
        mobile: "",
        birthday: new Date(),
        age: Number(),
      })
    );
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "uid" },
    }));
  };

  const columns: GridColDef[] = [
    ...FixedColumns,
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
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

  return (
    <Container>
      <Title>User Details</Title>
      <ButtonWrapper>
        <Button variant="contained" onClick={handleAddClick}>
          Add new
        </Button>
      </ButtonWrapper>
      {rows.length === 0 ? (
        <StyledDataGrid
          rows={emptyRows}
          columns={emptyColumns}
          checkboxSelection
        />
      ) : (
        <StyledDataGrid
          apiRef={apiRef}
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
      )}

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
