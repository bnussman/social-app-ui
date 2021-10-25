export interface Post {
  id: string;
  title: string;
  username: string;
  content: string;
  votes: number;
}

export interface APIError {
  message: string;
}