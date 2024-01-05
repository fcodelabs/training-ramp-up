import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { useState } from "react";

let idValue = 0;

const uniqueIdGenerator = () => {
  idValue += 1;
  return idValue;
};
const InitialRows = [
  {
    id: uniqueIdGenerator(),
    name: "Snow",
    gender: "Male",
    address: "Matara",
    mobileno: "071-466-8617",
    dateofbirth: new Date(1998, 11, 4),
    age: 23,
  },
  {
    id: uniqueIdGenerator(),
    name: "Snow",
    gender: "Male",
    address: "Matara",
    mobileno: "071-466-8617",
    dateofbirth: new Date(1999, 11, 4),
    age: 23,
  },
  {
    id: uniqueIdGenerator(),
    name: "Snow",
    gender: "Male",
    address: "Matara",
    mobileno: "071-466-8617",
    dateofbirth: new Date(2004, 11, 4),
    age: 23,
  },
  {
    id: uniqueIdGenerator(),
    name: "Snow",
    gender: "Male",
    address: "Matara",
    mobileno: "071-466-8617",
    dateofbirth: new Date(1999, 11, 4),
    age: 23,
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const isMobile = useMediaQuery("(max-width: 400px)");
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = uniqueIdGenerator();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
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
            variant="outlined"
            onClick={handleClick}
          >
            Add New
          </Button>
        </Grid>
      </Grid>
    </GridToolbarContainer>
  );
}
const columns: GridColDef[] = [
  {
    field: "id",
    type: "number",
    headerName: "ID",
    headerClassName: "super-app-theme--header",

    width: 86,
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
    width: 135,
    sortable: true,
    editable: true,
  },
  {
    field: "gender",
    headerName: "Gender",
    headerClassName: "super-app-theme--header",
    type: "singleSelect",
    valueOptions: ["male", "Female", "Other"],
    width: 137,
    sortable: false,
    editable: true,
  },
  {
    field: "address",
    headerName: "Address",
    headerClassName: "super-app-theme--header",
    width: 137,
    sortable: false,
    editable: true,
  },
  {
    field: "mobileno",
    headerName: "Mobile No:",
    headerClassName: "super-app-theme--header",
    sortable: false,
    width: 135,
    editable: true,
  },
  {
    field: "dateofbirth",
    headerName: "Date of Birth",
    headerClassName: "super-app-theme--header",
    type: "date",
    valueFormatter: (params) => {
      const date = new Date(params.value);
      return date
        .toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          weekday: "short",
        })
        .replace(/,/g, "");
    },
    sortable: true,
    editable: true,
    width: 175,
  },
  {
    field: "age",
    headerName: "Age",
    headerClassName: "super-app-theme--header",
    type: "number",
    sortable: false,
    width: 101,
    valueGetter: ({ row }) => {
      try {
        const dateOfBirth = new Date(row.dateofbirth);

        const today = new Date();
        const age =
          today.getFullYear() -
          dateOfBirth.getFullYear() -
          (today.getMonth() < dateOfBirth.getMonth() ||
          (today.getMonth() === dateOfBirth.getMonth() &&
            today.getDate() < dateOfBirth.getDate())
            ? 1
            : 0);
        return age;
      } catch (error) {
        return 0;
      }
    },
  },
  {
    field: "actions",
    type: "actions",
    headerClassName: "super-app-theme--header",
    headerName: "Actions",
    width: 195,
    cellClassName: "actions",
    getActions: () => {
      const isInEditMode = false;

      if (isInEditMode) {
        return [
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="outlined" color="primary">
              Add
            </Button>
            <Button size="small" variant="outlined" color="error">
              Discard Chages
            </Button>
          </Stack>,
        ];
      }

      return [
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" color="primary">
            Edit
          </Button>
          <Button size="small" variant="outlined" color="error">
            Remove
          </Button>
        </Stack>,
      ];
    },
  },
];
const DataGridTable = () => {
  const [rows, setRows] = useState(InitialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  return (
    <Container>
      <Paper
        sx={{
          height: 500,
          width: "100%",
          "& .super-app-theme--header": {
            backgroundColor: "rgba(33, 150, 243, 0.08)",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          editMode="row"
          rowModesModel={rowModesModel}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Paper>
    </Container>
  );
};

export default DataGridTable;
