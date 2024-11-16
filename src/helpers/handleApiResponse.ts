import { AuthResponse } from "@/interfaces/authRes.interface";
import { AxiosResponse } from "axios";

export const handleApiResponse = (response: AxiosResponse): AuthResponse => {
  console.log(handleApiResponse);

  return {
    success: true,
    data: response.data,
    status: response.status,
  };
};
