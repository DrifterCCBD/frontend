import React, { useState } from "react";
import './login.css';
import './index.css'
import { Amplify, Auth, Hub } from 'aws-amplify';

import {Link} from "react-router-dom";


function Login() {
    return (
      <div className="login">
        <h1>Drifter</h1>
        <button onClick={() => Auth.federatedSignIn()}>
        Sign Up Via Cognito Hosted UI
        </button>
      </div>
    );
  }
  
    export default Login;

  