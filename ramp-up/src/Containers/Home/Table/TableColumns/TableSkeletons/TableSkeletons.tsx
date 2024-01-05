import { Skeleton } from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";

export const emptyRows: GridRowsProp = [
    { id: 1, uid: 1, name: '', gender: '', address: '', mobile: '', birthday: '', age: '', action: '' },
    { id: 2, uid: 2, name: '', gender: '', address: '', mobile: '', birthday: '', age: '', action: '' },
    { id: 3, uid: 3, name: '', gender: '', address: '', mobile: '', birthday: '', age: '', action: '' }
]

const colStyles = {
    flex: 1, minWidth: 100, sortable: false, editable: true, renderCell: () => <Skeleton animation="wave" height={20} width={80} />
}

export const emptyColumns: GridColDef[] =
    [
        { field: 'uid', headerName: 'ID', type: 'number', ...colStyles },
        { field: 'name', headerName: 'Name', type: 'string', ...colStyles },
        { field: 'gender', headerName: 'Gender', type: 'singleSelect', ...colStyles },
        { field: 'address', headerName: 'Address', type: 'string', ...colStyles },
        { field: 'mobile', headerName: 'Mobile No.', ...colStyles },
        { field: 'birthday', headerName: 'Date of Birth', type: 'date', ...colStyles },
        { field: 'age', headerName: 'Age', type: 'number', ...colStyles },
        { field: 'action', headerName: 'Action', type: 'number', ...colStyles }

    ];