import axios from "axios";
import { BaseApiUrl } from "../utils/BaseApiUrl";

const getComments = async () => {
  const response = await axios.get(`${BaseApiUrl}/comments`);
  return response.data;
};

const getCommentById = async (id) => {
  const response = await axios.get(`${BaseApiUrl}/comments/${id}`);
  return response.data;
};

const getCommentByPostId = async (id) => {
  const response = await axios.get(`${BaseApiUrl}/comments/post/${id}`);
  return response.data.docs;
};

const deleteComment = async (id) => {
  await axios.delete(`${BaseApiUrl}/comments/${id}`);
  return id;
};

const createComment = async ({ comment, post }) => {
  // const post = postId;
  const response = await axios.post(`${BaseApiUrl}/comments`, {
    comment,
    post,
  });
  return response.data;
};

const getCommentsPaging = async ({ page, limit }) => {
  const response = await axios.get(
    `${BaseApiUrl}/comments?paging=true&page=${page}&limit=${limit}`
  );
  return response.data;
};

const getTotalComments = async () => {
  const response = await axios.get(
    `${BaseApiUrl}/comments`
  );
  return response.data.totalDocs;
};

export {
  getComments,
  getCommentById,
  getCommentByPostId,
  createComment,
  deleteComment,
  getTotalComments,
  getCommentsPaging
};
