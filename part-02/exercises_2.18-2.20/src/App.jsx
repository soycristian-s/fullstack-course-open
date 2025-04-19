import { useState, useEffect } from "react";
import countryService from "./services/countries";

const CountryDetail = ({ country }) => {
  const [mostrar, setMostrar] = useState(false);
  const toggle = () => setMostrar(!mostrar);

  return (
    <div>
      {country.name.common}
      <button onClick={toggle}>Show</button>
      {mostrar && (
        <div>
          <h1>{country.name.official}</h1>
          <p>Capital {country.capital[0]}</p>
          <p>Area {country.area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages).map((lan) => (
              <li key={lan}>{lan}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.flags.alt}></img>
        </div>
      )}
    </div>
  );
};

const CountriesDisplay = ({ filteredCountries }) => {
  const [tempData, setTempData] = useState({});
  useEffect(() => {
    if (filteredCountries.length === 1) {
      countryService
        .getWeather(filteredCountries[0].capital[0])
        .then((response) => {
          setTempData(response.data);
          // console.log(response.data.weather[0].icon)
        });
    }
  }, [filteredCountries]);

  if (filteredCountries === 250) {
    return <p>Please enter a filter</p>;
  } else if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <div>
        {filteredCountries.map((cou) => (
          <CountryDetail key={cou.ccn3} country={cou}></CountryDetail>
        ))}
      </div>
    );
  } else if (filteredCountries.length === 1) {
    let oneCountry = filteredCountries[0];
    let countryLanguages = Object.values(oneCountry.languages);

    return (
      <div>
        <h1>{oneCountry.name.official}</h1>
        <p>Capital {oneCountry.capital[0]}</p>
        <p>Area {oneCountry.area}</p>
        <h2>Languages</h2>
        <ul>
          {countryLanguages.map((lan) => (
            <li key={lan}>{lan}</li>
          ))}
        </ul>
        <img src={oneCountry.flags.png} alt={oneCountry.flags.alt}></img>
        <h2>Weather in {oneCountry.capital[0]}</h2>
        {tempData.main ? (<>
          <p>Temperature {tempData.main.temp} Celsius.</p>
          <img src={`https://openweathermap.org/img/wn/${tempData.weather[0].icon}@2x.png`}></img>
          <p>Wind {tempData.main.temp} m/s.</p>
          </>) : (<>
          <p>Loading data</p>
          </>)}
      </div>
    );
  } else {
    return <p>Please enter another filter</p>;
  }
};

const App = () => {
  const [listCountries, setListCountries] = useState([]);
  const [newCountry, setNewCountry] = useState("a new country");

  useEffect(() => {
    countryService.getAllCountries().then((response) => {
      setListCountries(response.data);
    });
  }, []);

  const handleNewCountry = (e) => setNewCountry(e.target.value);

  const filteredCountries = listCountries.filter((Country) =>
    Country.name.common.toLowerCase().includes(newCountry.toLowerCase())
  );

  useEffect(() => {
    countryService.getWeather("Guatemala City").then((response) => {
      // console.log(response.data.main.temp, "clima");
      // const clima = response.data
    });
  }, []);

  return (
    <div>
      <p>
        Countries <input value={newCountry} onChange={handleNewCountry} />
      </p>
      <CountriesDisplay
        filteredCountries={filteredCountries}
      ></CountriesDisplay>
    </div>
  );
};

export default App;
