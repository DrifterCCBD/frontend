import React, { useState } from "react";
import './login.css';
import './index.css'
import { Amplify, Auth, Hub } from 'aws-amplify';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function logout() {
    Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
};
  
export default logout;
