import styled from 'styled-components';
import Appbar from '../../Components/Appbar/Appbar';
import Table from './Table/Table';

export const HomeWarpper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

export const ContainerWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

export default function Home() {
  
    return (
        <HomeWarpper>
            <Appbar />
            <ContainerWrapper>
                <Table />
            </ContainerWrapper>
        </HomeWarpper>
    );

}
