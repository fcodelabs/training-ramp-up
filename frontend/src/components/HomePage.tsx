import Grid from '@mui/material/Grid';
import { useState } from 'react';
import DataTable from './DataTable';
import Dropzone from './Dropzone';

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <Grid container spacing={2} sx={{ p: 1 }}>
      <Grid item md={12}>
        <DataTable setLoading={setLoading} />
        <Dropzone loading={loading} />
      </Grid>
    </Grid>
  );
};

export default HomePage;
