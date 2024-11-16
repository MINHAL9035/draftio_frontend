import { IBlog } from "./blog.interface";

export interface AuthResponse {
  success: boolean;
  data?: IBlog[] | IBlog;
  error?: string;
  status?: number;
}
