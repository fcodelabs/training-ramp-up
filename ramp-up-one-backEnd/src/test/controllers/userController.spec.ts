// import { Request, Response } from 'express';
// import { User } from '../../entities/userEntity';
// import * as userServices from '../../services/userService';
// import {
//   saveUser,
//   loginUser,
//   refresh,
//   logout,
//   userDetail,
// } from '../../controllers/userController';
// import { UserModel } from '../../utils/interfaces';

// const mockResponse = () => {
//   const res = {} as Response;
//   res.status = jest.fn().mockReturnValue(res);
//   res.json = jest.fn().mockReturnValue(res);
//   res.cookie = jest.fn().mockReturnValue(res);
//   return res;
// };

// describe('User Controller', () => {
//   describe('Register User', () => {
//     const newUser: UserModel = {
//       name: 'newUser',
//       email: 'newUser@gmail.com',
//       password: 'New1234',
//       userRoll: 'User',
//     };
//       const req = {
//         body: {
//           name: 'newUser',
//           email: 'newUser@gmail.com',
//           password: 'NewU1234',
//         },
//       } as Request;

//       const res = mockResponse();

//       test("Register User Success", async () => {
//         const spyRegisterUser = jest
//           .spyOn(userServices, 'saveUserService')
//           .mockResolvedValue(newUser);
//         await saveUser(req, res);
//          const data = await saveUser(req, res);
//          expect(data).toEqual(200);
//          spyRegisterUser.mockRestore();
//       })
//        test('Register User Fail', async () => {
//          const spyRegisterUser = jest
//            .spyOn(userServices, 'saveUserService')
//            .mockRejectedValue(null);
//         const data= await saveUser(req, res);
//          expect(data).toEqual(400);
//          spyRegisterUser.mockRestore();
//        });
//   });

//   describe('Login User', () => {
//       const user: UserModel = {
//         name: 'newUser',
//         email: 'newUser@gmail.com',
//         password: 'New1234',
//         userRoll: 'User',
//       };
//       const req = {
//         body: {
//           email: 'newUser@gmail.com',
//           password: 'NewU1234',
//         },
//       } as Request;

//       const res = mockResponse();
//         test('Login User Success', async () => {
//           const spyLoginUser = jest
//             .spyOn(userServices, 'getUser')
//             .mockResolvedValue(user);
//           await loginUser(req, res);
//          const data = await saveUser(req, res);
//          expect(data).toEqual(200);
//          spyLoginUser.mockRestore();
//         });

//         test('Login User Fail', async () => {
//           const spyLoginUser = jest
//             .spyOn(userServices, 'getUser')
//             .mockRejectedValue(null);
//           await loginUser(req, res);
//           const data = await saveUser(req, res);
//           expect(data).toEqual(400);
//           spyLoginUser.mockRestore();
//         });
//   });


//   describe('Logout User', () => {});
// });
