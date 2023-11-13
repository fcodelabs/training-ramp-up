import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextProps {
  user: UserProfile | null;
  login: (payload: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    let userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      return JSON.parse(userProfile);
    }
    return null;
  });

  const navigate = useNavigate();

  const login = async (payload: any): Promise<void> => {
    await axios.post("http://localhost:8000/api/auth/login/", payload, {
      withCredentials: true,
    });

    let apiResponse = await axios.get<UserProfile>(
      "http://localhost:8000/api/users/",
      {
        withCredentials: true,
      }
    );

    localStorage.setItem("userProfile", JSON.stringify(apiResponse.data));
    setUser(apiResponse.data);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
