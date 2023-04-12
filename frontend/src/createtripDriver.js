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
      const createTrip = document.getElementById("createTrip");

      createTrip.addEventListener("click", function () {
        console.log("TODO: Add code to add to DB");
        // Your code here
      });
    }, []);


    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const origin = searchParams.get("origin");
      const destination = searchParams.get("destination");
  
      // TODO Use the origin and destination variables as needed
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

        <form>
          <label for="origin">Origin:</label>
          <input type="text" id="origin" name="origin" required/>

          <label for="destination">Destination:</label>
          <input type="text" id="destination" name="destination" required/>

          <label for="date">Date of travel:</label>
          <input type="date" id="date" name="date" required/>

          <label for="time">Time of travel:</label>
          <input type="time" id="time" name="time" required/>

          <Link to="/mytripsDriver">
            <input id="createTrip" type="submit" value="Create trip"/>
          </Link>

        </form>
      </div>
    );
  }
  
  export default CreateTripDriver;
  