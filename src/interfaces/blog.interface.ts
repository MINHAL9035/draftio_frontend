export interface IBlog {
  _id?: string;
  title: string;
  content: string;
  authorId?: {
    _id: string;
    name: string;
    image: string;
  };
  image?: File | null;
  createdAt?: string;
  total?: number;
}
export interface IBlogResponse {
  _id: string;
  title: string;
  content: string;
  authorId?: {
    _id: string;
    name: string;
    image: string;
  };
  imageUrl?: string;
  createdAt?: string;
}
