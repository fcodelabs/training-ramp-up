import { AxiosResponse } from "axios";
import { api } from "./api";

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
  await api.post(`/user/add`, user, {
    headers: { "Content-Type": "application/json" },
  });
};

export const loadAllUsers = async (): Promise<IUser[]> => {
  let data: IUser[] = [];
  await api.get(`/user`).then(response => {
    data = response.data;
  });
  return data;
};

export const updateUser = (email: string, user: IUser) => {
  return api.put(`/user/${email}`, user, {
    headers: { "Content-Type": "application/json" },
  });
};

export const removeUser = (email: string) => {
  return api.delete(`/user/del/${email}`);
};

export const logIn = async (signInData: ISignInData): Promise<string> => {
  let message: string = "";
  await api
    .post(`/user/signIn`, signInData, {
      headers: { "Content-Type": "application/json" },
    })
    .then(response => {
      message = response.data.message;
    });
  return message;
};

export const logOut = () => {
  return api.delete(`/user/signOut`);
};

export const authUser = async (): Promise<AxiosResponse> => {
  return await api.post("/auth/authorize");
};
