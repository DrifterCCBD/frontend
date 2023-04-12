import HeaderDriver from "./headerDriver";
import { Auth } from 'aws-amplify';
import axios from 'axios';


import React, { useEffect, useState } from 'react';

import './index.css';


function ProfileDriver() {
  const [username, setUsername] = useState('');
  const [profileInfo, setProfileInfo] = useState('');
  const [jwtToken, setJWTToken] = useState('');
  /*
  useEffect(() => {
    
    Auth.currentUserCredentials().then(response => {
      console.log(response);
    })
    .catch((err) => {
      console.error('Error:', err);
  });
  }, []);*/
  useEffect(() => {
    Auth.currentSession().then(res=>{
      let accessToken = res.getAccessToken()
      let jwt = accessToken.getJwtToken()
          
      //You can print them to see the full objects
      console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
      console.log(`myJwt: ${jwt}`)
      setJWTToken(jwt)
      Auth.currentUserInfo().then(response => {
        setUsername(response.username);
        console.log(response);
        
        axios
        .get('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/user/' + response.username, {
          headers: {
            "Authorization": jwtToken
          }
        })
        .then((res) => {
            console.log(res);
            setProfileInfo(JSON.stringify(res.data));
        })
        .catch((err) => {
            console.error('Error:', err);
        });
      })      
      .catch((err) => {
            console.error('Error:', err);
        });
    })
  }, []);


    return (
      <div>
        <HeaderDriver></HeaderDriver>
        <h1>Profile Page</h1>
        Currently Logged In as: {username} - {profileInfo}
        {/* Add your code here*/}
      </div>
    );
  }
  
  export default ProfileDriver;
  