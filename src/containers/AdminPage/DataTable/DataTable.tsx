import * as React from 'react';
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
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import "@fontsource/roboto";
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import generateId from '../../../utility/generateId';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';



const handleEdit = () => {
    console.log('edit');
};

const handleDelete = () => {
    console.log('delete');
};

const StyledEditButton = styled(Button)`
&&&{
    border-color: #2196F380;
    color: #2196F3;
    font-family: Roboto;
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    Letter-spacing: 0.46px;
    }
`;

const StyledRemoveButton = styled(Button)`
&&&{
    border-color: #D32F2F80;
    color: #D32F2F;
    margin-left: 30px;
    font-family: Roboto;
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    Letter-spacing: 0.46px;
    }
`;

const StyledAddButton = styled(Button)`
&&&{
    border-color: #2196F380;
    color: #2196F3;
    font-family: Roboto;
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    Letter-spacing: 0.46px;
    }
`;

const StyledDiscardButton = styled(Button)`
&&&{
    border-color: #D32F2F80;
    color: #D32F2F;
    font-family: Roboto;
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    Letter-spacing: 0.46px;
    }
`;

const StyledGridTitle = styled(Typography)`
&&&{
    display: flex;
    font-family: Roboto;
    font-weight: 400;
    font-size: 24px;
    line-height: 32.02px;
    color: #000000DE;
    align-items: flex-start;
    
    padding: 16px;
    }
`;

const StyledButtonBox = styled(Box)`
&&&{
    display: flex;
    justify-content: flex-end;
    padding: 16px;
    }
`;

const StyledAddNewButton = styled(Button)`
&&&{
    background-color: #2196F3;
    color: #FFFFFF;
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    Letter-spacing: 0.4px;
    }
`;

const StyledDataTableBox = styled(Box)`
  &&& {
    width: auto;
    height: auto;
    border-radius: 4px;
    background: #FFFFFF;
    box-shadow: 0px 2px 1px -1px #00000033, 
                0px 1px 1px 0px #00000024, 
                0px 1px 3px 0px #0000001F;
    
    fontFamily: 'Roboto';
    fontWeight: 400;
    fontSize: 14px;
    lineHeight: 20.02px;
    letterSpacing: 0.17px;
    .action-buttons{
        display: flex;
        flex-direction: column;
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

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = generateId();
        setRows((oldRows) => [...oldRows, { id, name: '', gender: '', address: '', mobile: '', dob: '', isNew: true }]);
        setRows((oldRows) => [{ id, name: '', gender: '', address: '', mobile: '', dob: '', isNew: true }, ...oldRows]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };


    return (

        <StyledButtonBox>
            <StyledAddNewButton variant="contained" onClick={handleClick}>ADD NEW</StyledAddNewButton>
        </StyledButtonBox>

    );
}
// const rows = [
// { id: generateId(), name: 'Snow', age: 35, gender: 'Male', address: 'Delhi', mobile: '1234567890', dob: 'Sun Dec 03 2000' },
// { id: generateId(), name: 'Lannister', age: 42, gender: 'Male', address: 'Delhi', mobile: '1234567890', dob: 'Sun Dec 03 2000' },
// { id: generateId(), name: 'Sersi', age: 45, gender: 'Male', address: 'Delhi', mobile: '1234567890', dob: 'Sun Dec 03 2000' },
// { id: generateId(), name: 'Stark', age: 16, gender: 'Male', address: 'Delhi', mobile: '1234567890', dob: 'Sun Dec 03 2000' },
// { id: generateId(), name: 'Targaryen', age: null, gender: 'Male', address: 'Delhi', mobile: '1234567890', dob: 'Sun Dec 03 2000' },
// { id: generateId(), name: 'Melisandre', age: 150, gender: 'Male', address: 'Delhi', mobile: '1234567890', dob: 'Sun Dec 03 2000' },

// ];

export default function DataTable() {
    const [rows, setRows] = useState(useSelector((state: RootState) => state.student.students));

    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const { isNew, ...updatedRow } = newRow as IStudent;
        setRows((oldRows) =>
            oldRows.map((row) => (row.id === newRow.id ? { ...row, ...updatedRow } : row))
        );
        return { ...updatedRow, isNew: false } as IStudent;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 86, editable: false, sortable: false, disableColumnMenu: true, headerClassName: 'custom-header' },
        { field: 'name', headerName: 'Name', width: 135, sortable: true, disableColumnMenu: true, headerClassName: 'custom-header', editable: true },
        { field: 'gender', headerName: 'Gender', width: 135, sortable: false, disableColumnMenu: true, headerClassName: 'custom-header', editable: true },
        { field: 'address', headerName: 'Address', width: 135, sortable: false, disableColumnMenu: true, headerClassName: 'custom-header', editable: true },
        { field: 'mobile', headerName: 'Mobile No:', width: 135, sortable: false, disableColumnMenu: true, headerClassName: 'custom-header', editable: true },
        { field: 'dob', headerName: 'Date of Birth', width: 175, sortable: true, disableColumnMenu: true, headerClassName: 'custom-header', editable: true },
        { field: 'age', headerName: 'Age', width: 101, disableColumnMenu: true, sortable: false, headerClassName: 'custom-header', editable: true },
        {
            field: 'action',
            headerName: 'Action',
            width: 195,
            disableColumnMenu: true,
            sortable: false,
            headerClassName: 'custom-header',
            type: 'actions',
            getActions: ({ id }: { id: GridRowId }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <div className='action-buttons'>
                            <StyledAddButton onClick={handleSaveClick(id)} size='small' variant="outlined">ADD</StyledAddButton>
                            <StyledDiscardButton onClick={handleCancelClick(id)} size='small' variant="outlined">DISCARD CHANGES</StyledDiscardButton>
                        </div>
                    ];
                }

                return [
                    <div>

                        <StyledEditButton variant="outlined" size='small'>EDIT</StyledEditButton>
                        <StyledRemoveButton variant="outlined" size='small'>REMOVE</StyledRemoveButton>
                    </div>
                ];
            },
        },
    ];

    return (
        <StyledDataTableBox>
            <StyledGridTitle variant="h4">User Details</StyledGridTitle>

            <DataGrid
                sx={{
                    '.MuiDataGrid-columnSeparator': {
                        display: 'none',
                    },
                    '&.MuiDataGrid-root': {
                        border: 'none',
                    },

                    "& .MuiDataGrid-columnHeaders": {
                        fontWeight: 400,
                        borderRadius: "var(--none, 0px)",
                        borderBottom: "1px solid var(--divider, rgba(0, 0, 0, 0.12))",
                        borderLeft: "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
                        borderRight: "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
                        borderTop: "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
                        background: "var(--primary-selected, rgba(33, 150, 243, 0.08))",
                    },
                    "& .MuiDataGrid-sortIcon": {
                        opacity: 'inherit !important',
                    },
                    "& .MuiDataGrid-iconButtonContainer": {
                        visibility: 'visible',
                    },
                    
                }}
                rows={rows}
                columns={columns}
                editMode='row'
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={
                    { toolbar: EditToolbar }
                }
                slotProps={
                    { toolbar: { setRows, setRowModesModel } }
                }
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                getRowHeight={(params) => (rowModesModel[params.id]?.mode === GridRowModes.Edit ? 100 : 62)}
            />
        </StyledDataTableBox>
    );
}