import {describe} from "node:test";
import {Response,Request,NextFunction} from "express";
import * as userServices from '../../../src/services/userServices'
import {authenticate, createUser, signOut, updateToken} from "../../../src/controllers/userController";
import {refreshTokens} from "../../../src/utils/refreshTokens";
import jwt from "jsonwebtoken";
import * as studentServices from "../../../src/services/studentServices";
import {deleteStudentById} from "../../../src/controllers/studentController";


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
)
describe(
    "Create new user",
    ()=>{
        beforeEach(
            ()=>{
                jest.clearAllMocks();
            }
        );

        const req = {} as Request
        req.body={
            email:"achira@gmail.com",
            firstName:"achira",
            lastName:"peries",
            password:"Abcd@1234",
            admin:false
        }
        const response = {
            email: "achira@gmail.com",
            firstName: "achira",
            lastName: "peries",
            admin: false
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            cookie:jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        const next = jest.fn() as NextFunction
        const refreshOpt = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        }
        const accessOpt = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 5 * 60 * 1000
        }
        const token = "FGR#W$#5g435Vf3453%$gGG#s%%GW$TV";
        const refreshToken = 'FGR#W$#5g435Vf3453%$gGG#$%%GW$TV';
        const tokens = {token,refreshToken}

        it(
            "Should create new user and response with 200",
            async ()=>{
                jest.spyOn(userServices,'create').mockResolvedValueOnce(response);
                // @ts-ignore
                jest.spyOn(userServices,'generateTokens').mockReturnValueOnce(tokens)
                await createUser(req,res,next);
                expect(res.cookie).toHaveBeenCalledWith(
                    'refreshToken',
                    refreshToken,
                    refreshOpt
                )
                expect(res.cookie).toHaveBeenCalledWith(
                    'accessToken',
                    `bearer ${token}`,
                    accessOpt
                )
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(response);
            }
        )

        it(
            "Should call res.json and res.status exactly 1 time and 2 times for res.cookie",
            async ()=>{
                jest.spyOn(userServices,'create').mockResolvedValueOnce(response);
                // @ts-ignore
                jest.spyOn(userServices,'generateTokens').mockReturnValueOnce(tokens)
                await createUser(req,res,next);
                expect(res.cookie).toHaveBeenCalledTimes(2);
                expect(res.status).toHaveBeenCalledTimes(1);
                expect(res.json).toHaveBeenCalledTimes(1);
            }
        )

        it(
            "Should call next with error when there is error in create function",
            async ()=>{
                const error = new Error('Error in create function');
                // @ts-ignore
                jest.spyOn(userServices,'create').mockRejectedValueOnce(error);
                // @ts-ignore
                jest.spyOn(userServices,'generateTokens').mockReturnValueOnce(tokens)
                await createUser(req,res,next);
                expect(res.json).toHaveBeenCalledTimes(0);
                expect(res.status).toHaveBeenCalledTimes(0);
                expect(next).toHaveBeenCalledTimes(1)
                expect(next).toHaveBeenCalledWith(error);
            }
        )
    }
)

describe(
    "Check given credentials",
    ()=>{
        beforeEach(
            ()=>{
                jest.clearAllMocks();
            }
        );

        const req = {} as Request
        req.body={
            email:"admin@gmail.com",
            password:"Abcd@1234"
        }
        let response = {
            data: {
                "email": "admin@gmail.com",
                "firstName": "Akila",
                "lastName": "Gamage",
                "admin": true
            },
            authorized: true
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            cookie:jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        const next = jest.fn() as NextFunction
        const refreshOpt = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        }
        const accessOpt = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 5 * 60 * 1000
        }
        const token = "FGR#W$#5g435Vf3453%$gGG#s%%GW$TV";
        const refreshToken = 'FGR#W$#5g435Vf3453%$gGG#$%%GW$TV';
        const tokens = {token,refreshToken}

        it(
            "Should response with access infomation",
            async ()=>{
                jest.spyOn(userServices,'checkCredentials').mockResolvedValueOnce(response);
                // @ts-ignore
                jest.spyOn(userServices,'generateTokens').mockReturnValueOnce(tokens)
                await authenticate(req,res,next);
                expect(res.cookie).toHaveBeenCalledWith(
                    'refreshToken',
                    refreshToken,
                    refreshOpt
                )
                expect(res.cookie).toHaveBeenCalledWith(
                    'accessToken',
                    `bearer ${token}`,
                    accessOpt
                )
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(response);
            }
        )

        it(
            "Should call res.json and res.status exactly 1 time and 2 times for cookie",
            async ()=>{
                jest.spyOn(userServices,'checkCredentials').mockResolvedValueOnce(response);
                // @ts-ignore
                jest.spyOn(userServices,'generateTokens').mockReturnValueOnce(tokens)
                await authenticate(req,res,next);
                expect(res.cookie).toHaveBeenCalledTimes(2);
                expect(res.status).toHaveBeenCalledTimes(1);
                expect(res.json).toHaveBeenCalledTimes(1);
            }
        )
        it(
            "Should response with failed response and 401 status code for invalid credentials",
            async ()=>{
                req.body = {
                    email:"admin_@gmail.com",
                    password:"Abcd@1234"
                }

                const failedResponse = {
                    data: null,
                    authorized: false
                }
                jest.spyOn(userServices,'checkCredentials').mockResolvedValueOnce(failedResponse);
                // @ts-ignore
                jest.spyOn(userServices,'generateTokens').mockReturnValueOnce(tokens)
                await authenticate(req,res,next);
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(failedResponse);
            }
        )

        it(
            "Should call res.json and res.status exactly 1 time for invalid credentials",
            async ()=>{
                req.body = {
                    email:"admin_@gmail.com",
                    password:"Abcd@1234"
                }

                const failedResponse = {
                    data: null,
                    authorized: false
                }
                jest.spyOn(userServices,'checkCredentials').mockResolvedValueOnce(failedResponse);
                // @ts-ignore
                jest.spyOn(userServices,'generateTokens').mockReturnValueOnce(tokens)
                await authenticate(req,res,next);
                expect(res.status).toHaveBeenCalledTimes(1);
                expect(res.json).toHaveBeenCalledTimes(1);
            }
        );

        it(
            "Should call next with error when there is an error in checkCredential function",
            async ()=>{
                const error = new Error('Error in remove')
                jest.spyOn(userServices, 'checkCredentials').mockRejectedValue(error)
                await authenticate(req,res,next);
                expect(res.status).toHaveBeenCalledTimes(0);
                expect(res.json).toHaveBeenCalledTimes(0)
                expect(next).toHaveBeenCalledWith(error);
            }
        )
    }
)

describe(
    "User signout",
    ()=>{
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            clearCookie: jest.fn().mockReturnThis(),
            sendStatus: jest.fn(),
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        beforeEach(() => {
            jest.clearAllMocks();
        });
        it(
            "Should Clear token cookies and send 204 status code",
            async ()=>{
                await signOut(req,res,next);
                expect(res.clearCookie).toHaveBeenCalledWith('refreshToken');
                expect(res.clearCookie).toHaveBeenCalledWith('accessToken');
                expect(res.sendStatus).toHaveBeenCalledWith(204);
            }
        );

        it(
            "Should call sendStatus exactly 1 time and 2 times for clearCookie",
            async ()=>{
                await signOut(req,res,next);
                expect(res.clearCookie).toHaveBeenCalledTimes(2);
                expect(res.sendStatus).toHaveBeenCalledTimes(1);
            }
        );
    }
);

describe(
    "Update access token test",
    ()=>{
        const req = {} as Request;
        const res = {
            cookie:jest.fn().mockReturnThis(),
            sendStatus: jest.fn()
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it(
            "Update access token and Send 200 status code for valid refresh token",
            async ()=>{
                // @ts-ignore
                process.env.REFRESH_TOKEN_KEY = 'refresh-token-key';
                process.env.Token_KEY = 'token-key';
                const refreshToken = jwt.sign("sample@gmail.com",process.env.REFRESH_TOKEN_KEY);
                req.cookies = {refreshToken}
                // @ts-ignore
                jest.spyOn(jwt,'sign').mockReturnValueOnce('new_access_token');
                await updateToken(req,res,next);
                expect(res.sendStatus).toHaveBeenCalledWith(200);
                expect(res.cookie).toHaveBeenCalledWith(
                    'accessToken',
                    `bearer new_access_token`,
                    {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict',
                        maxAge: 5 * 60 * 1000
                    }
                );
            }
        );

        it(
            "res.sendStatus and res.cookies should be called exactly 1 time",
            async ()=>{
                // @ts-ignore
                process.env.REFRESH_TOKEN_KEY = 'refresh-token-key';
                process.env.Token_KEY = 'token-key';
                const refreshToken = jwt.sign("sample@gmail.com",process.env.REFRESH_TOKEN_KEY);
                req.cookies = {refreshToken}
                // @ts-ignore
                jest.spyOn(jwt,'sign').mockReturnValueOnce('new_access_token');
                await updateToken(req,res,next);
                expect(res.sendStatus).toHaveBeenCalledTimes(1);
                expect(res.cookie).toHaveBeenCalledTimes(1)
            }
        );

        it(
            "res.sendStatus and res.cookies should be called exactly 1 time",
            async ()=>{
                // @ts-ignore
                process.env.REFRESH_TOKEN_KEY = 'refresh-token-key';
                process.env.Token_KEY = 'token-key';
                req.cookies = {}
                // @ts-ignore
                jest.spyOn(jwt,'sign').mockReturnValueOnce('new_access_token');
                await updateToken(req,res,next);
                expect(res.sendStatus).toHaveBeenCalledWith(401);
            }
        );

        it(
            "Should send response with 401 status code for invalid refresh token",
            async ()=>{
                // @ts-ignore
                process.env.REFRESH_TOKEN_KEY = 'refresh-token-key';
                process.env.Token_KEY = 'token-key';
                const refreshToken = jwt.sign("sample@gmail.com",process.env.REFRESH_TOKEN_KEY);
                req.cookies = {refreshToken:refreshToken+'abc'}
                // @ts-ignore
                jest.spyOn(jwt,'sign').mockReturnValueOnce('new_access_token');
                await updateToken(req,res,next);
                expect(res.sendStatus).toHaveBeenCalledWith(401);
            }
        );
    }
)
