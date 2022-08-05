import Grid from '@mui/material/Grid';
import { useState } from 'react';
import DataTable from './DataTable';
import Dropzone from './Dropzone';

interface IHomeProps {}

const HomePage = (props: IHomeProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <Grid container spacing={2} sx={{ p: 1 }}>
      <Grid item md={12} sx={{ my: 4, textAlign: 'center' }}>
        <h2>Ramp up Project</h2>
      </Grid>
      <Grid item md={12} xs={12}>
        <DataTable setLoading={setLoading} />
        <Dropzone loading={loading} />
      </Grid>
    </Grid>
  );
};

export default HomePage;
