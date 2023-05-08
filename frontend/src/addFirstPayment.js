import HeaderRider from "./headerRider";
import './headerRider.css'
import './index.css'
import './addPaymentMethod.css'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import axios from 'axios';
import Header from "./header";

function AddFirstPayment() {

  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState("");
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);



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
       
      })      
    })
  }, []);
    

  

  
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setIsSubmitting(true);
      var submitValues = {} //{...formValues}c
      console.log(event)
      const data = new FormData(event.currentTarget);
      data.forEach((value, key) => submitValues[key] = value);
      console.log("handlesubmit", submitValues)
      axios.post('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/user/payment', submitValues,
      {headers: {
        "Authorization": userToken
      }}
      )
        .then(response => {
          if (!response.status_code == 200) {
            throw new Error('Failed to update user information');
          }
          setSubmitSuccess(true);
          window.location.href = '/profileRider';
        })
        .catch(error => {
          setSubmitError(error.message);
          console.log(error)
        })
        .finally(() => {
          setIsSubmitting(false);
    

        });
      return false;
    }
  
  
    return (
      <div>
        <Header/>
        <div className="form-container">
          <h1>Add Payment Type</h1>
          <p>You won't be able to request a trip without adding payment information</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" name="firstName"  required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName"   required />
            </div>
            <div className="form-group">
            <label for="card_number">Credit Card Number:</label>
            <input id="card_number" name="card_number" type="tel" inputMode="numeric" pattern="[0-9]&#123;16&#125;" autoComplete="cc-number" maxlength="19" placeholder="xxxx xxxx xxxx xxxx" />  
            </div>
            <div className="form-group">
              <label htmlFor="month">Exp. Month:</label>
              <input type="text" id="month" name="month"  maxLength="2" placeholder="00" required />
            </div>
            <div className="form-group">
              <label htmlFor="Year">Exp Year:</label>
              <input type="text" id="year" name="year" maxLength="2" placeholder="23" required />
            </div>
            <div className="form-group">
            <label for="cvv">CVV</label>
            <input id="cvv" name="cvv" type="tel" inputMode="numeric" pattern="[0-9\s]&#123;3&#125;" autoComplete="cc-cvv" maxLength="3" placeholder="xxx" />  
            </div>
            <div className="form-group">
              <label htmlFor="zip">Zip:</label>
              <input type="text" id="zip" name="zip" required />
            </div>
            <div>
            <Link to="/profileRider">
                <button>Back</button>
            </Link>
              <button type="submit">Save</button>
            </div>
        </form>
        </div>
    </div>
    );

  }
  
  export default AddFirstPayment;
  
