import HeaderRider from "./headerRider";
import './headerRider.css'
import './index.css'
import './mytripsRider.css'
// import './availabletripsRider.css'
import { Link } from "react-router-dom";

import { useState, useEffect } from 'react';

function AvailableTrips() {
  // TODO: Get data from database

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch('https://example.com/api/data') // todo: 
  //     .then(response => response.json())
  //     .then(data => {
  //       setData(data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div>
      <HeaderRider></HeaderRider>
      <div className="mytrips-div">
        
        <table className="mytrips-table">
          <thead>
            <th>Start Date and Time</th>
            <th>Destination</th>
            <th>Origin</th>
            <th>Driver Info</th>
            {/* <tr>
              {Object.keys(data[0]).map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr> */}
          </thead>
          <tbody>
            <tr>
              <td>04-28-2023 17:00</td>
              <td>Hell's Kitchen</td>
              <td>Lenox Hill</td>
              <td>Male, 3 years experience</td>
            </tr>
            {/* {data.map(item => (
              <tr key={item.id}>
                {Object.keys(item).map(key => (
                  <td key={key}>{item[key]}</td>
                ))}
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
      <button className="logout-button">Log out</button>
    </div>
  );
}

export default AvailableTrips;

  