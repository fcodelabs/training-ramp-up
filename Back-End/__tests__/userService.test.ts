// import bcrypt from 'bcryptjs';
// import { User } from '../src/entities/user';
// import dataSource from '../src/dataSource';
// import { createUserService, loginService } from '../src/services/userService';

// describe('User Service', () => {
//   jest.mock('../src/dataSource', () => ({
//     getRepository: jest.fn().mockReturnValue({
//       save: jest.fn(),
//       create: jest.fn().mockReturnValue({}),
//       findOneBy: jest.fn(),
//     }),
//   }));

//   describe('createUserService', () => {
//     const user = {
//       email: 'test@gmail.com',
//       password: 'password',
//       role: 'admin',
//     };

//     beforeEach(() => {
//       jest.clearAllMocks();
//     });

//     it('should call bcrypt.hash with the correct arguments', async () => {
//       const spy = jest.spyOn(bcrypt, 'hash');
//       await createUserService(user);
//       expect(spy).toHaveBeenCalledWith('password', 12);
//     });

//     it('should call userRepository.save with the correct arguments', async () => {
//       const spy = jest.spyOn(dataSource.getRepository(User), 'save');
//       await createUserService(user);
//       expect(spy).toHaveBeenCalledWith({ id: 1, email: 'test@gmail.com', password: 'hashed_password', role: 'admin' });
//     });

//     it('should return the user object', async () => {
//       const result = await createUserService(user);
//       expect(result).toEqual({ id: 1, email: 'test@gmail.com', password: 'hashed_password', role: 'admin' });
//     });

//     it('should return an error object if there is a failure', async () => {
//       jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
//         throw new Error();
//       });

//       const result = await createUserService(user);
//       expect(result).toEqual({ err: 'New user adding failed into the database' });
//     });
//   });

//   describe('Login Service', () => {
//     const email = 'test@gmail.com';
//     const password = 'password';
//     const hashedPassword = 'hashed_password';
//     const userFound = { email, password: hashedPassword };
//     const isMatch = true;

//     beforeEach(() => {
//       jest.clearAllMocks();
//     });

//     it('should call userRepository.findOneBy with the correct email', async () => {
//       const user = new User();
//       const findOneBySpy = jest.spyOn(dataSource.getRepository(User), 'findOneBy');
//       findOneBySpy.mockReturnValue(Promise.resolve(user));
//       await loginService(email, password);
//       expect(dataSource.getRepository(User).findOneBy).toHaveBeenCalledWith({ email });
//     });

//     it('should call bcrypt.compare with the correct arguments', async () => {
//       const user = new User();
//       const findOneBySpy = jest.spyOn(dataSource.getRepository(User), 'findOneBy');
//       findOneBySpy.mockReturnValue(Promise.resolve(user));
//       const spy = jest.spyOn(bcrypt, 'compare');
//       await loginService(email, password);
//       expect(spy).toHaveBeenCalledWith(password, hashedPassword);
//     });

//     it('should return the isMatch and userFound object when user is found', async () => {
//       const user = new User();
//       const findOneBySpy = jest.spyOn(dataSource.getRepository(User), 'findOneBy');
//       findOneBySpy.mockReturnValue(Promise.resolve(user));
//       jest.spyOn(bcrypt, 'compare').mockResolvedValue(isMatch);
//       const result = await loginService(email, password);
//       expect(result).toEqual({ isMatch, userFound });
//     });

//     it('should return an error object if there is a failure', async () => {
//       const findOneBySpy = jest.spyOn(dataSource.getRepository(User), 'findOneBy');
//       findOneBySpy.mockReturnValue(Promise.reject(new Error()));
//       const result = await loginService(email, password);
//       expect(result).toEqual({ err: 'Invalid Email or Password' });
//     });
//   });
// });
