import * as userServices from '../src/services/userServices';
import { Request, Response } from "express";
import { User } from '../src/models/User';
import { signUpController } from '../src/controllers/userController';

describe('User Constroller test', () => {
 const response = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnThis();
    res.send = jest.fn().mockReturnThis();
    return res;
  };
    describe('Create user controller test', () => {
        const user = {
            PersonName: 'test',
            PersonSurname: 'test',
            PersonPassword: 'test',
            PersonRole: 'test',
            PersonPhone: 'test',
            PersonAddress: 'test',
        } as unknown as User;
        const request_add = {
            body: {
                data: user,
            },
        } as unknown as Request;
        const request_add_fail = {
            body: {
                data: user,
            },
        } as unknown as Request;
        const res_add = response();

        it('test create user', async () => {
            const spyAddUser = jest.spyOn(userServices, 'registerUserService').mockResolvedValue(user);
            await signUpController(request_add, res_add);
            expect(spyAddUser).toBeCalledWith(user);
            spyAddUser.mockRestore();
        });
        it('test create user fail', async () => {
            const spyAddUser = jest.spyOn(userServices, 'registerUserService').mockResolvedValue(user);
            await signUpController(request_add_fail, res_add);
            expect(spyAddUser).toBeCalledWith(user);
            spyAddUser.mockRestore();
        });
    });


});