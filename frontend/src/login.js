import React, { useState } from "react";
import './login.css';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(`Username: ${username}, Password: ${password}`);
    };
  
    return (
      <div className="login">
        <h1>Drifter</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
  
    export default Login;
  