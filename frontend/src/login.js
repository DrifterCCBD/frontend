import React, { useState } from "react";
import './login.css';
import './index.css'
import {Link} from "react-router-dom";

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
            <br/>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <br />
          <br/>
          <label>
            Password:
            <br/>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <br />
          <Link to="/mytrips">
            <button type="submit">Login</button>
          </Link>
        </form>

        <div className="register">
          <p>Don't have an account?</p>
        </div>
        <Link to="/register">
          <button>Sign up</button>
        </Link>
      </div>
    );
  }
  
    export default Login;

  