import { AppDataSource } from './utill/data-source';
import express from 'express';
import studentsRoutes from './routes/studentsRoutes';

const app = express();

AppDataSource.initialize()
  .then(async () => {
    console.log('Now its running');
    app.use(express.json());
    app.use(studentsRoutes);
    app.listen(8000, () => {
      console.log('Server running....port 8000');
    });
  })
  .catch((error) => console.log(error));
