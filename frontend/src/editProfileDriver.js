import HeaderDriver from "./headerDriver";
import './headerDriver.css'
import './index.css'
import './editprofileDriver.css'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function EditprofileDriver() {
    // TO DO: get from db

    const [userData, setUserData] = useState(null);
    const [formValues, setFormValues] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);
  
    useEffect(() => {
      fetch('https://example.com/api/user')
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => console.error(error));
    }, []);
  
    useEffect(() => {
      if (userData) {
        setFormValues({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          address: userData.address,
          dob: userData.dob,
          gender: userData.gender,
        });
      }
    }, [userData]);
  
    function handleInputChange(event) {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      setIsSubmitting(true);
  
      fetch('https://example.com/api/user', {
        method: 'PUT',
        body: JSON.stringify(formValues),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update user information');
          }
          setSubmitSuccess(true);
        })
        .catch(error => {
          setSubmitError(error.message);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  
    // if (!userData) {
    //   return <div>Loading...</div>;
    // }
  
    // const { firstName, lastName, email, address, dob, gender } = formValues;

    // TODO: get rid of hardcoded values
    const firstName = 'Helena'
    const lastName = 'Jonsdottir'
    const email = 'hsj2115@columbia.edu'
    const address = '1234 Avenue 8'
    const dob = '1998-08-31'
    const gender = 'Female'

  
    return (
      <div>
        <HeaderDriver />
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" name="firstName" value={firstName} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName" value={lastName} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={email} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <textarea id="address" name="address" value={address} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" id="dob" name="dob" value={dob} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select id="gender" name="gender" value={gender} onChange={handleInputChange} required>
                <option value="">-- Please select --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                </select>
            </div>
            <div>
            <Link to="/profileDriver">
                <button>Back</button>
            </Link>
            <Link to="/profileDriver">
                <button type="submit">Save</button>
            </Link>
            </div>
        </form>
        </div>
    </div>
    );
  }
  
  export default EditprofileDriver;
  
