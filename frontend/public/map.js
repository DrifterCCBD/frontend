// import HeaderRider from "./headerRider";
import './headerRider.css'
import './index.css'
import './map.css'
import { Link } from "react-router-dom";

import { useState, useEffect } from 'react';

import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api'

var mylatlng = { lat: 38.3460, lng: -0.4907 };
var mapOptions = {
    center: mylatlng,
    zoom: 7,
    mapTypeId: google.maps.mapTypeId.ROADMAP
};

const center = { lat: 40.7128, lng: 74.0060} // Center of NYC

function MapView() {

  const {} = useJsApiLoader({
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, USE THIS INSTEAD!
    googleMapsApiKey: "AIzaSyCZKsWmxLCQsO521oOmegTic1VhUiCONJY",
  })

  const [map, setMap] = useState(/** @type google.maps.Map */null) // Not used. For spanning back to a set location on the map.

  if (!isLoaded) {
    return <SkeltonText />
  }

  return (
    <div>
    <HeaderDriver></HeaderDriver>
    <div className="container-fluid">
      <Box position="absolute" left={0} top={0} h="50%" w ="50%">
        {/* Google Maps Box */}
        <GoogleMap center={center} zoom={15} mapContainerStyle={{width: '100%', height: '100%'}} options={{
          streetViewControl: false,
          fullscreenControl: false
        }} onLoad={(map) => setMap(map)}>
          <Marker position={center} /> {/* TODO: REMOVE; Places marker in the center of NYC */}
          {/* Display markers, or directions */}
        </GoogleMap>
      </Box>
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

  