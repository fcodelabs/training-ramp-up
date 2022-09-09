import { AppDataSource } from './utilis/data-source';
// import { Student } from './entity/Student';
import * as express from 'express';
import { createStudentRouter } from './routes/create_routes';
import { deleteClientRouter } from './routes/delete_routes';
import {
  fetchAllStudentRouter,
  fetchStudentRouter,
} from './routes/fetch_routes';
import { putStudentRouter } from './routes/put_routes';

const app = express();

AppDataSource.initialize()
  .then(async () => {
    console.log('Database Connection Succes !!');

    app.use(express.json());
    app.use(createStudentRouter);
    app.use(deleteClientRouter);
    app.use(fetchStudentRouter);
    app.use(fetchAllStudentRouter);
    app.use(putStudentRouter);

    app.listen(8000, () => {
      console.log('Now running on port 8000');
    });
  })
  .catch((error) => console.log(error));
