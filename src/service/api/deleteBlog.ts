import Api from "@/config/axiosConfig";
import { handleApiError } from "@/helpers/handleApiError";
import { handleApiResponse } from "@/helpers/handleApiResponse";
import { AuthResponse } from "@/interfaces/authRes.interface";

export const deleteBlog = async (id: string): Promise<AuthResponse> => {
  return Api.delete(`post/${id}`).then(handleApiResponse).catch(handleApiError);
};
