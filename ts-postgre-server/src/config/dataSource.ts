import { createConnection, ConnectionOptions } from 'typeorm';

const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres', //Database Username
    password: 'nethdb123', // Database Password
    database: 'postgres', // Database Name
    synchronize: true,
    entities: [__dirname + '/../models/*{.js,.ts}'], // Adjust the path as needed
};

export const connectDatabase = async () => {
    try {
        await createConnection(connectionOptions);
        console.log('Connected to the PostgreSQL database.');
    } catch (error) {
        console.error('Unable to connect to the PostgreSQL database.');
        console.error(error);
    }
};
