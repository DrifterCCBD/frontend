import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import Header from './header';

function Frontpage() {

  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    Auth.currentAuthenticatedUser()
    .then( user => {
      setFirstName(user.first_name);
    })
  })


    return (
        <div className="App">
            <div className="frontpage">
              <div>
                <h1 className="frontpage-title">
                  Welcome to Drifter!
                </h1>
              </div>
            <div>
              <h2 className='frontpage-undertitle'>
                Share a ride today!
              </h2>
            </div>
            <div className="buttons">
            {firstName ? (
              <Link to="/availableRoutesRider">
                <button className="frontpage-button">
                  Get drifting 
                  <FontAwesomeIcon icon={faArrowRight} className="right-arrow"/>
                </button>
              </Link>
            ) : (
              <Link to="/insertInfo">
                <button className="frontpage-button">
                  Get drifting
                  <FontAwesomeIcon icon={faArrowRight} className="right-arrow"/>
                </button>
              </Link>
            )}
          </div>
            {/* <div className="buttons">
                <Link to="/mytripsDriver">
                <button className="frontpage-button">For drivers 
                  <FontAwesomeIcon icon={faArrowRight} className="right-arrow"/>
                </button>
              </Link>
            </div> */}
          </div>
        </div>
    );
  }
  
  export default Frontpage;
  
