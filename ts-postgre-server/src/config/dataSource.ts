import { createConnection, ConnectionOptions } from 'typeorm';

const connectionOptions: ConnectionOptions = {
   url:'postgres://neth:E18OpZU8ZnJ5eUsYDwFERHg2j8VNasP7@dpg-cn5d8col5elc73e63lm0-a.oregon-postgres.render.com/ramp_up_u7zu' ,

    ssl: {
        rejectUnauthorized: false,
      },
    type: 'postgres',
   // host: 'localhost',
   // port: 5432,
    //username: 'postgres', //Database Username
   // password: 'nethdb123', // Database Password
    //database: 'postgres', // Database Name
    synchronize: true,
    logging: false,
    migrations:[],
    subscribers: [],
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
// import { DataSource } from "typeorm"

// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "nethdb123",
//     database: "postgres",
//     synchronize: true,
//    entities: [__dirname + '/../models/*{.js,.ts}'],
// })

// export const connectToDatabase = async () => {
//     try {
//         await AppDataSource.initialize();
//         console.log("Data Source has been initialized!");
//     } catch (err) {
//         console.error("Error during Data Source initialization", err);
//     }
// }