import Api from "@/config/axiosConfig";
import { handleApiError } from "@/helpers/handleApiError";
import { handleApiResponse } from "@/helpers/handleApiResponse";
import { AuthResponse } from "@/interfaces/authRes.interface";

export const updateBlog = async (
  id: string | undefined,
  blogdata: FormData
): Promise<AuthResponse> => {
  return Api.put(`post/${id}`, blogdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then(handleApiResponse)
    .catch(handleApiError);
};
