import { AppDataSource } from './data-source';
import { User } from './entity/User';
import express from 'express';

AppDataSource.initialize()
  .then(async () => {
    console.log('Inserting a new user into the database...');
    const user = new User();
    user.Name = 'Timber';
    user.Gender = 'Saw';
    user.Address = 'Dummy text';
    user.MobileNo = '077552255';
    user.Birth = new Date(1998, 2, 2);
    user.Age = '20';

    await AppDataSource.manager.save(user);
    console.log('Saved a new user with id: ' + user.id);

    console.log('Loading users from the database...');
    const users = await AppDataSource.manager.find(User);
    console.log('Loaded users: ', users);

    console.log(
      'Here you can setup and run express / fastify / any other framework.',
    );
  })
  .catch((error) => console.log(error));
