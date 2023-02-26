import React from "react";
import PersonForm from "./Components/Person/PersonForm";
import PersonList from "./Components/List/Personlist";
import "./App.css";

function App() {
  return (
    <div className="App">
      <PersonForm />
      <PersonList />
    </div>
  );
}

export default App;
