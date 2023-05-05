import HeaderDriver from "./headerDriver";
import './headerDriver.css'
import './index.css'
import './createTripDriver.css'
import React, { useState, useEffect } from 'react';
import { Auth } from "aws-amplify";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function EditTripDriver() {

  const [userToken, setUserToken] = useState("");
  const [tripFormValues, setTripFormValues] = useState({
    origin: "",
    destination: "",
    date: "",
    time: "",
    maxCapacity: "",
    price: ""
  })

  const { tripID } = useParams();

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
        setUserToken(sessionToken)


        axios
        .get('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/trip/' + tripID, {
          headers: {
            "Authorization": sessionToken
          }
        })
        .then((res) => {
          const trip = JSON.parse(res.data.body)
          console.log("trip is", trip)
          setTripFormValues({
            origin: trip.origin != null ? trip.origin : "",
            destination: trip.destination != null ? trip.destination : "",
            date: trip.start_date != null ? trip.start_date : "",
            time: trip.start_time != null ? trip.start_time : "",
            maxCapacity: trip.max_capacity != null ? trip.max_capacity : "",
            price: trip.price != null ? trip.price : ""
          });

        })


      })
    })
  }, []);
    


    function handleInputChange(event) {
      const { name, value } = event.target;
      setTripFormValues({ ...tripFormValues, [name]: value });
    }

    function handleSubmit(event) {
      event.preventDefault();
      const tripValues = { ...tripFormValues };
    
      console.log("handlesubmit", tripValues);
    
      const updateTrip = axios.put(
        "https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/trip/" + tripID,
        tripValues,
        {
          headers: {
            Authorization: userToken,
          },
        }
      );

    
      Promise.all([updateTrip])
        .then((responses) => {
          const failedRequests = responses.filter(
            (response) => response && response.status !== 200
          );
          if (failedRequests.length === 0) {
            window.location.href = "/mytripsDriver";
          } else {
            throw new Error("Failed to update trip information");
          }
        })
        .catch((error) => {
            console.log(error.message)
          alert(
            "Error saving trip information. Please make sure you entered everything correctly and try again"
          );
        })
    
      return false;
    }
    

    return (
      <div>
        <HeaderDriver></HeaderDriver>
        <div className="header-create-trip">
          <h1>Edit your trip</h1>
        </div>

        <form id="createTripForm" onSubmit={handleSubmit}>
          <label for="origin">Origin:</label>
          <input type="text" id="origin" name="origin" value={tripFormValues.origin} onChange={handleInputChange} required/>

          <label for="destination">Destination:</label>
          <input type="text" id="destination" name="destination" value={tripFormValues.destination} onChange={handleInputChange} required/>

          <label for="date">Date of travel:</label>
          <input type="date" id="date" name="date" value={tripFormValues.date} onChange={handleInputChange} required/>

          <label for="time">Time of travel:</label>
          <input type="time" id="time" name="time" value={tripFormValues.time} onChange={handleInputChange} required/>

          <label for="maxCapacity">Max capacity:</label>
          <input type="number" id="maxCapacity" name="maxCapacity" value={tripFormValues.maxCapacity} onChange={handleInputChange} required/>

          <label for="price">Price (USD):</label>
          <input type="number" id="price" name="price" value={tripFormValues.price} onChange={handleInputChange} required/>

        
          <div>
            <Link to="/myTripsDriver">
                <button>Back</button>
            </Link>
            <button type="submit" onClick={handleSubmit}>Save</button>
            </div>


        </form>
      </div>
    );
  }
  
  export default EditTripDriver;
  