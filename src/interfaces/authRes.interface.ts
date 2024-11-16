export interface AuthResponse {
  success: boolean;
  data?: IBlog[] | IBlog | PaginatedBlogResponse;
  error?: string;
  status?: number;
}

export interface PaginatedBlogResponse {
  blogs: IBlog[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface IBlog {
  _id: string;
  title: string;
  content: string;
  authorId?: {
    _id: string;
    name: string;
    image: string;
  };
  image?: File | null;
  createdAt?: string;
}
