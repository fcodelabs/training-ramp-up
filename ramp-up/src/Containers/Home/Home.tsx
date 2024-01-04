import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import styled from 'styled-components';
import Appbar from '../../Components/Appbar/Appbar';

const HomeWarpper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

const ContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  `

const Container = styled.div`
  width: 80%;
  display: flex;
  height: 350px;
`;

const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World', col3: 'Male', col4: 'Kathmandu', col5: '9841000000', col6: '1990-01-01', col7: '30', col8: 'Edit' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome', col3: 'Male', col4: 'Kathmandu', col5: '9841000000', col6: '1990-01-01', col7: '30', col8: 'Edit' },
    { id: 3, col1: 'MUI', col2: 'is Amazing', col3: 'Female', col4: 'Kathmandu', col5: '9841000000', col6: '1990-01-01', col7: '30', col8: 'Edit' },
];

const columns: GridColDef[] = [
    { field: 'col1', headerName: 'ID', width: 150 },
    { field: 'col2', headerName: 'Name', width: 150 },
    { field: 'col3', headerName: 'Gender', width: 150 },
    { field: 'col4', headerName: 'Address', width: 150 },
    { field: 'col5', headerName: 'Mobile No.', width: 150 },
    { field: 'col6', headerName: 'Date of Birth', width: 150 },
    { field: 'col7', headerName: 'Age', width: 150 },
    { field: 'col8', headerName: 'Action', width: 150 },
];

const Home = () => {

    return (
        <HomeWarpper>
            <Appbar />
            <ContainerWrapper>
                <Container>
                    <DataGrid rows={rows} columns={columns} />
                </Container>
            </ContainerWrapper>
        </HomeWarpper>
    );
}

export default Home;