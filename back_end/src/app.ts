import { config } from 'dotenv';
// dotenv configuration
config();

import express from 'express';
import cors from 'cors';
import routes from './routes';
import { dataSource } from './configs/db.config';
import * as admin from 'firebase-admin';
import serviceAccount from './configs/pushnotification.firebase.config.json';

// Create the express app
const app = express();

// Allow all CORS origins
app.use(cors());

// if you are receiving JSON data in request-body
app.use(express.json());

// Mount the routes at /resourse URL path
app.use('/', routes);

dataSource.initialize().then(() => {
  console.log('Database connection established successfully');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...!`);
});

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});