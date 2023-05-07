import HeaderDriver from "./headerDriver";
import './headerDriver.css'
import './index.css'
import './createTripDriver.css'
import React, { useState } from 'react';
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";

function CreateTripDriver() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [DateOfTravel, setDateOfTravel] = useState('');
  const [timeOfTravel, setTimeofTravel] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [price, setPrice] = useState('');


    const handleSubmit = (e) => {
      e.preventDefault();

      Auth.currentAuthenticatedUser()
      .then(user => {
        user.getSession((err, session) => {
          if (err){
            throw new Error(err);
          }
          const sessionToken = session.getIdToken().jwtToken;
          const tripData = {origin: origin, destination: destination, date: DateOfTravel, time: timeOfTravel, number: maxCapacity, price: price}

          fetch('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/trip', {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionToken
          },
          body: JSON.stringify(tripData)
          })
          .then(response => response.json())
          .then(data => {
            console.log('Trip created:', data);
            alert('Trip created successfully!');
            window.location.href = '/mytripsDriver';
          })
          .catch(error => {
            console.error('Error creating trip:', error);
            alert('Error creating trip, please try again');
          });

        })
      })

    }
    
    

    return (
      <div>
        <HeaderDriver></HeaderDriver>
        <div className="header-create-trip">
          <h1>Create a new trip</h1>
        </div>

        <form id="createTripForm" onSubmit={handleSubmit}>
          <label for="origin">Origin:</label>
          <input type="text" id="origin" name="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} required/>

          <label for="destination">Destination:</label>
          <input type="text" id="destination" name="destination" value={destination} onChange={(e) => setDestination(e.target.value)} required/>

          <label for="date">Date of travel:</label>
          <input type="date" id="date" name="date" value={DateOfTravel} onChange={(e) => setDateOfTravel(e.target.value)} required/>

          <label for="time">Time of travel:</label>
          <input type="time" id="time" name="time" value={timeOfTravel} onChange={(e) => setTimeofTravel(e.target.value)} required/>

          <label for="number">Max capacity:</label>
          <input type="number" id="number" name="number" value={maxCapacity} onChange={(e) => setMaxCapacity(e.target.value)} required/>

          <label for="number">Price (USD):</label>
          <input type="number" id="number" name="number" value={price} onChange={(e) => setPrice(e.target.value)} required/>

          <div>
            <Link to="/mytripsDriver">
              <button>Back</button>
            </Link>
            <input style={{ cursor: 'pointer' }} type="submit" value="Create trip"/>
          </div>
          
          


        </form>
      </div>
    );
  }
  
  export default CreateTripDriver;
  