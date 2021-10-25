import { useMutation, useQuery } from "react-query";
import { API_URL } from "./constants";
import { queryClient } from "./main";
import { APIError, Post } from "./types";

const queryKey = 'posts';

async function getPosts() {
  const data = await fetch(`${API_URL}/posts`);

  const parsed = await data.json();

  // This is annoying, but we must to it so React Query and the native fetch
  // function know if the call was successful or not (for handling api errors)
  if (!data.ok) throw new Error(parsed?.message);

  return parsed;
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

async function votePost(id: string) {
  const data = await fetch(`${API_URL}/posts/${id}/upvote`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
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

export const updateStoreForUpvote = (updatedPost: Post): void => {
  const posts = queryClient.getQueryData<Post[]>(queryKey) || [];

  const postIndex = posts.findIndex((post: Post) => post.id == updatedPost.id);

  if (postIndex === -1) return;

  posts[postIndex].votes++;

  queryClient.setQueryData(queryKey, posts.sort(post => post.votes));
};

export const usePostsQuery = () =>
  useQuery<Post[], APIError>(
    queryKey,
    getPosts,
  );

export const usePostsMutation = () =>
 useMutation<Post[], APIError, Post>(createPost, { onSuccess: updateStore });

export const useUpvoteMutation = () =>
 useMutation<Post, APIError, { id: string }>(({ id }) => votePost(id), { onSuccess: updateStoreForUpvote });