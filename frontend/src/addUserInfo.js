import React, { useState } from 'react';
import Header from './header';
import { Link, json } from "react-router-dom";
import './addUserInfo.css'
import { Auth } from 'aws-amplify';
import axios from 'axios';



const UserInfo = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [user, setUser] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      address,
      city,
      country,
      zip,
      dateOfBirth,
      gender,
      user
    });

    Auth.currentAuthenticatedUser()
    .then( auth_user => {
      auth_user.getSession((err, session) => {
        if (err) {
          throw new Error(err);
        }
        const username = auth_user.username
        const sessionToken = session.getIdToken().jwtToken;
        const submitValues = {firstName: firstName, lastName: lastName, address: address, city: city, country: country, zip: zip, dob: dateOfBirth, gender: gender}
        
        axios.put('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/user/' + username, submitValues,
        {headers: {
          "Authorization": sessionToken
        }}
        )
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to add user information');
            }

          })
          .catch(error => {
            console.log(error.message);
          })

        })

      })

    if (user === 'Rider'){
      window.location.href = '/addFirstPaymentMethod';
    }
    else if (user === 'Driver'){
      window.location.href = '/addDriverInfo';
    }

  };

  return (
    <div>
    <Header></Header>
    <form onSubmit={handleSubmit}>
      <br></br>
      <h2>Please insert information before you get drifting</h2>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
      </label>
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
      </label>
      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required/>
      </label>
      <label>
        City:
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required/>
      </label>
      <label>
        Country:
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required/>
      </label>
      <label>
        Zip:
        <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} required/>
      </label>
      <label>
        Date of Birth:
        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required/>
      </label>
      <div className='radio-div'>
        <input type="radio" value="Driver" name="user" onChange={(e) => setUser(e.target.value)} required/> Driver
        <input type="radio" value="Rider" name="user" onChange={(e) => setUser(e.target.value)} required/> Rider
      </div>
      <label htmlFor="gender">Gender:</label>
              <select id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">-- Please select --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                </select>
      <div>
        <Link to="/">
          <button>Back</button>
        </Link>
        <button type="submit">Next</button>
      </div>
    </form>
    </div>
  );
};

export default UserInfo;
