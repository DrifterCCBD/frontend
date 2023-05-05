import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Frontpage() {

  const [driver, setDriver] = useState('');
  const [rider, setRider] = useState('');
  const [needsInfo, setNeedsInfo] = useState('');
  const [username, setUsername] = useState('');
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    Auth.currentAuthenticatedUser()
    .then( user => {
      console.log(user)
      setUsername(user.username)
      user.getSession((err, session) => {
        if(err) {
          throw new Error(err);
        }
        console.log(session);
        const sessionToken = session.getIdToken().jwtToken;
        setUserToken(sessionToken)
        // https://technology.customink.com/blog/2019/08/16/authorization-with-api-gateway-and-congito/
        axios
        .get('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/user/' + user.username + '/type', {
          headers: {
            "Authorization": sessionToken
          }
        })
        .then((res) => {
            console.log(res);
            setDriver(res['data']['is_driver'])
            setRider(res['data']['is_rider'])

        })
        .catch((err) => {
            console.error('Error:', err);
        });
      })      
    })
  }, []);


    if (driver === 0 & rider === 0){
      setNeedsInfo(true)
    }

    if (driver === 0){
      setDriver(false)
    }
    else if (driver === 1){
      setDriver(true)
    }


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
            {needsInfo ? (
              <Link to="/insertInfo">
                <button className="frontpage-button">
                  Get drifting
                  <FontAwesomeIcon icon={faArrowRight} className="right-arrow"/>
                </button>
              </Link>
            ) : (
              <>
                {driver ? (
                  <Link to="/myTripsDriver">
                    <button className="frontpage-button">
                      Get drifting 
                      <FontAwesomeIcon icon={faArrowRight} className="right-arrow"/>
                    </button>
                  </Link>
                ) : (
                  <Link to="/availableRoutesRider">
                    <button className="frontpage-button">
                      Get drifting 
                      <FontAwesomeIcon icon={faArrowRight} className="right-arrow"/>
                    </button>
                  </Link>
                )}
              </>
            )}

          </div>
          </div>
        </div>
    );
  }
  
  export default Frontpage;
  
