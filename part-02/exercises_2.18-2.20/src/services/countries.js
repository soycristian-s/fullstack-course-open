import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = () => {
  return axios.get( `${baseUrl}/all`);
};
const getCountry = (name) => {
  return axios.get(`${baseUrl}/name1/${name}`);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

export default { getAllCountries, getCountry, create, update };
