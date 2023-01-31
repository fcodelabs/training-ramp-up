export interface Student {
  id?: number;
  name: string;
  gender: string;
  address: string;
  mobile: string;
  birthday: Date;
  age: number | boolean;
  inEdit?: boolean | string;
}

export interface User {
  id: number;
  email: string;
  role: string;
}

export interface PageState {
  skip: number;
  take: number;
}

export interface HomeState {
  home: {
    students: Student[];
    error: string;
    loading: boolean;
  };
}

export interface SignInState {
  signIn: {
    isLogged: boolean;
    error: string;
    loading: boolean;
    email: string;
    role: string;
  };
}
