import { Client } from 'pg';

const db = new Client({
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWD,
  host: 'localhost',
  port: 5432
});

db.connect((err) => {
  if (err != null) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

export default db;
