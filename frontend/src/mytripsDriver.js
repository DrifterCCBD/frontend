import HeaderDriver from "./headerDriver";
import './headerDriver.css';
import './index.css';
import './mytripsDriver.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheck, faBan, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Link, useNavigate} from "react-router-dom";

import { Tooltip, IconButton } from '@mui/material';
import {InfoOutlined} from '@mui/icons-material';


import { Auth } from 'aws-amplify';


function MyTrips() {
  
  const [data, setData] = useState([]);
  const [future_trips, setFutureTrips] = useState([]);
  const [past_trips, setPastTrips] = useState([]);
  const [pending_requests, setPendingRequests] = useState([]);
  const [userToken, setUserToken] = useState("");


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
        const accessToken = session.getIdToken().jwtToken;
        setUserToken(accessToken);

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
        // Make the fetch request with the updated username value
        fetch('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/trip?username=' + username + '&show_pending=true', {
          headers: {
            Authorization: accessToken
          }
        })
          .then(response => response.json())
          .then(data => {
            setData(data['body']);
            const parsedData = data['body'];
            setPendingRequests(parsedData);
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

  const navigate = useNavigate();

  const respondTripRequest = (trip_id,rider, decision) => {
    const updateTrip = axios.put(
      "https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/trip/" + trip_id, {"rider_username" : rider, "accepted": decision},
      {
        headers: {
          Authorization: userToken,
        },
      }
    )
    .then((res) => {
      console.log(res)
      if (res.data.statusCode == 500) {
        throw new Error(res.data.body);
      } else {
        window.location.reload();
      }
      
      })
    .catch((error) => {
      alert(
        "Error:" + error
      );
    })
    .finally(() => {

    });

  }


  return (
    <div>
      <HeaderDriver></HeaderDriver>
      <div className="mytrips-div-driver">
      <h3>Trip Rider Requests</h3>
        <table className="mytrips-table">
          <thead>
            <th>Trip ID</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Rider</th>
            <th>Max capacity</th>
            <th>Price (USD)</th>
            <th>Date & time</th>
            <th>Accept</th>
            <th>Decline</th>
          </thead>
          <tbody>
          {pending_requests.map(item => (
          <tr key={item.id}>
            {Object.keys(item).map(key => (
              <td key={key}>{item[key]}</td>
            ))}
            
              <td>
                  <FontAwesomeIcon onClick={() => {respondTripRequest(item.trip_id,item.request_username,true)}} className="edit-icon accept-decline" icon={faCheck}/>
              </td>
              <td>
                  <FontAwesomeIcon onClick={() => {respondTripRequest(item.trip_id,item.request_username,false)}} className="edit-icon accept-decline" icon={faBan}/>
              </td>
          </tr>
        ))}
          </tbody>
        </table>
        <h3>Future trips</h3>
        <table className="mytrips-table">
          <thead>
            <th>Trip ID</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Riders</th>
            <th>Date & time</th>
            <th>Max capacity</th>
            <th>Current number of riders</th>
            <th>Price (USD)</th>
            <th>Edit</th>
          </thead>
          <tbody>
          {future_trips.map(item => (
          <tr key={item.id}>
            {Object.keys(item).map(key => (
              <td key={key}>{item[key]}</td>
            ))}
            {item.rider_usernames === null ? (
              <td>
                <Link to={`/editTripDriver?id=${item.trip_id}`}>
                  <FontAwesomeIcon className="edit-icon" icon={faEdit}/>
                </Link>
              </td>
            ) : (
              <td>
                <Tooltip title="You can't change trips with riders">
                <IconButton>
                  <InfoOutlined className="info-button"/>
                </IconButton>
              </Tooltip>
              </td>
            )}
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
            <th>Riders</th>
            <th>Date & time</th>
            <th>Max capacity</th>
            <th>Number of riders</th>
            <th>Price per rider (USD)</th>
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
        <Link to="/createTripDriver">
          <button className="create-button">Create a new trip</button>
      </Link>
      </div>

    </div>
  );
}

export default MyTrips;