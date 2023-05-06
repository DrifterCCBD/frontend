/*global google*/ 
import HeaderRider from "./headerRider";
import './headerRider.css'
import './index.css'
import './mytripsRider.css'
import './Popup.css'
import './map.css'
import Popup from './Popup'
import {
    Box,
    HStack,
    Text,
} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import queryString from 'query-string';
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
// import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import { useJsApiLoader, GoogleMap, DirectionsRenderer } from '@react-google-maps/api'
// import { Autocomplete } from "@aws-amplify/ui-react";

const center = { lat: 40.7129, lng: -74.0072 } // NYC
const libraries = ['places'];

const deploy_with_api_key = true;

function Map() { 

    const { isLoaded } = useJsApiLoader({
        // googleMapsApiKey: (deploy_with_api_key) ? process.env.REACT_APP_GOOGLE_MAPS_API_KEY: "AIzaSyCZKsWmxLCQsO521oOmegTic1VhUiCONJY",
        googleMapsApiKey: "AIzaSyCZKsWmxLCQsO521oOmegTic1VhUiCONJY",
        libraries: libraries,
    })

    const values = queryString.parse(window.location.search);
    const [map, setMap] = useState(/** @type google.maps.Map */ null)
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [trip_arrive_time, setTripArriveTime] = useState("");
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const origin_input = values.origin
    const destination_input = values.destination
    const driver_name = values.driverInfo
    const driver_car = values.car
    const driver_car_color = ""
    const driver_car_license_no = ""
    const trip_depart_time = values.departureTime
    // var trip_arrive_time = ""
    const [buttonPopup, setButtonPopup] = useState(false);

    if (!isLoaded) {
        return <div>
        <HeaderRider></HeaderRider>
        <div className="mytrips-div">
            Something Failed!
        </div>
        {/* <button className="logout-button">Log out</button> */}
        </div>
    }

    async function calculateRoute() {
        if (origin_input === '' || destination_input === '') {
            return 
        }
        let directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: origin_input,
            destination: destination_input,
            travelMode: google.maps.TravelMode.DRIVING
        })
        setDirectionsResponse(results)
        const new_trip_arrive_time = results.routes[0].legs[0].duration.text
        setTripArriveTime(new_trip_arrive_time)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(new_trip_arrive_time)
        directionsService = null; 
    }
    
    calculateRoute();
    
    return (
        <div>
        <HeaderRider></HeaderRider>
        <div className="mytrips-div">
            <Box position='absolute' left={0} top={-100} bottom={0} right={0} margin="auto" width="75%" height="75%">
                {/* Google Map Box */}
                <GoogleMap center={center} zoom={13} mapContainerStyle={{width:"100%", height:"100%"}} options={{
                    streetViewControl: false,
                    fullscreenControl: false,
                }} onload={map => setMap(map)}>
                    {/* Display markers or directions */}
                    {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
                </GoogleMap>
                <Box
                p={4}
                borderRadius="lg"
                m={4}
                bgColor="white"
                shadow="base"
                minW="container.md"
                zIndex="1"
                position='absolute' left={0} top={-600} bottom={0} right={0} margin="auto" width="50%" height="15%">
                    <HStack spacing={4} mt={-15} justifyContent="space-between">
                        <Text fontSize="1vw" padding="1vw">Name: {driver_name}</Text>
                        <Text fontSize="1vw" padding="1vw">Car: {driver_car}</Text>
                        <Text fontSize="1vw" padding="1vw">Departs: {trip_depart_time}</Text>
                        <Text fontSize="1vw" padding="1vw">Arrives: {trip_arrive_time}</Text>
                        <Text fontSize="1vw" padding="1vw">From: {origin_input}</Text>
                        <Text fontSize="1vw" padding="1vw">To: {destination_input}</Text>
                        {/* <Text>Distance: {distance}</Text>
                        <Text>Duration: {duration}</Text> */}
                    </HStack>
                </Box>
            </Box>
        </div>
        <Box
            p={4}
            borderRadius="lg"
            m={4}
            bgColor="white"
            shadow="base"
            minW="container.md"
            zIndex="1"
            position='absolute' left={0} top={760} bottom={0} right={0} margin="auto" width="75%" height="15%">
            <div className="button-container">
                <Link to="/availableRoutesRider">
                    <button className="Back">Back</button>
                </Link>
                {/* <button className="Confirm" onClick={() => setButtonPopup(true)}>Confirm</button> */}
            </div>
            
            {/* <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h3> Confirm trip with {driver_name}?</h3>
            </Popup> */}
        </Box>
        </div>
    );
}

export default Map;

  