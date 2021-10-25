import { useMutation, useQuery } from "react-query";
import { API_URL } from "./constants";
import { queryClient } from "./main";
import { Post } from "./types";

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

  return await data.json();
}

export const updateStore = (newData: Post[]): void => {
  queryClient.setQueryData(queryKey, newData);
};

export const usePostsQuery = () =>
  useQuery<Post[], unknown>(
    queryKey,
    getPosts,
  );

export const usePostsMutation = () =>
 useMutation<Post[], unknown, Post>(createPost, { onSuccess: updateStore });