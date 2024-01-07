import { MenuItem, TextField, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import styled from 'styled-components';
import { validateName, validateAddress, validateMobile, validateAge, validateBirthday } from '../../../../../Utilities/ValidateUser';
import calculateAge from '../../../../../Utilities/calculateAge';
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
    '& .MuiFormHelperText-root': {
        marginLeft: 0,
        fontSize: 7,

    }
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
                const error=!validateName(params.value)

                return (
                    <StyledTextFieldWrapper
                        error={error}
                        fullWidth
                        type="text"
                        value={params.value || ''}
                        onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })}
                        helperText={error && "This field is required"}
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
                const error=!validateAddress(params.value)
                return (
                    <StyledTextFieldWrapper
                        type="text"
                        error={error}
                        value={params.value || ''}
                        onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })}
                        helperText={error && "This field is required"}
                    >

                    </StyledTextFieldWrapper>
                );

            }
        }
    },
    {
        field: 'mobile', headerName: 'Mobile No.', flex: 1, minWidth: 100, sortable: false, editable: true,
        renderEditCell: (params) => {
            if (params.field === 'mobile') {
                const error = !validateMobile(params.value);
                const formatMobileInput = (input: string) => {
                    // Format the mobile number input with spaces (e.g., '0714668617' to '071 466 8617')
                    const formattedInput = input.replace(/\D/g, ''); // Remove non-numeric characters
                    const parts = formattedInput.match(/^(\d{1,3})(\d{1,2})?(\d{1,2})?(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,4})?$/);
                
                    if (parts) {
                        parts.shift(); // Remove the first empty element
                        return parts.filter(Boolean).join(' ');
                    }
                
                    return '';
                };
                return (
                    <StyledTextFieldWrapper
                        fullWidth
                        type="tel"
                        placeholder='+'
                        error={error}
                        value={params.value || ''}
                        onChange={(e) => {
                            const formattedInput = formatMobileInput(e.target.value);
                            params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })}}
                        helperText={error && 'Please enter a valid mobile number'}
                    />
                );
            }
        },
        renderCell: (params) => {
            const formatMobileDisplay = (mobile: string) => {
                // Format mobile number for display (e.g., '+94 766 847 479' to '076-684-7479')
                const formattedInput = mobile.replace(/\D/g, ''); // Remove non-numeric characters
                const parts = formattedInput.match(/^(\d{3})(\d{2,3})(\d{2,4})$/);
            
                if (parts) {
                    return `${parts[1]}-${parts[2]}-${parts[3]}${parts[4] ? `-${parts[4]}` : ''}`;
                }
            
                return '';
            };
            const formattedMobile = formatMobileDisplay(params.value);
            return <div>{formattedMobile}</div>;
        },
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
                const error = !validateBirthday(params.value)
                const dateObject = params.value ? new Date(params.value) : null;
    
                const handleDateChange = (newDate: string) => {
                    const newDateObject = newDate ? new Date(newDate) : null;
                    params.api.setEditCellValue({ id: params.id, field: params.field, value: newDateObject });
    
                    // Calculate and set age
                    const age = calculateAge(newDateObject!);
                    console.log(age, 'age')
                    params.api.setEditCellValue({ id: params.id, field: 'age', value: age });
                };
    
                return (
                    <StyledTextFieldWrapper
                        error={error}
                        fullWidth
                        type="date"
                        value={dateObject ? dateObject.toISOString().slice(0, 10) : ''}
                        onChange={(e) => handleDateChange(e.target.value)}
                        helperText={error && "This field is required"}
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
                const error = !validateAge(params.value)
                return (
                    <StyledTextFieldWrapper
                        error={error}
                        fullWidth
                        type="number"
                        value={params.value || ''}
                        onChange={(e) => params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value })}
                        helperText={error && (
                            <Typography variant="body2" color="error" fontSize={6.5} lineHeight={1}>
                                Individual is below the
                                <br />
                                minimum age allowed
                            </Typography>
                        )}
                    />
                );
            }
        },
    }

]



