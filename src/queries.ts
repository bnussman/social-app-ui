import { useMutation, useQuery } from "react-query";
import { API_URL } from "./constants";
import { queryClient } from "./main";
import { APIError, Post } from "./types";

const queryKey = 'posts';

async function getPosts() {
  const data = await fetch(`${API_URL}/posts`);

  return await data.json();
}

async function createPost(payload: Post) {
  const data = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const parsed = await data.json();

  // This is annoying, but we must to it so React Query and the native fetch
  // function know if the call was successful or not (for handling api errors)
  if (!data.ok) throw new Error(parsed?.message);

  return parsed;
}

export const updateStore = (newData: Post[]): void => {
  queryClient.setQueryData(queryKey, newData);
};

export const usePostsQuery = () =>
  useQuery<Post[], APIError>(
    queryKey,
    getPosts,
  );

export const usePostsMutation = () =>
 useMutation<Post[], APIError, Post>(createPost, { onSuccess: updateStore });