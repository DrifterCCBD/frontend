import HeaderRider from "./headerRider";
import './headerRider.css'
import './index.css'
import './mytripsRider.css'

import { Link, useNavigate} from "react-router-dom";
import { Auth } from 'aws-amplify';
import { useState, useEffect } from 'react';
import axios from "axios";





function AvailableRoutesRider() {

  const [data, setData] = useState([]);
  const [available_trips, setAvailableTrips] = useState([]);
  const [userToken, setUserToken] = useState("");




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
        setUserToken(sessionToken);
      
    // Make the fetch request for all available trips
    fetch('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/trip?available=true&username=' + user.username, {
      headers: {
        Authorization: sessionToken
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

    const navigate = useNavigate();


    const requestToJoinTrip = (trip_id) => {
      const updateTrip = axios.put(
        "https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/trip/" + trip_id, {},
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
          navigate('/mytripsRider', { replace: true });
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
        <h2>All available trips</h2>
        <table className="mytrips-table">
          <thead>
            <th>Trip ID</th>
            <th>Start Date and Time</th>
            <th>Destination</th>
            <th>Origin</th>
            <th>Driver Info</th>
            <th></th>
            <th></th>
          </thead>
          <tbody>
            {available_trips.map(item => (
              <tr key={item.id}>
                {Object.keys(item).map(key => 
                  (
                  <td key={key}>{item[key]}</td>
                ))}
                <td>
                  <button onClick={() => window.location.href=`/map?origin=${item.origin}&destination=${item.destination}`}>
                    View
                  </button>
                </td>
                <td> 
                  {<button onClick={() => requestToJoinTrip(item.trip_id)}>
                    Request
                  </button> }
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