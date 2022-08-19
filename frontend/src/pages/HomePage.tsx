import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import axiosInstance from '../axiosInstance/axiosInstance';
import DataTable from '../components/DataTable';
import Dropzone from '../components/Dropzone';
import axios from 'axios';

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const getMovies = async () => {
    try {
      const response = await axiosInstance.get('movies', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      console.log('res data: ', response.data);
    } catch (error: any) {
      console.log('err: ', error);
    }
  };

  return (
    <Grid container spacing={2} sx={{ p: 1 }}>
      <Grid item md={12}>
        <DataTable setLoading={setLoading} />
        <Dropzone loading={loading} />
        <Button onClick={getMovies}>get movies</Button>
      </Grid>
    </Grid>
  );
};

export default HomePage;
