import React, { useState, useEffect } from "react";
import "./generator.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { proxy } from "../proxy";
import axios from "axios";
const Generator = () => {
  // const [promise, setpromise] = useState("Loading...")
  const [shortId, setshortId] = useState("");
  const [messageState, setMessageState] = useState(1);
  const [messageObj, setmessageObj] = useState({
    0: "Error",
    1: "Loading...",
    2: "Success",
  });
  const [resError, setresError] = useState("");
  const [message, setmessage] = useState(
    resError ? resError : messageObj[messageState]
  );
  const [webLink, setwebLink] = useState("www.zaplink.com");

  const handleRedirect = (id) => {
    const axiosConfig = {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5713", // Replace with your frontend URL and port
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Replace with the allowed methods on your server
        "Access-Control-Allow-Headers": "Content-Type, Authorization", // Replace with the allowed headers on your server
      },
    };

    axios
      .get(`${proxy.url}/${id}`, axiosConfig)
      .then((response) => {
        console.log("redirecting");
        console.log(response);
        // window.location.href = response.data.redirectUrl;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const redirectUrl = e.target.redirectUrl.value;

    const axiosConfig = {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5713", // Replace with your frontend URL and port
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Replace with the allowed methods on your server
        "Access-Control-Allow-Headers": "Content-Type, Authorization", // Replace with the allowed headers on your server
      },
    };

    const res = axios.post(`${proxy.url}`, { redirectUrl }, axiosConfig);

    res
      .then((res) => {
        setshortId(res.data ? res.data.id : "Loading...");
        console.log(res.data);
        setMessageState(2);
      })
      .catch((err) => {
        console.log("err:", err);
        setshortId(err);
        setresError(err.response.data.error || err.message);
        setMessageState(0);
      });
  };

  useEffect(() => {
    setmessage(resError ? resError : messageObj[messageState]);

    return () => {
      // cleanup
    };
  }, [messageState, messageObj, shortId, resError]);

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
          {/* promise state: {promise} */}
          message: {message}
          <br />
          redirectUrl:{" "}
          <p className="link" onClick={handleRedirect(shortId)}>
            {`${webLink}/${shortId}`}
          </p>
        </p>
      </div>
    </div>
  );
};

export default Generator;
