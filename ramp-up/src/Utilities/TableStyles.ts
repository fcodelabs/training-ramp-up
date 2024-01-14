import { TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
// import PhoneInput from 'react-phone-number-input'
import styled from 'styled-components'

export const genders = ['Male', 'female', 'other']

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    height: auto;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
`

export const Title = styled.div`
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
`

export const ButtonWrapper = styled.div`
    padding: 5px 15px 15px 15px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    @media screen and (max-width: 768px) {
        justify-content: center;
    }
`

export const StyledDataGrid = styled(DataGrid)(() => ({
    '& .MuiDataGrid-sortIcon': {
        opacity: '1 !important',
        visibility: 'visible',
    },
    '& .MuiDataGrid-iconButtonContainer': {
        visibility: 'visible',
    },
    '&. MuiDataGrid-root-MuiDataGrid-menuIcon': {
        display: 'none !important',
    },
    '& .MuiDataGrid-columnSeparator': {
        display: 'none !important',
    },
    '& .MuiDataGrid-columnHeader': {
        backgroundColor: 'rgba(33, 150, 243, 0.1) !important',
    },
    '& .MuiDataGrid-cell:focus-within': {
        outline: 'none !important',
    },
    '& .MuiDataGrid-row--editing':{
        boxShadow: "none !important" 
    },

    '& .MuiDataGrid-cell': {
        justifyContent: 'flex-start !important',
    },
    '& .MuiDataGrid-columnHeaderTitleContainer': {
        justifyContent: 'flex-start !important',
    },
    '& .MuiDataGrid-cell.MuiDataGrid-cell--editing': {
        alignItems: 'flex-start !important',
        paddingTop: '21px !important',
    },

    // do above for all headers
}))

interface Props {
    error: boolean
}

export const StyledTextFieldWrapper = styled(TextField)<Props>(({ error }) => ({
    variant: 'standard',
    color: 'black',
    borderRadius:0,
    textAlign: 'end',
    outline: 'none',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: error ? '#BD0203' : 'rgba(33, 150, 243, 0.7)',
            borderRadius: 0
        },
    },
    
    "& .MuiInputBase-root.Mui-disabled": {
        "& > fieldset": {
            borderColor: error ? '#BD0203' : 'rgba(33, 150, 243, 0.7)',
        }
    },
    '& .MuiFormHelperText-root': {
        marginLeft: 0,
        fontSize: 8,
    },
}))

export const StyledPhoneInputWrapper = styled.div({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
})

export const StyledFormHelperText = styled.div({
    fontSize: 7.5,
    width: '100%',
    paddingTop: '4.5px',
    textAlign: 'start',
    color: '#d32f2f',
})

// const StyledPhoneInput = styled(PhoneInput)<Props>(({ error }) => ({
//     display: 'flex',
//     width: '99%',
//     '& .PhoneInputCountry': {
//         display: 'none',
//     },
//     '& .PhoneInputInput': {
//         height: '52.5px',
//         border: error
//             ? '0.9px solid #ce1515'
//             : '0.9px solid rgba(33, 150, 243, 0.7)',
//         borderRadius: '5px',
//         '&:focus': {
//             outline: error
//                 ? '0.9px solid #ce1515'
//                 : '0.9px solid rgba(33, 150, 243, 0.7)',
//         },
//     },
// }))
