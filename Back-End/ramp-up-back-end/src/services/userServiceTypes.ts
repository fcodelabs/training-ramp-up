export interface CreateUserType {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserType {
  email: string;
  password: string;
}

export interface TokenType {
  newAccessToken: string;
  newRefreshToken: string;
  dataStoredInToken: DataStoredInToken;
}

export interface DataStoredInToken {
  email: string;
  role: string;
}
