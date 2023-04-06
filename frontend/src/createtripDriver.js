import HeaderDriver from "./headerDriver";
import './headerDriver.css'
import './index.css'
import './createTripDriver.css'
import { Link } from "react-router-dom";

function CreateTrip() {
    return (
      <div>
        <HeaderDriver></HeaderDriver>
        <div className="header-create-trip">
          <h1>Create a new trip</h1>
          <p>Pick an existing route or make a new one</p>
          <Link to="/chooseRoute">
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


          <input type="submit" value="Create trip"/>

        </form>
      </div>
    );
  }
  
  export default CreateTrip;
  