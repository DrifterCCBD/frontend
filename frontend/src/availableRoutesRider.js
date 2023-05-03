import HeaderRider from "./headerRider";
import './headerRider.css'
import './index.css'
import './mytripsRider.css'

import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { useState, useEffect } from 'react';

function AvailableRoutesRider() {

  const [data, setData] = useState([]);
  const [available_trips, setAvailableTrips] = useState([]);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
    .then(user => {
      console.log('Authenticated user:', user.username);
      user.getSession((err, session) => {
        if(err) {
          throw new Error(err);
        }
        console.log(session);
        const sessionToken = session.getIdToken().jwtToken;
      
    // Make the fetch request for all available trips
    fetch('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/trip?available=true', {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setData(data['body']);
        
        const parsedData = JSON.parse(data['body']);
        console.log(parsedData)

        setAvailableTrips(parsedData['results']['future_trips']);

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
        <h2>All available trips</h2>
        <table className="mytrips-table">
          <thead>
            <th>Start Date and Time</th>
            <th>Destination</th>
            <th>Origin</th>
            <th>Driver Info</th>
            <th></th>
          </thead>
          <tbody>
            {available_trips.map(item => (
              <tr key={item.id}>
                {Object.keys(item).map(key => (
                  <td key={key}>{item[key]}</td>
                ))}
                <td>
                  Select 
                  {/* <button onClick={() => window.location.href='/maps'}>
                    Select
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AvailableRoutesRider;

  