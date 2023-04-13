import HeaderRider from "./headerRider";
import './index.css'
import './profilerider.css' 
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function ProfileRider() {
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

    const firstName = 'Toby'
    const lastName = 'Savage'
    const email = 'ts3496@columbia.edu'
    const address = '215 W 108th'
    const dob = 'Aug 18st 1998'
    const gender = 'Male'
    const backgroundCheckStatus = 'Approved'

    return (
      <div>
        <HeaderRider></HeaderRider>
        <div className='profile-container'>
          <div className="profile-info">
            <h1>{firstName} {lastName}'s Profile</h1>
            <p>Email: {email}</p>
            <p>Address: {address}</p>
            <p>Date of Birth: {dob}</p>
            <p>Gender: {gender}</p>
            <p>Background Check Status: {backgroundCheckStatus}</p>
          </div>
          <Link to="/editprofileRider">
            <button className="edit-btn">Edit</button>
          </Link>
        </div>
      </div>
    );

  }
  
  export default ProfileRider;
  