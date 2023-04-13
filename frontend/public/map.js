// import HeaderRider from "./headerRider";
import './headerRider.css'
import './index.css'
import './map.css'
import { Link } from "react-router-dom";

import { useState, useEffect } from 'react';

var mylatlng = { lat: 38.3460, lng: -0.4907 };
var mapOptions = {
    center: mylatlng,
    zoom: 7,
    mapTypeId: google.maps.mapTypeId.ROADMAP
};

//create Map
var map = new google.maps.Map(document.getElementById("googleMap"))

// creat a directions service object to use route method



function MapView() {

  return (
    <div>
    <HeaderDriver></HeaderDriver>
    <div className="container-fluid">
        <div id="googleMap">

        </div>
        <div id="output">

        </div>
    </div>
    <script src=""></script>

    <button className="logout-button">Log out</button>
    <Link to="/createTripDriver">
      <button className="create-trip-button">Create a new trip</button>
    </Link>
  </div>
  );
}

export default MapView;

  