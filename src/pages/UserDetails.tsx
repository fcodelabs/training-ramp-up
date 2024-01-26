import React from 'react';
import TopBar from '../components/TopBar/TopBar';
import DataTable from '../components/DataTable/DataTable';
import { Card, Box, Typography, Button} from '@mui/material';
import { styled } from '@mui/system';

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

try {
  var rows = [
  {id: 1, name:'Sudarshan', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday: new Date('2000.04.17'), age:31},
  {id: 2, name:'Amila', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
  {id: 3, name:'Buddika', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2010-04-17'), age:31},
  {id: 4, name:'Charith', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
  {id: 5, name:'Dasun', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
  {id: 6, name:'Eshan', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
  {id: 7, name:'Fernando', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
  {id: 8, name:'Gandika', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
  {id: 9, name:'Hansaka', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
  {id: 10, name:'Ishan', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
];
} catch (e) {
  console.log(e);
}

const UserDetails = () => {
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
        <DataTable rows={rows} />
      </StyledCard>
    </div>
  )
}

export default UserDetails
