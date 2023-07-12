import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";
import { proxy } from "./proxy";
function App() {
  const [count, setCount] = useState([1, 2, 3]);
  const [error, seterror] = useState("none");
  useEffect(() => {
    const first = axios.get(`${proxy.url}/hello`);
    // console.log(first);
    return () => {
      first
        .then((res) => {
          console.log(res.data);
          setCount(res.data);
        })
        .catch((err) => {
          console.log(err);
          seterror(JSON.stringify(err));
        });
    };
  }, []);

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <h1>Count[0]:{count[0]}</h1>
      <h3>error:{error}</h3>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
