import React, { useState } from 'react';
import Header from './header';
import { Link } from "react-router-dom";
import './addUserInfo.css'



const UserInfo = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [driversLicense, setDriversLicense] = useState('');
  const [carLicensePlate, setCarLicensePlate] = useState('');
  const [carColor, setCarColor] = useState('');
  const [carModel, setCarModel] = useState('');
  const [ssn, setSsn] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      address,
      dateOfBirth,
      driversLicense,
      carLicensePlate,
      carColor,
      carModel,
      ssn,
    });
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
        Date of Birth:
        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required/>
      </label>
      <div className='radio-div'>
        <input type="radio" value="Driver" name="gender" required/> Driver
        <input type="radio" value="Rider" name="gender" required/> Rider
      </div>
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
