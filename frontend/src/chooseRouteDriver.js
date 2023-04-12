import HeaderDriver from "./headerDriver";
import './headerDriver.css'
import './index.css'
import './chooserouteDriver.css'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function chooseRouteDriver() {
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
        <HeaderDriver></HeaderDriver>
        <div className="routes-div">
        <h3>Choose an existing route</h3>
        <table className="routes-table">
          <thead>
            <th>Origin</th>
            <th>Destination</th>
            {/* <tr>
              {Object.keys(data[0]).map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr> */}
          </thead>
          <tbody>
            <tr className="link-tr">
              <td className="link-td"><Link to="/createTripDriver?origin=LA&destination=NY" className="link-route">LA</Link></td>
              <td className="link-td"><Link to="/createTripDriver?origin=LA&destination=NY" className="link-route">NY</Link></td>
            </tr>
            <tr className="link-tr">
              <td className="link-td"><Link to="/createTripDriver?origin=Denver&destination=NY" className="link-route">Denver</Link></td>
              <td className="link-td"><Link to="/createTripDriver?origin=Denver&destination=NY" className="link-route">NY</Link></td>
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
      </div>
    );
  }
  
  export default chooseRouteDriver;
  