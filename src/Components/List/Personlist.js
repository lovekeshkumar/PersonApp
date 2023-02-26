import React, { useState, useEffect } from "react";
import axios from "axios";
import EditPersonForm from "../Edit/EditPersonForm";
import "./index.css";

function PersonList() {
  const [persons, setPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    axios.get("https://reqres.in/api/users").then((response) => {
      setPersons(response.data.data);
    });
  }, []);

  const handleEditClick = (person) => {
    setSelectedPerson(person);
  };

  const handlePersonUpdate = (updatedPerson) => {
    axios
      .put(`https://reqres.in/api/users/${updatedPerson.id}`, updatedPerson)
      .then(() => {
        const updatedPersons = persons.map((person) =>
          person.id === updatedPerson.id ? updatedPerson : person
        );
        setPersons(updatedPersons);
        setSelectedPerson(null);
      });
  };

  return (
    <div className="container">
      {persons.map((person) => (
        <div className="person-card" key={person.id}>
          <img src={person.avatar} alt="avatar" />
          <h2 onClick={() => handleEditClick(person)}>
            {person.first_name + " " + person.last_name}
          </h2>
          <p>Age: {person.age}</p>
          <p>Date of Birth: {person.dob}</p>
          <p>Country: {person.country}</p>
        </div>
      ))}
      {selectedPerson && (
        <div>
          <EditPersonForm
            selectedPerson={selectedPerson}
            handlePersonUpdate={handlePersonUpdate}
            setSelectedPerson={setSelectedPerson}
          />
        </div>
      )}
    </div>
  );
}

export default PersonList;
