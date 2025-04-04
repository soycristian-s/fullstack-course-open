import { useState } from "react";

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
    <div key={person.name}>
      <strong>Name:</strong> {person.name} <strong>Number:</strong>{" "}
      {person.number}
    </div>
  ));
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [showPerson, setShowPerson] = useState([...persons]);

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
