import { ApiErrorResponse } from "@/interfaces/apiErrorResponse.interface";
import { AuthResponse } from "@/interfaces/authRes.interface";
import axios, { AxiosError } from "axios";

export const handleApiError = (error: unknown): AuthResponse => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    console.log(axiosError);

    return {
      success: false,
      error: axiosError.response?.data?.message || axiosError.message,
      status: axiosError.response?.status,
    };
  } else {
    console.error("Unexpected error:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
};
