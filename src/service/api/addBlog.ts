import Api from "@/config/axiosConfig";
import { handleApiError } from "@/helpers/handleApiError";
import { handleApiResponse } from "@/helpers/handleApiResponse";
import { AuthResponse } from "@/interfaces/authRes.interface";

export const addBlog = async (blogDetails: FormData): Promise<AuthResponse> => {
  return Api.post("blog", blogDetails, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(handleApiResponse)
    .catch(handleApiError);
};

export const getAllBlogs = async (): Promise<AuthResponse> => {
  return Api.get("blog").then(handleApiResponse).catch(handleApiError);
};

export const getBlogById = async (
  id: string | undefined
): Promise<AuthResponse> => {
  return Api.get(`post/${id}`).then(handleApiResponse).catch(handleApiError);
};
