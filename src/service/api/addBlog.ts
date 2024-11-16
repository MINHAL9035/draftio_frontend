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

export const getAllBlogs = async (
  page: number = 1,
  pageSize: number = 5
): Promise<AuthResponse> => {
  return Api.get(`blog?page=${page}&pageSize=${pageSize}`)
    .then(handleApiResponse)
    .catch(handleApiError);
};

export const getLatestBlogs = async (): Promise<AuthResponse> => {
  return Api.get("latestBlogs").then(handleApiResponse).catch(handleApiError);
};

export const getBlogById = async (
  id: string | undefined
): Promise<AuthResponse> => {
  return Api.get(`post/${id}`).then(handleApiResponse).catch(handleApiError);
};
