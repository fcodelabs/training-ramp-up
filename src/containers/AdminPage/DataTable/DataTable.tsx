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
    GridRowSpacingParams,
    GridRenderCellParams
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import "@fontsource/roboto";
import { Box, TextField, MenuItem, Select } from '@mui/material';
import Typography from '@mui/material/Typography';
import generateId from '../../../utility/generateId';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';

import FieldMissingCard from '../Cards/FieldMissingCard';
import DiscardChangesCard from '../Cards/DiscardChangesCard';
import AddingSuccessCard from '../Cards/AddingSuccessCard';
import AddingFailedCard from '../Cards/AddingFailedCard';
import LoadingErrorCard from '../Cards/LoadingErrorCard';



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
    .action-edit-buttons{
        display: flex;
        flex-direction: row;
        align-items: flex-start; 
        gap: 8px; 
    }
    padding: 10px;
    
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
        // Add the new row only once
        setRows((oldRows) => [
            { id, name: '', address: '', mobile: '', isNew: true },
            ...oldRows,
        ]);
        // Set the mode for the new row
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

    const [mode, setMode] = useState<'Add' | 'Edit'>('Add'); // Track the mode (Add or Edit)

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showDiscardModal, setShowDiscardModal] = useState(false);



    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
        setMode('Edit');
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        setMode('Add');
        setShowSuccessModal(true);
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    // const handleCancelClick = (id: GridRowId) => () => {
    //     setRowModesModel({
    //         ...rowModesModel,
    //         [id]: { mode: GridRowModes.View, ignoreModifications: true },
    //     });

    //     const editedRow = rows.find((row) => row.id === id);
    //     if (editedRow!.isNew) {
    //         setRows(rows.filter((row) => row.id !== id));
    //     }
    //     setMode('Add');
    // };

    const handleCancelClick = (id: GridRowId) => () => {
        // Check if there are changes in the row
        const isRowModified = Object.keys(rowModesModel).some((key) => key === id.toString());

        if (isRowModified) {
            // If changes exist, show the discard changes modal
            setShowDiscardModal(true);
        } else {
            // If no changes, proceed with canceling
            setRowModesModel({
                ...rowModesModel,
                [id]: { mode: GridRowModes.View, ignoreModifications: true },
            });

            const editedRow = rows.find((row) => row.id === id);
            if (editedRow!.isNew) {
                setRows(rows.filter((row) => row.id !== id));
            }
            setMode('Add');
        }
    };

    const handleConfirmDiscard = () => {
        // User confirmed discarding changes, remove the editing row
        const editingRowId = Object.keys(rowModesModel)[0];
        setRows(rows.filter((row) => row.id !== parseInt(editingRowId)));
        setRowModesModel({});
        setShowDiscardModal(false);
        setMode('Add');
    };

    const handleDismissDiscard = () => {
        // User dismissed discarding changes, close the modal
        setShowDiscardModal(false);
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

    const calculateAge = (dob: Date): number | null => {
        if (!dob) {
            return 0;
        }

        const today = new Date();
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear();

        return age;
    };

    const validatePhoneNumber = (value: string): boolean => {
        // Regular expression for validating phone numbers
        const phoneNumberRegex = /^\+?\d+$/;

        // Check if the value matches the regex
        return phoneNumberRegex.test(value);
    };

    const [ageValues, setAgeValues] = React.useState<{ [key: string]: number | null }>({});



    const columns: GridColDef[] = [

        {
            field: 'id',
            headerName: 'ID',
            width: 86,
            editable: false,
            sortable: false,
            disableColumnMenu: true,
            headerClassName: 'custom-header',
        },
        {
            field: 'name',
            headerName: 'Name',
            type: 'string',
            width: 135,
            sortable: true,
            disableColumnMenu: true,
            headerClassName: 'custom-header',
            editable: true,
            renderEditCell(params: GridRenderCellParams<any, string>) {
                return (
                    <TextField
                        size='small'
                        value={params.value as string}
                        onChange={(event) =>
                            params.api.setEditCellValue({
                                id: params.id,
                                field: params.field,
                                value: event.target.value,
                            })
                        }
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#2196F3',
                                borderRadius: 0,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#2196F3',
                            },
                        }}
                    />
                );
            },
        },
        {
            field: 'gender',
            headerName: 'Gender',
            type: 'singleSelect',
            valueOptions: ['Male', 'Female', 'Other'],
            width: 135,
            sortable: false,
            disableColumnMenu: true,
            headerClassName: 'custom-header',
            editable: true,
            renderEditCell: (params: GridRenderCellParams<any, string>) => (
                <Select
                    size="small"
                    fullWidth
                    value={params.value as string}
                    onChange={(e) =>
                        params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value: e.target.value,
                        })
                    }
                    sx={{

                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2196F3',
                            borderRadius: 0,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2196F3',
                        },
                    }}
                >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
            ),
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 135,
            sortable: false,
            disableColumnMenu: true,
            headerClassName: 'custom-header',
            editable: true,
            renderEditCell(params: GridRenderCellParams<any, string>) {
                return (
                    <TextField
                        size='small'
                        value={params.value as string}
                        onChange={(event) =>
                            params.api.setEditCellValue({
                                id: params.id,
                                field: params.field,
                                value: event.target.value,
                            })
                        }
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#2196F3',
                                borderRadius: 0,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#2196F3',
                            },
                        }}
                    />
                );
            },
        },
        {
            field: 'mobile',
            headerName: 'Mobile No:',
            width: 135,
            sortable: false,
            disableColumnMenu: true,
            headerClassName: 'custom-header',
            editable: true,
            renderEditCell(params: GridRenderCellParams<any, string>) {
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    const newValue = event.target.value;

                    // Check if the entered phone number is valid
                    const isValidPhoneNumber = validatePhoneNumber(newValue);

                    // Update the cell value if the phone number is valid
                    if (isValidPhoneNumber || newValue === '') {
                        params.api.setEditCellValue({
                            id: params.id,
                            field: params.field,
                            value: newValue,
                        });
                    }
                };

                return (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            size='small'
                            value={params.value as string}
                            onChange={handleChange}
                            error={!validatePhoneNumber(params.value as string)}
                            sx={{

                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#2196F3',
                                    borderRadius: 0,
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#2196F3',
                                },
                            }}
                        />
                        <Typography
                            variant="caption"
                            color="error"
                            sx={{

                                overflowWrap: 'break-word', // Allow text to wrap onto the next line
                                whiteSpace: 'normal', // Handle white space properly
                                wordBreak: 'break-all', // Break words when needed
                                textAlign: 'left',
                                gap: '0px',
                                fontSize: '10px',
                            }}
                        >
                            {!validatePhoneNumber(params.value as string)
                                ? 'Please enter a valid phone number'
                                : ''}
                        </Typography>
                    </div>
                );
            },
        },
        {
            field: 'dob',
            headerName: 'Date of Birth',
            type: 'date',
            width: 205,
            sortable: true,
            disableColumnMenu: true,
            headerClassName: 'custom-header',
            editable: true,
            valueFormatter: (params) => {
                const date = dayjs(new Date(params.value));
                return date.format("ddd MMM DD YYYY");
            },

            renderEditCell: (params: GridRenderCellParams<any, dayjs.Dayjs | null>) => {
                const dateValue = params.value ? dayjs(params.value) : null;

                const handleDateChange = (newValue: dayjs.Dayjs | null) => {
                    params.api.setEditCellValue({
                        id: params.id,
                        field: params.field,
                        value: newValue,
                    });

                    // Calculate the age only if newValue is not null
                    if (newValue !== null) {
                        const newAge = calculateAge(newValue.toDate());
                        const rowId = params.id;

                        setAgeValues((prevAgeValues) => ({
                            ...prevAgeValues,
                            [rowId]: newAge,
                        }));

                        // Update the 'age' field
                        params.api.setEditCellValue({
                            id: params.id,
                            field: 'age',
                            value: newAge,
                        });
                        console.log(newAge);
                    }
                };

                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]} sx={{ paddingTop: "0px" }}>
                            <DatePicker
                                value={dateValue}
                                onChange={handleDateChange}
                                slotProps={{
                                    textField: {
                                        size: "small",
                                        sx: {
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#2196F3",
                                                borderRadius: 0,
                                            },
                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#2196F3",
                                            },
                                            alignContent: "center",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        },
                                    },
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                );
            },

        },


        {
            field: 'age',
            headerName: 'Age',
            width: 101,
            disableColumnMenu: true,
            sortable: false,
            headerClassName: 'custom-header',
            editable: false,
            renderCell: (params: GridRenderCellParams<any, string>) => {
                const age = ageValues[params.row.id] !== undefined ? ageValues[params.row.id]?.toString() : '';
                const isBelowMinimumAge = age !== undefined && parseInt(age, 10) < 16;

                if (params.row.id in rowModesModel && rowModesModel[params.row.id]?.mode === GridRowModes.Edit) {
                    // Render a text field when in edit mode
                    return (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                size='small'
                                value={age}
                                onChange={(event) =>
                                    params.api.setEditCellValue({
                                        id: params.id,
                                        field: params.field,
                                        value: event.target.value,
                                    })
                                }
                                error={isBelowMinimumAge}
                                sx={{

                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#2196F3',
                                        borderRadius: 0,
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#2196F3',
                                    },
                                }}
                            />
                            {isBelowMinimumAge && (
                                <Typography
                                    variant="caption"
                                    color="error"
                                    sx={{

                                        overflowWrap: 'break-word', // Allow text to wrap onto the next line
                                        whiteSpace: 'normal', // Handle white space properly
                                        wordBreak: 'break-all', // Break words when needed
                                        textAlign: 'left',
                                        gap: '0px',
                                        fontSize: '10px',
                                    }}
                                >
                                    Individual is below the minimum age allowed
                                </Typography>
                            )}
                        </div>
                    );
                } else {
                    // Render the age as plain text in view mode
                    return (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body2">{age}</Typography>
                            {isBelowMinimumAge && (
                                <Typography variant="caption" color="error">
                                    Individual is below the minimum age allowed
                                </Typography>
                            )}
                        </div>
                    );
                }
            },

        },

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
                        <div>
                            {mode === 'Add' ? (
                                <div className='action-buttons'>
                                    <StyledAddButton onClick={handleSaveClick(id)} size='small' variant="outlined">ADD</StyledAddButton>
                                    <StyledDiscardButton onClick={handleCancelClick(id)} size='small' variant="outlined">DISCARD CHANGES</StyledDiscardButton>
                                </div>
                            ) : (
                                <div className='action-edit-buttons'>
                                    <StyledAddButton onClick={handleSaveClick(id)} size='small' variant="outlined">UPDATE</StyledAddButton>
                                    <StyledDiscardButton onClick={handleCancelClick(id)} size='small' variant="outlined">CANCEL</StyledDiscardButton>
                                </div>
                            )}
                        </div>
                    ];
                }

                return [
                    <div>

                        <StyledEditButton variant="outlined" size='small' onClick={handleEditClick(id)}>EDIT</StyledEditButton>
                        <StyledRemoveButton variant="outlined" size='small' onClick={handleDeleteClick(id)}>REMOVE</StyledRemoveButton>
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
                    "& .MuiDataGrid-cell": {
                        visibility: 'visible',
                    },

                }}
                rows={rows}
                columns={columns}
                editMode='row'
                disableRowSelectionOnClick
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
                getRowHeight={(params) => (rowModesModel[params.id]?.mode === GridRowModes.Edit ? 100 : 52)}

            />
            {/* Modal for Adding Success */}
            <Modal
                open={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '12px' }}>
                    <AddingSuccessCard onClose={() => setShowSuccessModal(false)} />
                </Paper>
            </Modal>
                
                {/* Modal for Discard Changes */}
                {showDiscardModal && (
                <Modal
                    open={showDiscardModal}
                    onClose={handleDismissDiscard}
                    aria-labelledby="discard-modal-title"
                    aria-describedby="discard-modal-description"
                >
                    <Paper
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            borderRadius: '12PX'
                            
                        }}
                    >
                        <DiscardChangesCard
                            onConfirm={handleConfirmDiscard}
                            onDismiss={handleDismissDiscard}
                        />
                    </Paper>
                </Modal>
            )}
        </StyledDataTableBox>
    );
}