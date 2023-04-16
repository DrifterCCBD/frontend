import HeaderDriver from "./headerDriver";
import './headerDriver.css'
import './index.css'
import './createTripDriver.css'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";

function CreateTripDriver() {
    const location = useLocation();

    useEffect(() => {
      const createTripForm = document.getElementById("createTripForm");
    
      createTripForm.addEventListener("submit", function (event) {
        event.preventDefault()
        const formData = new FormData(createTripForm);

        const tripData = {};
        for (let [key, value] of formData.entries()) {
          tripData[key] = value;
        }
    
        fetch('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/trip', {
          method: 'POST',
          // TODO: add authentication headers
          headers: {
            'Content-Type': 'application/json'
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
      });
    }, []);
    
    


    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const origin = searchParams.get("origin");
      const destination = searchParams.get("destination");
  
      console.log(`Origin: ${origin}, Destination: ${destination}`);
  
      // Set default values for input fields if origin and destination are defined
      if (origin && destination) {
        document.getElementById("origin").value = origin;
        document.getElementById("destination").value = destination;
      }
    }, [location]);

    return (
      <div>
        <HeaderDriver></HeaderDriver>
        <div className="header-create-trip">
          <h1>Create a new trip</h1>
          <p>Pick an existing route or make a new one</p>
          <Link to="/chooseRouteDriver">
              <button>Choose route</button>
          </Link>
        </div>

        <form id="createTripForm">
          <label for="origin">Origin:</label>
          <input type="text" id="origin" name="origin" required/>

          <label for="destination">Destination:</label>
          <input type="text" id="destination" name="destination" required/>

          <label for="date">Date of travel:</label>
          <input type="date" id="date" name="date" required/>

          <label for="time">Time of travel:</label>
          <input type="time" id="time" name="time" required/>

          <label for="number">Max capacity:</label>
          <input type="number" id="number" name="number" required/>


          <input type="submit" value="Create trip"/>


        </form>
      </div>
    );
  }
  
  export default CreateTripDriver;
  