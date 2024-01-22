import "reflect-metadata"
import { DataSource } from "typeorm"
//import { AppDataSource } from "./data-source"
import { User } from "./entity/user"
import { Student } from "./entity/student"

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "nethdb123",
  database: "postgres",
  entities: [Student],
  synchronize: true,
  logging: false,
})
AppDataSource.initialize()
    .then(() => {
     
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))


// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))
