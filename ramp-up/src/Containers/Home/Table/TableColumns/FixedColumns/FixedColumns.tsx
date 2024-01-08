import { FormHelperText, MenuItem, TextField, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import styled from 'styled-components';
import { validateName, validateAddress, validateMobile, validateAge, validateBirthday } from '../../../../../Utilities/ValidateUser';
import calculateAge from '../../../../../Utilities/calculateAge';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

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
        fontSize: 8,

    }
}));

const StyledPhoneInputWrapper = styled.div({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
})

const StyledFormHelperText = styled.div({
    fontSize: 7.5,
    width: '100%',
    paddingTop: '4.5px',
    textAlign: 'start',
    color: '#d32f2f'

});

const StyledPhoneInput = styled(PhoneInput)<Props>(({ error }) => ({
    display: 'flex',
    width: '99%',
    "& .PhoneInputCountry": {
        display: 'none',
    },
    "& .PhoneInputInput": {
        // border: error ? '1px solid red' : '1px solid rgba(33, 150, 243, 0.7)',
        height: '52.5px',
        border: error ? '0.9px solid #ce1515' : '0.9px solid rgba(33, 150, 243, 0.7)',
        borderRadius: '5px',
        "&:focus": {
            outline: error ? '0.9px solid #ce1515' : '0.9px solid rgba(33, 150, 243, 0.7)',
        }
    },


}))



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
                const error = !validateName(params.value)

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
                const error = !validateAddress(params.value)
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
        field: 'mobile', headerName: 'Mobile No.', flex: 1.1, minWidth: 100, sortable: false, editable: true,
        renderEditCell: (params) => {
            if (params.field === 'mobile') {
                const error = !validateMobile(params.value);
                console.log(error, typeof params.value);

                return (
                    <StyledPhoneInputWrapper>
                        <StyledPhoneInput
                            error={error}
                            placeholder="+"
                            value={params.value || ''}
                            maxLength={16}
                            onChange={(value: any) => {
                                params.api.setEditCellValue({ id: params.id, field: params.field, value: value });
                            }}
                        >
                        </StyledPhoneInput>
                        {error && <StyledFormHelperText >This field is required</StyledFormHelperText>}
                    </StyledPhoneInputWrapper>
                );
            }
        },
        renderCell: (params) => {
            const formatMobileDisplay = (mobile: string) => {
                const numericMobile = mobile.replace(/\D/g, '');
                if (numericMobile.startsWith('94')) {
                    const formattedMobile = '0' + numericMobile.slice(2);

                    return formattedMobile.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
                } else {
                    return numericMobile.replace(/^\+/, '').replace(/(\d{3})(\d{3})(\d{3,})/, '$1-$2-$3');
                }
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



