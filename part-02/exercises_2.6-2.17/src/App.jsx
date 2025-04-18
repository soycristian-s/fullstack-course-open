import { useState, useEffect } from "react";
import phonebookService from "./services/numbers";
import Notification from "./components/Notification";

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

const PersonDisplay = ({ personList, handler }) => {
  return personList.map((person) => (
    <div key={person.id}>
      <strong>Name:</strong> {person.name} <strong>Number:</strong>{" "}
      {person.number}
      <button onClick={(e) => handler(e, person)}>Delete</button>
    </div>
  ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [notiName, setNotiName] = useState("");
  const [servError, setServError] = useState(false);

  useEffect(() => {
    phonebookService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleFilterBy = (e) => {
    const nameFilter = e.target.value;
    return setFilterBy(nameFilter);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const handleNotification = (name) => {
      setNotiName(name);
      setTimeout(() => {
        setNotiName("");
      }, 3000);
    };

    let newPerson = { name: newName, number: newNumber };
    if (!persons.some((person) => person.name === newName)) {
      setNewName("");
      setNewNumber("");
      phonebookService.create(newPerson).then((data) => {
        setPersons(persons.concat(data));
        handleNotification(data.name);
      });
    } else {
      if (
        confirm(
          `${newName} ya se ingresó, reemplazamos el antiguo numero con el nuevo?`
        )
      ) {
        const personToUpdate = persons.filter(
          (person) => person.name === newName
        )[0];
        newPerson = { ...personToUpdate, number: newNumber };
        setNewName("");
        setNewNumber("");
        phonebookService
          .updateNumber(newPerson)
          .then((data) => {
            console.log(data);
            handleNotification(data.name);
            let newPersons = persons.map((p) => (p.id === data.id ? data : p));
            console.log(newPersons);
            setPersons(newPersons);
          })
          .catch(() => {
            setServError(true);
            handleNotification(newName);
          });
      }
    }
  };

  const personsToShow = filterBy
    ? persons.filter((p) =>
        p.name.toLowerCase().includes(filterBy.toLowerCase())
      )
    : persons;

  const removePerson = (e, person) => {
    e.preventDefault();
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      phonebookService.deleteNumber(person.id).then((deletedPerson) => {
        setPersons(persons.filter((p) => p.id !== deletedPerson.id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterSeccion inputs={[filterBy, handleFilterBy]}></FilterSeccion>
      <h2>Add a New</h2>
      <Notification error={servError} user={notiName}></Notification>
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
      <PersonDisplay
        personList={personsToShow}
        handler={removePerson}
      ></PersonDisplay>
    </div>
  );
};

export default App;
