import React from 'react';
import TopBar from '../components/TopBar/TopBar';
import DataTable from '../components/DataTable/DataTable';
import { Card, Box, Typography, Button} from '@mui/material';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';

const StyledCard = styled(Card)(({ theme }) => ({
  width: 'calc(100% - 40px)',
  maxWidth: '1152px',
  margin: '0 auto',
  '& .MuiTypography-root': {
    padding: '16px',
    fontSize: '24px',
    fontWeight: 400,
    color: '#000',
  },
}));

const AddNewBox = styled(Box)(({ theme }) => ({
  height:'36px',
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  position: 'relative',
  '& .MuiButton-root': {
    position: 'absolute',
    right: '0',
    margin: '16px',
    backgroundColor: '#2196F3',
  },
}));

interface IStudent {
  id: number,
  name: string;
  gender: string;
  address: string;
  mobileNumber: string;
  birthday: Date;
  age: number;
}

interface RootState {
  students: IStudent[];
}

const UserDetails = () => {
  const students = useSelector((state: RootState) => state.students);

  return (
    <div>
      <TopBar />
      <StyledCard>
        <Box>
          <Typography>User Details</Typography>
        </Box>
        <AddNewBox>
          <Button variant='contained'>ADD NEW</Button>
        </AddNewBox>
        <DataTable rows={students} />
      </StyledCard>
    </div>
  )
}

export default UserDetails;

