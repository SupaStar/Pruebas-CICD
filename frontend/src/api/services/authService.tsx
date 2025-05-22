import { axiosInstance } from "../config/axios";
import { ENDPOINTS } from "../config/endpoints";
import { LoginRequest } from "../models/Auth/LoginRequest";
import { LoginResponse } from "../models/Auth/LoginResponse";

export const LoginService = async (username: string, password: string): Promise<LoginResponse> => {
    let data = new LoginRequest({ username: username, password: password });
    const response = await axiosInstance.post(ENDPOINTS.LOGIN, data);
    return new LoginResponse(response.data);
}