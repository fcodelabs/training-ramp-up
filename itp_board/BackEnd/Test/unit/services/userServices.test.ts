import {describe} from "node:test";
import {generateTokens, create, checkCredentials} from "../../../src/services/userServices";
import {AppDataSource} from "../../../src/configs/db.config";
import {User} from "../../../src/models/user";
// @ts-ignore
import bcrypt from "bcrypt";
import {fetchAll} from "../../../src/services/studentServices";


const userRepository = AppDataSource.getRepository(User);

jest.mock('../../../src/configs/db.config', () => (
        {
            AppDataSource: {
                getRepository: jest.fn().mockReturnValue({
                    findOneBy: jest.fn(),
                    find: jest.fn(),
                    save: jest.fn(),
                    remove: jest.fn(),
                }),
            },
        }
    )
);

describe('GenerateTokens', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('generates both token and refresh token', () => {
        const email = 'test@example.com';
        const result = generateTokens(email);
                expect(result).toHaveProperty('token');
        expect(result).toHaveProperty('refreshToken');
    });
});

describe('Create User',
    ()=>{
        it(
            "Should return email, firstname, lastname, admin properties",
            async ()=>{
                const res = {
                    email: 'test@gmail.com',
                    firstName:'kasun',
                    lastName:'perera',
                    password:'Abcd@1234',
                    admin:false
                }
                const expectedResponse = {
                    email: 'test@gmail.com',
                    firstName:'kasun',
                    lastName:'perera',
                    admin:false
                }
                jest.spyOn(userRepository,'save').mockResolvedValueOnce(res);
                const response = await create(res);
                expect(response).toEqual(expectedResponse);
            }
        )

        it(
            "Should return error when there is an error in save function",
            async ()=>{
                const res = {
                    email: 'test@gmail.com',
                    firstName:'kasun',
                    lastName:'perera',
                    password:'Abcd@1234',
                    admin:false
                }
                jest.spyOn(userRepository, 'save').mockRejectedValue(new Error('Error in save'))
                await expect(create(res)).rejects.toThrowError('Error in save')
            }
        )


        it(
            "Should return null for empty fields",
            async ()=>{
                const res = {
                    email: '',
                    firstName:'piyal',
                    lastName:'',
                    password:'',
                    admin:false
                }
                const expectedResponse = null
                const response = await create(res);
                expect(response).toEqual(expectedResponse);
            }
        );


    }
);

describe(
    "CheckCredentials",
     ()=>{
        it(
            "Should return failed authorization details for wrong password",
            async ()=>{
                const email = 'test@gmail.com';
                const password = 'Abcd@1234';
                const firstName='nimal';
                const lastName = 'perera';
                const admin = false;
                const res = {email,firstName,lastName,password,admin:false}
                const expectedResponse = {
                    data: {email,firstName,lastName,admin},
                    authorized:true
                }
                userRepository.findOne = jest.fn().mockResolvedValueOnce(res);
                jest.spyOn(bcrypt,'compareSync').mockReturnValue(true);
                const response = await checkCredentials(email,password);
                expect(response).toEqual(expectedResponse);
            }
        )

         it(
             "Should return error when there is an error in findOne function",
             async ()=>{
                 const email = 'test@gmail.com';
                 const password = 'Abcd@1234';
                 jest.spyOn(userRepository, 'findOne').mockRejectedValue(new Error('Error in findOne'))
                 await expect(checkCredentials(email,password)).rejects.toThrowError('Error in findOne')
             }
         )
         it(
            "Should return failed authorization details for invalid email",
            async ()=>{
                const email = 'test@gmail.com';
                const password = 'Abcd@1234';
                const res = null
                const expectedResponse = {
                    data: null,
                    authorized:false
                }
                userRepository.findOne = jest.fn().mockResolvedValueOnce(res);
                jest.spyOn(bcrypt,'compareSync').mockReturnValue(true);
                const response = await checkCredentials(email,password);
                expect(response).toEqual(expectedResponse);
            }
        );
        it(
            "Should return failed authorization details for invalid password",
            async ()=>{
                const email = 'test@gmail.com';
                const password = 'Abcd@1234';
                const res = null
                const expectedResponse = {
                    data: null,
                    authorized:false
                }
                userRepository.findOne = jest.fn().mockResolvedValueOnce(res);
                jest.spyOn(bcrypt,'compareSync').mockReturnValue(false);
                const response = await checkCredentials(email,password);
                expect(response).toEqual(expectedResponse);
            }
        )

    }
)