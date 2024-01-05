import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 70%;
    border: 1px solid #e0e0e0;
    border-radius: 5px; 

`;

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
    
    }`

export const ButtonWrapper = styled.div`
    padding: 5px 15px 15px 15px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    
    @media screen and (max-width: 768px) {
        justify-content: center;
    
    }`

export const StyledDataGrid = styled(DataGrid)((theme) => ({

    '& .MuiDataGrid-sortIcon': {
        opacity: '1 !important',
        visibility: 'visible',
    },
    "& .MuiDataGrid-iconButtonContainer": {
        visibility: 'visible',
    },
    "&. MuiDataGrid-root-MuiDataGrid-menuIcon": {
        display: 'none !important',
    },
    "& .MuiDataGrid-columnSeparator": {
        display: 'none !important',
    },
    "& .MuiDataGrid-columnHeader": {
        backgroundColor: 'rgba(33, 150, 243, 0.1) !important',
    },
    '& .MuiDataGrid-cell:focus-within': {
        outline: 'none !important',
    },
 
    '& .MuiDataGrid-cell': {
        justifyContent: 'flex-start !important',
    },    
    '& .MuiDataGrid-columnHeaderTitleContainer': {
        justifyContent: 'flex-start !important',
    },
    // do above for all headers

    


}));
