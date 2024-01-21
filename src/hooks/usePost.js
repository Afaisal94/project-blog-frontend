import axios from "axios";
import { BaseApiUrl } from "../utils/BaseApiUrl";

const getPosts = async () => {
  const response = await axios.get(`${BaseApiUrl}/posts`);
  return response.data;
};

const getPostById = async (id) => {
  const response = await axios.get(`${BaseApiUrl}/posts/${id}`);
  return response.data;
};

const getPostByCategoryName = async ({ pageParam = 1, category }) => {
  const response = await axios.get(
    `${BaseApiUrl}/posts/categoryname/${category}?paging=true&page=${pageParam}&limit=3`
  );
  return response.data;
};

const getPostByKeyword = async (title) => {
  const response = await axios.get(`${BaseApiUrl}/posts?title=${title}`);
  return response.data;
};

const getPostBySlug = async (slug) => {
  const response = await axios.get(`${BaseApiUrl}/posts?slug=${slug}`);
  return response.data;
};

const deletePost = async (id) => {
  await axios.delete(`${BaseApiUrl}/posts/${id}`);
  return id;
};

const createPost = async ({ title, content, image, description, category }) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("image", image);
  formData.append("description", description);
  formData.append("category", category);

  const response = await axios.post(`${BaseApiUrl}/posts`, formData, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
  return response.data;
};

const updatePost = async ({
  id,
  title,
  content,
  image,
  description,
  category,
}) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("image", image);
  formData.append("description", description);
  formData.append("category", category);

  const response = await axios.patch(`${BaseApiUrl}/posts/${id}`, formData, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
  return response.data;
};

const getPostsInfinite = async ({ pageParam = 1 }) => {
  const response = await axios.get(
    `${BaseApiUrl}/posts?paging=true&page=${pageParam}&limit=3`
  );
  return response.data;
};

const getPostsPaging = async ({ page, limit }) => {
  const response = await axios.get(
    `${BaseApiUrl}/posts?paging=true&page=${page}&limit=${limit}`
  );
  return response.data;
};

const getTotalPosts = async () => {
  const response = await axios.get(`${BaseApiUrl}/posts`);
  return response.data.totalDocs;
};

export {
  getPosts,
  deletePost,
  getPostById,
  createPost,
  updatePost,
  getPostByCategoryName,
  getPostByKeyword,
  getPostBySlug,
  getPostsInfinite,
  getPostsPaging,
  getTotalPosts,
};
