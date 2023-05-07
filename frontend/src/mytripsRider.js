import HeaderRider from "./headerRider";
import './headerRider.css'
import './index.css'
import './mytripsRider.css'
import { Auth } from 'aws-amplify';
import axios from "axios";

import { Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';

function MyTripsRider() {
  const [data, setData] = useState([]);
  const [future_trips, setFutureTrips] = useState([]);
  const [past_trips, setPastTrips] = useState([]);
  const [pending_trips, setPendingTrips] = useState([]);
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
        const sessionToken = session.getIdToken().jwtToken;
        setUserToken(sessionToken);

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
          setPendingTrips(parsedData['results']['pending_trips'])
        })
        .catch(error => {
          console.log(error);
        });
    })
  }) 
  }, []);

  const navigate = useNavigate();

  const cancelTrip = (trip_id) => {
    const updateTrip = axios.put(
      "https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/trip/" + trip_id, {"cancel": "true"},
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
        document.getElementById("trip_"+trip_id).remove();
      }
      
      })
    .catch((error) => {
      alert(
        "Error saving user information:" + error
      );
    })
    .finally(() => {

    });
  }

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
            <th>Date & time</th>
            <th>Price</th>
            <th>Driver</th>
            <th>Cancel</th>
          </thead>
          <tbody>
            {future_trips.map(item => (
              <tr id={"trip_"+item.trip_id} key={item.id}>
                {Object.keys(item).map(key => {
                  if(["rider_usernames", "max_capacity", "curr_capacity"].indexOf(key) === -1){
                    console.log(key)
                    return (
                      <td key={key}>{item[key]}</td>
                    )
                  }
                })}
                 <td> 
                  {<button className="table-button" onClick={() => cancelTrip(item.trip_id)}>
                    Cancel
                  </button> }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Pending trips</h3>
        <table className="mytrips-table">
          <thead>
            <th>Trip ID</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Date & time</th>
            <th>Price</th>
            <th>Driver</th>
            <th>Cancel</th>
          </thead>
          <tbody>
            {pending_trips.map(item => (
              <tr id={"trip_"+item.trip_id} key={item.id}>
                {Object.keys(item).map(key => {
                  if(["rider_usernames", "max_capacity", "curr_capacity"].indexOf(key) === -1){
                    console.log(key)
                    return (
                      <td key={key}>{item[key]}</td>
                    )
                  }
                })}
                <td> 
                  {<button className="table-button" onClick={() => cancelTrip(item.trip_id)}>
                    Cancel
                  </button> }
                </td>
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
            <th>Date & time</th>
            <th>Price</th>
            <th>Driver</th>
          </thead>
          <tbody>
            {past_trips.map(item => (
              <tr key={item.id}>
                {Object.keys(item).map(key => {
                  if(["rider_usernames", "max_capacity", "curr_capacity"].indexOf(key) === -1){
                    console.log(key)
                    return (
                      <td key={key}>{item[key]}</td>
                    )
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyTripsRider;