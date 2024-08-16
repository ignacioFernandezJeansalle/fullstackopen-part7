import axios from "axios";
const baseUrl = "/api/blogs";

const getHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (blog, token) => {
  const headers = getHeaders(token);
  const response = await axios.post(baseUrl, blog, headers);

  // No uso el primer response porque no tengo los datos
  // del usuario que devuelve el backend con el populate
  const createdBlog = await getById(response.data.id);
  return createdBlog;
};

const remove = async (id, token) => {
  const headers = getHeaders(token);
  const response = await axios.delete(`${baseUrl}/${id}`, headers);

  return response.data;
};

const update = async (blog, token) => {
  const headers = getHeaders(token);
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, headers);

  // No uso el primer response porque no tengo los datos
  // del usuario que devuelve el backend con el populate
  const updatedBlog = await getById(response.data.id);
  return updatedBlog;
};

const comment = async (id, content) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { content });

  // No uso el primer response porque no tengo los datos
  // del blog que devuelve el backend con el populate
  const updatedBlog = await getById(response.data.blog);
  return updatedBlog;
};

export default { getAll, create, remove, update, comment };
