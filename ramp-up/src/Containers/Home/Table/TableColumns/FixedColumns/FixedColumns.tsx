import { TextField } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

const genders = ['Male', 'female', 'other'];

export const FixedColumns: GridColDef[] = [

    { field: 'uid', headerName: 'ID', type: 'number', width: 10, editable: false, sortable: false, 
    renderHeader: () => <div style={{ paddingRight:'50px' }}>ID</div> },
    {
        field: 'name', headerName: 'Name', type: 'string', flex: 1, minWidth: 50, editable: true, sortingOrder: ['desc', 'asc'], renderHeader: () => {
            return (
                <div style={{ paddingRight: '50px' }}>
                    Name
                </div>
            )
        },
        renderEditCell: (params) => {
            if (params.field === 'name') {
                return (
                    <TextField
                        fullWidth
                        type="text"
                        variant="outlined"
                        style={{ border: '1px solid #e0e0e0' }}
                        value={params.value || ''}
                        onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })}
                    />
                );
            }
        }
    },
    { field: 'gender', headerName: 'Gender', type: 'singleSelect', flex: 1, minWidth: 100, valueOptions: genders, sortable: false, editable: true },
    {
        field: 'address', headerName: 'Address', type: 'string', flex: 1, minWidth: 100, sortable: false, editable: true,
        renderEditCell: (params) => {
            if (params.field === 'address') {
                return (
                    <TextField
                        fullWidth
                        type="text"
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
        },
        renderEditCell: (params) => {
            if (params.field === 'birthday') {
                return (
                    <TextField
                        fullWidth
                        type="date"
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
        field: 'age', headerName: 'Age', type: 'number', flex: 0.4, minWidth: 40, sortable: false, editable: true,
        renderHeader() {
            return (
                <div style={{ paddingRight:'100px'}}>
                    Age
                </div>
            )
        },
        renderEditCell: (params) => {
            if (params.field === 'age') {
                return (
                    <TextField
                        fullWidth
                        type="number"
                        variant="outlined"
                        style={{ border: '1px solid #e0e0e0', justifyContent: 'flexStart' }}
                        value={params.value || ''}
                        onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })}
                    />
                );
            }
        },
    }

]

