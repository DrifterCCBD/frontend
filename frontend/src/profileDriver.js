import HeaderDriver from "./headerDriver";
import { Auth } from 'aws-amplify';
import axios from 'axios';
import './profiledriver.css'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
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
    Auth.currentAuthenticatedUser()
    .then( user => {
      console.log(user)
      user.getSession((err, session) => {
        if(err) {
          throw new Error(err);
        }
        console.log(session);
        const sessionToken = session.getIdToken().jwtToken;
        // https://technology.customink.com/blog/2019/08/16/authorization-with-api-gateway-and-congito/
        axios
        .get('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/user/' + session.username, {
          headers: {
            "Authorization": sessionToken
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
    })
  }, []);

  // TODO: call endpoint for getting data
    // const [userData, setUserData] = useState(null);

    // useEffect(() => {
    //   fetch('https://example.com/api/user')
    //     .then(response => response.json())
    //     .then(data => setUserData(data))
    //     .catch(error => console.error(error));
    // }, []);

    // if (!userData) {
    //   return <div>Loading...</div>;
    // }

    // const { firstName, lastName, email, address, dob, gender, backgroundCheckStatus } = userData;

    const firstName = 'Helena'
    const lastName = 'Jonsdottir'
    const email = 'hsj2115@columbia.edu'
    const address = '1234 Avenue 8'
    const dob = 'Aug 31st 1998'
    const gender = 'Female'
    const backgroundCheckStatus = 'accepted'

    return (
      <div>
        <HeaderDriver></HeaderDriver>
        <h1>Profile Page</h1>
        Currently Logged In as: {username} - {profileInfo}
        {/* Add your code here*/}
        <div className='profile-container'>
          <div className="profile-info">
            <h1>{firstName} {lastName}'s Profile</h1>
            <p>Email: {email}</p>
            <p>Address: {address}</p>
            <p>Date of Birth: {dob}</p>
            <p>Gender: {gender}</p>
            <p>Background Check Status: {backgroundCheckStatus}</p>
          </div>
          <Link to="/editprofileDriver">
            <button className="edit-btn">Edit</button>
          </Link>
        </div>
      </div>
    );

  }
  
  export default ProfileDriver;
  