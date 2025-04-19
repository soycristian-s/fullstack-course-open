import axios from "axios";
const dataBaseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const wheatherUrl = "https://api.openweathermap.org/";
const apiKey = import.meta.env.VITE_API_KEY;

const getAllCountries = () => {
  return axios.get(`${dataBaseUrl}/all`);
};
const getCountry = (name) => {
  return axios.get(`${dataBaseUrl}/name1/${name}`);
};

const getWeather = (city) => {
  return axios.get(`${wheatherUrl}data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
};

const getWeatherIcon = (id) => {
  return axios.get(`${wheatherUrl}img/wn/${id}@2x.png`);
};

export default { getAllCountries, getCountry, getWeather };
