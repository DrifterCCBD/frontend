import HeaderRider from "./headerRider";
import './headerRider.css'
import './index.css'
import './mytripsRider.css'
import { Link } from "react-router-dom";

import { useState, useEffect } from 'react';

function MyTrripsRider() {
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
        <h3>Future trips</h3>
        <table className="mytrips-table">
          <thead>
            <th>Trip ID</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Rider</th>
            <th>Date & time</th>
            {/* <tr>
              {Object.keys(data[0]).map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr> */}
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>LA</td>
              <td>NY</td>
              <td>1141</td>
              <td>06-04-2023 12:00PM</td>
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
        <h3>Past trips</h3>
        <table className="mytrips-table">
          <thead>
            <th>Trip ID</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Rider</th>
            <th>Date & time</th>
            {/* <tr>
              {Object.keys(data[0]).map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr> */}
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>LA</td>
              <td>NY</td>
              <td>1141</td>
              <td>06-04-2023 12:00PM</td>
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

export default MyTripsRider;

  