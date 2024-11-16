import Api from "@/config/axiosConfig";
import { handleApiError } from "@/helpers/handleApiError";
import { handleApiResponse } from "@/helpers/handleApiResponse";
import { AuthResponse } from "@/interfaces/authRes.interface";
import {
  LoginFormValues,
  SignUpFormValues,
} from "@/interfaces/signUp.interface";

export const Signup = async (
  userDetails: SignUpFormValues
): Promise<AuthResponse> => {
  return Api.post("signup", userDetails)
    .then(handleApiResponse)
    .catch(handleApiError);
};

export const logout = async (): Promise<AuthResponse> => {
  return Api.post("logout").then(handleApiResponse).catch(handleApiError);
};

export const Login = async (
  details: LoginFormValues
): Promise<AuthResponse> => {
  return Api.post("login", details)
    .then(handleApiResponse)
    .catch(handleApiError);
};
