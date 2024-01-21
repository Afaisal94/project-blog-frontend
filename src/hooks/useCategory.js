import axios from "axios";
import { BaseApiUrl } from "../utils/BaseApiUrl";

const getCategories = async () => {
  const response = await axios.get(`${BaseApiUrl}/categories`);
  return response.data;
};

const getCategoryById = async (id) => {
  const response = await axios.get(`${BaseApiUrl}/categories/${id}`);
  return response.data;
};

const deleteCategory = async (id) => {
  await axios.delete(`${BaseApiUrl}/categories/${id}`);
  return id;
};

const createCategory = async ({ name }) => {
  const response = await axios.post(`${BaseApiUrl}/categories`, {
    name,
  });
  return response.data;
};

const updateCategory = async ({ id, name }) => {
  const response = await axios.patch(`${BaseApiUrl}/categories/${id}`, {
    name,
  });
  return response.data;
};

const getCategoriesPaging = async ({ page, limit }) => {
  const response = await axios.get(
    `${BaseApiUrl}/categories?paging=true&page=${page}&limit=${limit}`
  );
  return response.data;
};

const getTotalCategories = async () => {
  const response = await axios.get(
    `${BaseApiUrl}/categories`
  );
  return response.data.totalDocs;
};

export {
  getCategories,
  getCategoriesPaging,
  deleteCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  getTotalCategories
};
