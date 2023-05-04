import HeaderRider from "./headerRider";
import './index.css'
import './profilerider.css' 
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import axios from 'axios';

function ProfileRider() {



  const [username, setUsername] = useState('');
  const [profileInfo, setProfileInfo] = useState('');
  const [jwtToken, setJWTToken] = useState('');
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 
  const [cardFirstName, setCardFirstName] = useState(''); 
  const [cardLastName, setCardLastName] = useState(''); 
  const [cardLastFour, setCardLastFour] = useState('');
  const [cardId, setCardID] = useState('');  
  const [paymentMethods, setPaymentMethods] = useState([]);  
  const [email, setEmail] = useState(''); 
  const [address, setAddress] = useState(''); 
  const [dob, setDOB] = useState(''); 
  const [gender, setGender] = useState(''); 
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
        setJWTToken(sessionToken)
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
        .get('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/user/payment', {
          headers: {
            "Authorization": sessionToken
          }
        })
        .then((res) => {
          console.log(res);
          if(res.data.length > 0) {
            setPaymentMethods(res.data);
          }
        })
        .catch((err) => {
            console.error('Error:', err);
        });
      })      
    })
  }, []);
    /*const firstName = 'Toby'
    const lastName = 'Savage'
    const email = 'ts3496@columbia.edu'
    const address = '215 W 108th'
    const dob = 'Aug 18st 1998'
    const gender = 'Male'
    const backgroundCheckStatus = 'Approved'*/
    function deletePaymentMethod(payment_id) {

      // https://technology.customink.com/blog/2019/08/16/authorization-with-api-gateway-and-congito/
      axios
      .delete('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/user/payment/' + payment_id, {
        headers: {
          "Authorization": jwtToken
        }
      })
      .then((res) => {
          console.log(res);
          document.getElementById("payment_method_"+payment_id).remove();
      })
      .catch((err) => {
          console.error('Error:', err);
      });
    }


    return (
      <div>
        <HeaderRider></HeaderRider>
        <div className='profile-container'>
          <div className="profile-info">
            
            <h1>{firstName} {lastName}'s Profile</h1>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>Address: {address}</p>
            <p>Date of Birth: {dob}</p>
            <p>Gender: {gender}</p>
          </div>
          <Link to="/editprofileRider">
            <button className="edit-btn">Edit</button>
          </Link>
        </div>
        <div className='profile-payment-container'>
          <div className="profile-payment-info">
            
            <ul>
              {
                paymentMethods.map(function(paymentMethod) {
                  return (
                    <li id={"payment_method_"+paymentMethod.payment_id}>
                      {paymentMethod.first_name} {paymentMethod.last_name} ({paymentMethod.last_four})
                        <button className="edit-btn" onClick={() => deletePaymentMethod(paymentMethod.payment_id)}>Delete Payment Method</button>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <Link to="/addPaymentMethod">
            <button className="edit-btn">Add New Payment</button>
          </Link>
        </div>
      </div>
    );

  }
  
  export default ProfileRider;
  