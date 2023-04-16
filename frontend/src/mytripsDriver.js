import HeaderDriver from "./headerDriver";
import './headerDriver.css'
import './index.css'
import './mytripsDriver.css'
import { Link } from "react-router-dom";


import { useState, useEffect } from 'react';

function MyTrips() {
  // TODO: Get data from database

  const [data, setData] = useState([]);
  const [future_trips, setFutureTrips] = useState([]);
  const [past_trips, setPastTrips] = useState([]);

  useEffect(() => {
    fetch('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/trip?username=bja2142') // todo: change so it's not hardcoded
      .then(response => response.json())
      .then(data => {
        setData((data['body']))
        const parsedData = JSON.parse(data['body']);
        setFutureTrips(parsedData['results']['future_trips']);
        setPastTrips(parsedData['results']['past_trips']);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <HeaderDriver></HeaderDriver>
      <div className="mytrips-div">
        <h3>Future trips</h3>
        <table className="mytrips-table">
          <thead>
            <th>Trip ID</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Rider</th>
            <th>Date & time</th>
          </thead>
          <tbody>
            {future_trips.map(item => (
              <tr key={item.id}>
                {Object.keys(item).map(key => (
                  <td key={key}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Past trips</h3>
        <table className="mytrips-table">
          <thead>
            <th>Trip ID</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Rider</th>
            <th>Date & time</th>
          </thead>
          <tbody>
            {past_trips.map(item => (
              <tr key={item.id}>
                {Object.keys(item).map(key => (
                  <td key={key}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="logout-button">Log out</button>
      <Link to="/createTripDriver">
        <button className="create-trip-button">Create a new trip</button>
      </Link>
    </div>
  );
}

export default MyTrips;

  