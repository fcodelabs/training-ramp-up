import axios from "axios";
import { createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/currentUserReducer";

// interface UserProfile {
//   id: string;
//   userName: string;
//   email: string;
//   role: string;
// }

// interface AuthContextProps {
//   login: (payload: any) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// interface AuthContextProviderProps {
//   children: ReactNode;
// }

// export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
//   children,
// }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // const login = async (payload: any): Promise<void> => {
//   //   await axios.post("http://localhost:8000/api/auth/login/", payload, {
//   //     withCredentials: true,
//   //   });

//   //   let apiResponse = await axios.get<UserProfile>(
//   //     "http://localhost:8000/api/users/",
//   //     {
//   //       withCredentials: true,
//   //     }
//   //   );

//   //   dispatch(setCurrentUser(apiResponse.data));
//   //   navigate("/");
//   // };

//   return (
//     <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthContext;
