import { AppDataSource } from '../../dataSource';
import { User } from '../../entities/userEntity';
import { saveUserService, getUser } from '../userService';
import { UserModel } from '../../utils/interfaces';
import bcrypt from 'bcrypt';
const userRepository = AppDataSource.getRepository(User);
 
describe('User Service', () => {
  describe('Register User', () => {
    const newUser: UserModel = {
      name: 'newUser',
      email: 'newUser@gmail.com',
      password: 'New1234',
      userRoll: 'User',
    };
    test('Register User Success', async () => {
      userRepository.save = jest.fn().mockResolvedValue(newUser);
      const res:any = await saveUserService(newUser);
      expect(res).toEqual(newUser);
    });

    test('Register User Fail', async () => {
      userRepository.save = jest.fn().mockRejectedValue(null);
      const res = await saveUserService(newUser);
      expect(res).toEqual({ err: 'Registration Failed' });
    });
  });

  describe('Login User', () => {
    const loginData: UserModel = {
      email: 'user@gmail.com', 
      password: 'User1234',
      userRoll: '',
    };
    const user: UserModel = {
      id: 1,
      name: 'newUser',
      email: 'user@gmail.com',
      password: 'User1234',
      userRoll: 'User',
    };
    test('Login User Success', async () => {
      userRepository.findOneBy = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const res: any = await getUser(user);
      expect(res).toEqual(user);
    });

    test('Login User Fail,invalid Email', async () => {
      userRepository.findOneBy = jest.fn().mockResolvedValue(null);
      const res = await getUser(user);
      expect(res).toEqual(false);
    });

    test('Login User Fail,Incorrect password', async () => {
      userRepository.findOneBy = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      const res = await getUser(loginData);
      expect(res).toEqual(false);
    });
  });
});
