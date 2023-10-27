import axios from "axios";

interface ISignInData {
    userEmail: string;
    userPassword: string;
}

interface ITableData {
    studentId: number;
    studentName: string;
    studentAddress: string;
    studentMobile: string;
    studentDob: string;
    studentGender: string;
}

interface IUser {
    userName: string;
    userEmail: string;
    userPassword: string;
    role: string;
};

const api = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    withCredentials: true,
});

api.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            try {
                const refreshedTokenResponse = await api.post(
                    "/user/refreshToken",
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    },
                );
                console.log("Token refreshed:", refreshedTokenResponse);
                return refreshedTokenResponse;
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                return Promise.reject(refreshError);
            }
        } else {
            return Promise.reject(error);
        }
    },
);

const getStudentDataApi = () => {
    return api.get("/student");
};

const deleteStudentDataApi = (id: number) => {
    return api.delete(`/student/${id}`);
};

const addedStudentDataApi = (studentData: ITableData) => {
    return api.post("/student", studentData);
};

const updateStudentDataApi = (studentId: number, studentData: ITableData) => {
    return api.put(`/student/${studentId}`, studentData);
};

const getUserDataApi = () => {
    return api.get("/user");
};

const deleteUserDataApi = (email: string) => {
    return api.delete(`/user/${email}`);
};

const addedUserDataApi = (userData: IUser) => {
    return api.post("/user", userData);
};

const updateUserDataApi = (userEmail: string, userData: IUser) => {
    return api.put(`/user/${userEmail}`, userData);
};

const signInUserDataApi = (signInData: ISignInData) => {
    return api.post("/user/signIn", signInData, {
        headers: { "Content-Type": "application/json" },
    });
};

const signOutDataApi = () => {
    return api.delete("/user/signOut/email");
};

const getRoleTypeDataApi = (email: string) => {
    return api.get(`/user/${email}`);
};

export {
    api,
    getStudentDataApi,
    deleteStudentDataApi,
    addedStudentDataApi,
    updateStudentDataApi,
    getUserDataApi,
    signInUserDataApi,
    deleteUserDataApi,
    addedUserDataApi,
    updateUserDataApi,
    signOutDataApi,
    getRoleTypeDataApi,
};
