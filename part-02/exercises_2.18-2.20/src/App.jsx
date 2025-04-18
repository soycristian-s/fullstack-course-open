import Note from "./components/Note";
import { useState, useEffect } from "react";
import countryService from "./services/countries";

const App = () => {
  const [listCountries, setListCountries] = useState([]);
  const [newCountry, setNewCountry] = useState("a new country");
  const [errorMessage, setErrorMessage] = useState("some error happened...");

  useEffect(() => {
    countryService.getAllCountries().then((response) => {
      setListCountries(response.data);
      // console.log(response.data[168]);
      // console.log(listCountries[168].name)
    });
  }, []);

  const handleNewCountry = (e) => setNewCountry(e.target.value);

  const filteredCountries = listCountries.filter((Country) =>
    Country.name.common.toLowerCase().includes(newCountry.toLowerCase())
  );
  // console.log(filteredCountries.length);

  let countriesToShow;

  if (newCountry === "") {
    countriesToShow = <p>Please enter a filter</p>;
  } else if (filteredCountries.length > 10) {
    countriesToShow = <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    countriesToShow = (
      <div>
        {filteredCountries.map((Cou) => (
          <div key={Cou.ccn3}> {Cou.name.common}</div>
        ))}
      </div>
    );
  } else if (filteredCountries.length === 1) {
    let oneCountry = filteredCountries[0];
    let countryLanguages = Object.values(oneCountry.languages);
    countriesToShow = (
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
      </div>
    )
  } else {
    countriesToShow = <p>Please enter another filter</p>;
  }

  return (
    <div>
      <p>
        Countries <input value={newCountry} onChange={handleNewCountry} />
      </p>
      {countriesToShow}
    </div>
  );
};

export default App;
