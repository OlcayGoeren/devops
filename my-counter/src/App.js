import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [health, setHealth] = useState(false);

  useEffect(() => {
    async function getCounter() {
      const counter = await axios.get(
        `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/counter`
      );
      setCount(counter.data.counter);
    }

    async function apihealth() {
      try {
        const apihealth = await axios.get(
          `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/health`
        );
        apihealth.data.health === true ? setHealth(true) : setHealth(false);  
      } catch (error) {
        console.log(error);
      }
      
    }

    getCounter();
    apihealth();
  }, []);

  async function increment() {
    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/increment`
      );
      setCount(response.data.counter);
    } catch (error) {
      console.log(error);
    }
  }

  async function decrement() {
    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/decrement`
      );
      setCount(response.data.counter);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <p>{process.env.REACT_APP_MESSAGE}</p>
      <p>Connection Status: {health.toString()}</p>
      <p>Counter: {count}</p>
      <button onClick={async () => await increment()}>Increase</button>
      <button onClick={async () => await decrement()}>Decrease</button>
    </div>
  );
}

export default App;
