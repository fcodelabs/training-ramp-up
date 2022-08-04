import * as React from 'react';
import Grid from '@mui/material/Grid';
import DataTable from './DataTable';
import Dropzone from './Dropzone';

interface IHomeProps {}

const HomePage = (props: IHomeProps) => {
  return (
    <Grid container spacing={2} sx={{ p: 1 }}>
      <Grid item md={12} sx={{ my: 4, textAlign: 'center' }}>
        <h2>Ramp up Project</h2>
      </Grid>
      <Grid item md={12} xs={12}>
        <DataTable />
        <Dropzone />
      </Grid>
    </Grid>
  );
};

export default HomePage;
