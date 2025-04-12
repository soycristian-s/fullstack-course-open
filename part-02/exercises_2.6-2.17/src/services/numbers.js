import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const response = axios.get(baseUrl);
  return response.then((resp) => resp.data);
};

const create = (newObject) => {
  const response = axios.post(baseUrl, newObject);
  return response.then((resp) => resp.data);
};

const deleteNumber = (id) => {
  const response = axios.delete(baseUrl + `/${id}`);
  return response.then((resp) => resp.data);
};

const updateNumber = (object) => {
  const response = axios.put(baseUrl + `/${object.id}`, object);
  return response.then((resp) => resp.data);
};

export default { getAll, create, deleteNumber, updateNumber };
