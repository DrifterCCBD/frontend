import HeaderRider from "./headerRider";
import './headerRider.css'
import './index.css'
import './mytripsRider.css'
import { Auth } from 'aws-amplify';

import { useState, useEffect } from 'react';

function MyTripsRider() {
  const [data, setData] = useState([]);
  const [future_trips, setFutureTrips] = useState([]);
  const [past_trips, setPastTrips] = useState([]);

  useEffect(() => {
  // Get the currently authenticated user
  Auth.currentAuthenticatedUser()
    .then(user => {
      console.log('Authenticated user:', user.username);
      const username = user.username;
      user.getSession((err, session) => {
        if(err) {
          throw new Error(err);
        }
        console.log(session);
        const sessionToken = session.getIdToken().jwtToken;

      fetch('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/trip?username=' + username + '&rider=true', {
        headers: {
          Authorization: sessionToken
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
  }) 
  }, []);

  return (
    <div>
      <HeaderRider></HeaderRider>
      <div className="mytrips-div">
        <h3>Future trips</h3>
        <table className="mytrips-table">
          <thead>
            <th>Trip ID</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Driver</th>
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
            <th>Driver</th>
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
    </div>
  );
}

export default MyTripsRider;