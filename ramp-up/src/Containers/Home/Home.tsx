import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import styled from 'styled-components';

const HomeWarpper = styled.div`
    display: flex;
    flex-direction: raw;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`;

const Container = styled.div`
  width: 80%;
  height: 300px;
`;

const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
];

const Home = () => {

    return (
        <HomeWarpper>
            <Container>
                <DataGrid rows={rows} columns={columns} />
            </Container>
        </HomeWarpper>
    );
}

export default Home;