import React ,{useState,useEffect}from "react";
import "./generator.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { proxy } from "../proxy";
import axios from "axios";
const Generator = () => {
const [promise, setpromise] = useState("Loading...")

  const handleSubmit = (e) => {
    e.preventDefault();
    const redirectUrl = e.target.redirectUrl.value;
const res=axios.get(`${proxy.url}/hello`)
    res.then((res)=>{
      setpromise(res.data[0]?res.data[0]:"Loading...")
    }).catch((err)=>{
      setpromise(err)
    })
  };

  return (
    <div className="container">
      <h1 className="title">Url Shortener</h1>
      {/* {id && (
        <div className="url-output">
          <p>
            URL Generated:{" "}
            <a href={`http://localhost:8000/url/${id}`}>
              http://localhost:8000/url/{id}
            </a>
          </p>
        </div>
      )} */}
      <div className="form-container">
        <form action="/url" method="post" onSubmit={handleSubmit}>
          <label htmlFor="redirectUrl">Enter Original URL</label>
          <input
            type="text"
            id="redirectUrl"
            name="redirectUrl"
            placeholder="https://example.com"
          />
          <button type="submit">Generate</button>
        </form>
      </div>
      <div className="form-container">
        <p>
          promise statr: {promise}
        </p>
      </div>
    </div>
  );
};

export default Generator;
