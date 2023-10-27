import { AxiosResponse } from "axios";
import { api } from "./api";
import { AUTH_API_PREFIX, USER_API_PREFIX } from "../util/apiPrefixUtil";

interface ISignInData {
  email: string;
  password: string;
}

interface IUser {
  email: string;
  name: string;
  password: string;
  role: string;
}

export const createUser = async (user: IUser) => {
  await api.post(`${USER_API_PREFIX}/add`, user, {
    headers: { "Content-Type": "application/json" },
  });
};

export const loadAllUsers = async (): Promise<IUser[]> => {
  let data: IUser[] = [];
  await api.get(USER_API_PREFIX).then(response => {
    data = response.data;
  });
  return data;
};

export const updateUser = (email: string, user: IUser) => {
  return api.put(`${USER_API_PREFIX}/${email}`, user, {
    headers: { "Content-Type": "application/json" },
  });
};

export const removeUser = (email: string) => {
  return api.delete(`${USER_API_PREFIX}/del/${email}`);
};

export const logIn = async (signInData: ISignInData): Promise<string> => {
  let message: string = "";
  await api
    .post(`${USER_API_PREFIX}/signIn`, signInData, {
      headers: { "Content-Type": "application/json" },
    })
    .then(response => {
      message = response.data.message;
    });
  return message;
};

export const logOut = () => {
  return api.delete(`${USER_API_PREFIX}/signOut`);
};

export const authUser = async (): Promise<AxiosResponse> => {
  return await api.post(`${AUTH_API_PREFIX}/authorize`);
};
