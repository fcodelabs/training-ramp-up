import { MenuItem, Select, TextField } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import styled from 'styled-components';

const genders = ['Male', 'female', 'other'];

interface Props {
    error: boolean;
}

const StyledTextFieldWrapper = styled(TextField)<Props>(({ error }) => ({
    variant: "outlined",
    textAlign: 'end',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: error ? 'red' : 'rgba(33, 150, 243, 0.7)',
        },

    },
}));

export const FixedColumns: GridColDef[] = [

    {
        field: 'uid', headerName: 'ID', type: 'number', width: 10, editable: false, sortable: false,
        renderHeader: () => <div style={{ paddingRight: '50px' }}>ID</div>
    },
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
                    <StyledTextFieldWrapper
                        error={params.value === ''}
                        fullWidth
                        type="text"
                        value={params.value || ''}
                        onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })}
                    />
                );
            }
        }
    },
    {
        field: 'gender', headerName: 'Gender', type: 'singleSelect', flex: 1, minWidth: 100, valueOptions: genders, sortable: false, editable: true,
        renderEditCell: (params) => {
            if (params.field === 'gender')
                return (
                    <StyledTextFieldWrapper
                        error={params.value === ''}
                        select
                        fullWidth
                        value={params.value || 'Male'}
                        onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })}
                    >
                        {genders.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </StyledTextFieldWrapper>
                )
        },
    },
    {
        field: 'address', headerName: 'Address', type: 'string', flex: 1, minWidth: 100, sortable: false, editable: true,
        renderEditCell: (params) => {
            if (params.field === 'address') {
                return (
                    <StyledTextFieldWrapper
                        fullWidth
                        type="text"
                        error={params.value === ''}
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
                    <StyledTextFieldWrapper
                        fullWidth
                        type="tel"
                        placeholder='+'
                        error={params.value === ''}
                        value={params.value || ''}
                        onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })}
                    />
                );
            }
        }
    },
    {
        field: 'birthday', headerName: 'Date of Birth', type: 'string', flex: 1, minWidth: 100, editable: true, sortingOrder: ['desc', 'asc'],
        renderHeader: () => {
            return (
                <div style={{ paddingRight: '25px' }}>
                    Date of Birth
                </div>
            )
        },
        renderCell: (params) => {
            const dateObject = params.value ? new Date(params.value) : null;
    
            const formattedDate = dateObject
              ? `${dateObject.toLocaleDateString('en-US', { weekday: 'short' })}
                 ${dateObject.toLocaleDateString('en-US', { month: 'short' })} 
                 ${dateObject.toLocaleDateString('en-US', { day: 'numeric' })} 
                 ${dateObject.toLocaleDateString('en-US', { year: 'numeric' })}`
                : '';
    
            return (
                <div>
                    {formattedDate}
                </div>
            );
        },
        renderEditCell: (params) => {
            if (params.field === 'birthday') {
                const dateObject = params.value ? new Date(params.value) : null;
    
                return (
                    <StyledTextFieldWrapper
                        error={params.value === ''}
                        fullWidth
                        type="date"
                        value={dateObject ? dateObject.toISOString().slice(0, 10) : ''}
                        onChange={(e) => {
                            const newDateObject = e.target.value ? new Date(e.target.value) : null;
                            params.api.setEditCellValue({ id: params.id, field: params.field, value: newDateObject });
                        }}
                    />
                );
            }
        },
    },
    {
        field: 'age', headerName: 'Age', type: 'number', flex: 0.4, minWidth: 40, sortable: false, editable: true,
        renderHeader() {
            return (
                <div style={{ paddingRight: '50px' }}>
                    Age
                </div>
            )
        },
        renderEditCell: (params) => {
            if (params.field === 'age') {
                return (
                    <StyledTextFieldWrapper
                        error={params.value === ''}
                        fullWidth
                        type="number"
                        value={params.value || ''}
                        onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })}
                    />
                );
            }
        },
    }

]

