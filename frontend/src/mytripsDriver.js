import HeaderDriver from "./headerDriver";
import './headerDriver.css'
import './index.css'
import './mytripsDriver.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import { Auth } from 'aws-amplify';


function MyTrips() {
  
  const [data, setData] = useState([]);
  const [future_trips, setFutureTrips] = useState([]);
  const [past_trips, setPastTrips] = useState([]);
  

  useEffect(() => {

  // Get the currently authenticated user
  Auth.currentAuthenticatedUser()
    .then(user => {
      console.log('Authenticated user:', user.username);
      const username = user.username;

      Auth.currentSession()
      .then(session => {
        const accessToken = session.getAccessToken().getJwtToken();
        console.log('Authorization token:', accessToken);

        // Make the fetch request with the updated username value
        fetch('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/trip?username=' + username + '&rider=false', {
          headers: {
            Authorization: accessToken
          }
        })
          .then(response => response.json())
          .then(data => {
            setData(data['body']);
            const parsedData = JSON.parse(data['body']);
            setFutureTrips(parsedData['results']['future_trips']);
            setPastTrips(parsedData['results']['past_trips']);
          })
          .catch(error => {
            console.log(error);
          });
          
      })
      .catch(error => {
        console.error('Error retrieving authorization token:', error);
      });

    })
    .catch(error => console.log('Error getting authenticated user:', error));
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
      <Link to="/createTripDriver">
        <button className="create-trip-button">Create a new trip</button>
      </Link>
    </div>
  );
}

export default MyTrips;