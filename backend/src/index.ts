/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-misused-promises */
import 'reflect-metadata';
import express from 'express';
import AppDataSource from './dataSource';
import { student } from './models/student';

const app: express.Application = express();

app.get('/students', async (req, res) => {
  try {
    const connection = AppDataSource;
    const userRepo = connection.getRepository(student);
    const students = await userRepo.find();
    res.json(students);
    console.log('connected successfully..');
  } catch (error) {
    console.error('error in query', error);
    res.status(500).json({ error: 'internel server error' });
  }
});

app.listen(3000, () => {
  console.log('server is running on port: 3000');
});
