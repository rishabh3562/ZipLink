import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";

import { proxy } from "./proxy";
import Generator from "./components/Generator";
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
    
    <Generator/>
      
      </>
  );
}

export default App;
