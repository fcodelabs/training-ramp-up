// tableColumns.ts

import { Button, TextField } from '@mui/material';
import { GridColDef, GridRowId, GridRowModesModel } from '@mui/x-data-grid';
import { GridRowModes } from '@mui/x-data-grid';

export const genders = ['Male', 'female', 'other'];

export const columns: (rowModesModel: GridRowModesModel, handleEditClick: (id: GridRowId) => () => void) => GridColDef[] = (rowModesModel, handleEditClick) => [

    { field: 'uid', headerName: 'ID', type: 'number', flex: 0.2, minWidth: 40, editable: true, sortable: false, },
        {
            field: 'name', headerName: 'Name', type: 'string', flex: 1, minWidth: 100, editable: true, sortingOrder: ['desc', 'asc'], renderHeader: (params) => {
                return (
                    <div style={{ paddingRight: '50px' }}>
                        Name
                    </div>
                )
            }
        },
        { field: 'gender', headerName: 'Gender', type: 'singleSelect', flex: 1, minWidth: 100, valueOptions: genders, sortable: false, editable: true },
        { field: 'address', headerName: 'Address', type: 'string', flex: 1, minWidth: 100, sortable: false, editable: true },
        {
            field: 'mobile', headerName: 'Mobile No.', flex: 1, minWidth: 100, sortable: false, editable: true,
            renderEditCell: (params) => {
                if (params.field === 'mobile') {
                    return (
                        <TextField
                            fullWidth
                            type="tel"
                            placeholder='+'
                            variant="outlined"
                            style={{ border: '1px solid #e0e0e0' }}
                            value={params.value || ''}
                            onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })}
                        />
                    );
                }
            }
        },
        {
            field: 'birthday', headerName: 'Date of Birth', type: 'date', flex: 1, minWidth: 100, editable: true, sortingOrder: ['desc', 'asc'],
            renderHeader: () => {
                return (
                    <div style={{ paddingRight: '25px' }}>
                        Date of Birth
                    </div>
                )
            }
        },
        { field: 'age', headerName: 'Age', type: 'number', flex: 0.4, minWidth: 40, sortable: false, editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            minWidth: 200,
            cellClassName: 'actions',
            renderCell: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                return (
                   <>
                   </>
                );
            },
        },
    
    ]

