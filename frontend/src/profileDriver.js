import HeaderDriver from "./headerDriver";
import './index.css'
import './profiledriver.css'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function ProfileDriver() {
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
  