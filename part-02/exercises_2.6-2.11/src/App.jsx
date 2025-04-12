import { useState, useEffect } from "react";gg
import phonebookService from "./services/numbers";

const FilterSeccion = ({ inputs: [filterBy, handleFilterBy] }) => {
  return (
    <div>
      filter shown with: <input value={filterBy} onChange={handleFilterBy} />
    </div>
  );
};

const PersonForm = ({ handler, children }) => {
  return (
    <form onSubmit={handler}>
      {children}
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const PersonLineForm = ({ inputs: [value, handler], label }) => {
  return (
    <>
      <p>
        {label}: <input value={value} onChange={handler} />
      </p>
    </>
  );
};

const PersonDisplay = ({ personList }) => {
  return personList.map((person) => (
    <div key={person.id}>
      <strong>Name:</strong> {person.name} <strong>Number:</strong>{" "}
      {person.number}
    </div>
  ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [showPerson, setShowPerson] = useState([...persons]);

  useEffect(() => {
    phonebookService.getAll().then((data) => {
      console.log(data, "esta es la solicitud");
      setPersons(data);
      setShowPerson(data);
    });
  }, []);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleFilterBy = (e) => {
    const nameFilter = e.target.value;
    setShowPerson(
      persons.filter((p) =>
        p.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
    );
    return setFilterBy(nameFilter);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (!persons.some((person) => person.name === newName)) {
      setNewName("");
      setNewNumber("");
      setPersons(persons.concat(newPerson));
      setShowPerson(persons.concat(newPerson));

      phonebookService.create(newPerson).then((data) => {
        console.log(data, "Creación");
      });
    } else {
      alert(`${newName} ya se ingresó.`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterSeccion inputs={[filterBy, handleFilterBy]}></FilterSeccion>
      <h2>Add a New</h2>

      <PersonForm handler={addPerson}>
        <PersonLineForm
          label={"name"}
          inputs={[newName, handleNameChange]}
        ></PersonLineForm>
        <PersonLineForm
          label={"number"}
          inputs={[newNumber, handleNumberChange]}
        ></PersonLineForm>
      </PersonForm>

      <h2>Numbers</h2>
      <PersonDisplay personList={showPerson}></PersonDisplay>
    </div>
  );
};

export default App;
