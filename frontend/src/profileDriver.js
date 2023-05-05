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
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [address, setAddress] = useState(''); 
  const [dob, setDOB] = useState(''); 
  const [gender, setGender] = useState(''); 
  const [backgroundCheckStatus, setBackgroundCheckStatus] = useState(''); 

  const [driversLicense, setDriversLicense] = useState('');
  const [carLicensePlate, setCarLicensePlate] = useState('');
  const [carColor, setCarColor] = useState('');
  const [carModel, setCarModel] = useState('');
  const [ssn, setSsn] = useState('');

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
        // https://technology.customink.com/blog/2019/08/16/authorization-with-api-gateway-and-congito/
        axios
        .get('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/user/' + user.username, {
          headers: {
            "Authorization": sessionToken
          }
        })
        .then((res) => {
            console.log(res);
            if(res.data.length > 0) {
              user = res.data[0]
              setFirstName(user["first_name"]);
              setLastName(user["last_name"]);
              setEmail(user["email"])
              setDOB(user["dob"])
              setGender(user["gender"])
              if (user["address_id"]) {
                setAddress(user["street_name_and_number"] + " " + user["city"] + " " +user["country"] + " " + user["zip_code"]);
              }
            }
            setProfileInfo(JSON.stringify(res.data));
        })
        .catch((err) => {
            console.error('Error:', err);
        });

        axios
        .get('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/driver', {
          headers: {
            "Authorization": sessionToken
          }
        })
        .then((res => {
          console.log(res)
          const data = res['data']
          setBackgroundCheckStatus(data['background_check_complete'])
          setDriversLicense(data['dln'])
          setSsn(data['ssn'])
        }))
        .catch((err) => {
          console.error('Error: ', err)
        })

        axios
        .get('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/driver/car', {
          headers: {
            "Authorization": sessionToken
          }
        })
        .then((res => {
          console.log(res)
          const data = res['data']
          setCarColor(data['car_color'])
          setCarModel(data['car_model'])
          setCarLicensePlate(data['car_license_no'])
          
        }))
        .catch((err) => {
          console.error('Error: ', err)
        })

      })      
    })
  }, []);


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
            <p>Drivers license number: {driversLicense}</p>
            <p>SSN: {ssn}</p>
            <p>Car license plate: {carLicensePlate}</p>
            <p>Car color: {carColor}</p>
            <p>Car model: {carModel}</p>
            
          </div>
          <Link to="/editprofileDriver">
            <button className="edit-btn">Edit</button>
          </Link>
        </div>
      </div>
    );

  }
  
  export default ProfileDriver;
  