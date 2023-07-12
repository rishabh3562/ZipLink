import React from 'react';
import './generator.css';
const Generator = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
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
    </div>
  );
};

export default Generator;
