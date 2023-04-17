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

import { useState, useEffect } from 'react';
// import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import { useJsApiLoader, GoogleMap, DirectionsRenderer } from '@react-google-maps/api'
// import { Autocomplete } from "@aws-amplify/ui-react";

const center = { lat: 40.7129, lng: -74.0072 } // NYC
// const center = { lat: 48.8584, lng: 2.2945 } // NYC

const deploy_with_api_key = false;

function Map() { 

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: (deploy_with_api_key) ? process.env.REACT_APP_GOOGLE_MAPS_API_KEY: "undefined",
        libraries: ['places'],
    })

    const [map, setMap] = useState(/** @type google.maps.Map */ null)
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const origin_input = "Hell's Kitchen, NY"
    const destination_input = "Lenox Hill, NY"
    const driver_name = "Toby Savage"
    const driver_car = "Jeep Wrangler"
    const trip_depart_time = "12:14 PM"
    const trip_arrive_time = "12:41 PM"
    const [buttonPopup, setButtonPopup] = useState(false);

    // const originRef = useRef()
    // const destinationRef = useRef()


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
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: origin_input,
            destination: destination_input,
            travelMode: google.maps.TravelMode.DRIVING
        })
        setDirectionsResponse(results)
        setDistance(results.routs[0].legs[0].distance.text)
        setDuration(results.routs[0].legs[0].duration.text)
    }
    
  
    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        // originRef.current.value=''
        // destinationRef.current.value=''
    }

    // useEffect(() => {
    //     calculateRoute();
    //   }, [directionsResponse, map]);
    calculateRoute();
    

    return (
        <div>
        <HeaderRider></HeaderRider>
        <div className="mytrips-div">
            <Box position='absolute' left={0} top={-100} bottom={0} right={0} margin="auto" width="1200px" height="700px">
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
                position='absolute' left={0} top={-550} bottom={0} right={0} margin="auto" width="400px" height="120px">
                    <HStack spacing={4} mt={4} justifyContent="space-between">
                        <Text>Name: {driver_name}</Text>
                        <Text>Car: {driver_car}</Text>
                        <Text>Departs: {trip_depart_time}</Text>
                        <Text>Arrives: {trip_arrive_time}</Text>
                        <Text>From: {origin_input}</Text>
                        <Text>To: {destination_input}</Text>
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
            position='absolute' left={0} top={720} bottom={0} right={0} margin="auto" width="400px" height="120px">
            <div className="button-container">
                <Link to="/availableRoutesRider">
                    <button className="Back">Back</button>
                </Link>
                <button className="Confirm" onClick={() => setButtonPopup(true)}>Confirm</button>
            </div>
            
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h3> Confirm trip with {driver_name}?</h3>
            </Popup>
        </Box>
        </div>
    );
}

export default Map;

  