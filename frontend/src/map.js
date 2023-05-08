/*global google*/ 
import HeaderRider from "./headerRider";
import './headerRider.css'
import './index.css'
import './mytripsRider.css'
import './Popup.css'
import './map.css'
import Popup from './Popup'
import axios from 'axios';
import { Auth } from 'aws-amplify';
import {
    Box,
    HStack,
    Text,
} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import queryString from 'query-string';
import { useState, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, DirectionsRenderer } from '@react-google-maps/api'

const center = { lat: 40.7129, lng: -74.0072 } // NYC
const libraries = ['places'];

const deploy_with_api_key = false;

function Map() { 

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: (deploy_with_api_key) ? process.env.REACT_APP_GOOGLE_MAPS_API_KEY: "AIzaSyCZKsWmxLCQsO521oOmegTic1VhUiCONJY",
        libraries: libraries,
    })

    const values = queryString.parse(window.location.search);
    const [map, setMap] = useState(/** @type google.maps.Map */ null)
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [trip_arrive_time, setTripArriveTime] = useState("");
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [carLicensePlate, setCarLicensePlate] = useState('');
    const [carColor, setCarColor] = useState('');
    const [carModel, setCarModel] = useState('');
    const [username, setUsername] = useState('');
    const origin_input = values.origin
    const destination_input = values.destination
    const driver_username = values.driverInfo
    const trip_depart_time = values.departs
    const [buttonPopup, setButtonPopup] = useState(false);




    async function calculateRoute() {
        if (origin_input === '' || destination_input === '') {
            console.log("input not defined")
            return 
        }
        if(directionsResponse != null) {
            console.log("not null directions")
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
    
    

    useEffect(() => {
        Auth.currentAuthenticatedUser()
        .then( user => {
            setUsername(user.username)
            user.getSession((err, session) => {
                if(err) {
                throw new Error(err);
                }
                const sessionToken = session.getIdToken().jwtToken;
                axios
                .get('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/driver/car?username=' + driver_username, {
                    headers: {
                        "Authorization": sessionToken
                    }
                })
                .then((res => {
                    console.log(res)
                    const data = res['data']
                    setCarColor(data['car_color'])
                    setCarModel(data['car_model'])
                    setCarLicensePlate(data['car_license_no'])
                    
                }))
                .catch((err) => {
                    console.error('Error: ', err)
                })
            })
        })
        
    }, []);
    calculateRoute();

        if (!isLoaded) {
        return (<div>
        <HeaderRider></HeaderRider>
        <div className="mytrips-div">
            Loading...
        </div>
        </div>)
    }
    
    return (
        <div>
        <HeaderRider></HeaderRider>
        <div className="mytrips-div">
            <div className="map-container">
            <Box className='map-box' margin="auto" width="75%" height="100%">
                {/* Google Map Box */}
                <GoogleMap center={center} zoom={13} mapContainerStyle={{width:"100%", height:"100%"}} options={{
                    streetViewControl: false,
                    fullscreenControl: false,
                }} onLoad={map => setMap(map)}>
                    {/* Display markers or directions */}
                    {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
                </GoogleMap>
                </Box>
                <Box className='map-description'
                p={4}
                borderRadius="lg"
                m={4}
                bgColor="white"
                shadow="base"
                minW="container.md"
                zIndex="1"
                 margin="auto" width="80%">
                    <HStack spacing={4} mt={-15} justifyContent="space-between">
                        <Text fontSize="1vw" padding="1vw">Name: {driver_username}</Text>
                        <Text fontSize="1vw" padding="1vw">Car Model: {carModel}</Text>
                        <Text fontSize="1vw" padding="1vw">Car Color: {carColor}</Text>
                        <Text fontSize="1vw" padding="1vw">Car Plate: {carLicensePlate}</Text>
                        <Text fontSize="1vw" padding="1vw">Departs: {trip_depart_time}</Text>
                        <Text fontSize="1vw" padding="1vw">Arrives: {trip_arrive_time}</Text>
                        <Text fontSize="1vw" padding="1vw">From: {origin_input}</Text>
                        <Text fontSize="1vw" padding="1vw">To: {destination_input}</Text>
                        {/* <Text>Distance: {distance}</Text>
                        <Text>Duration: {duration}</Text> */}
                    </HStack>
                </Box>
            
            <Box
                className='map-footer'
                p={4}
                borderRadius="lg"
                m={4}
                bgColor="white"
                shadow="base"
                minW="container.md"
                zIndex="1"
                margin="auto" width="75%">
                <div className="button-container">
                    <Link to="/availableRoutesRider">
                        <button className="Back">Back</button>
                    </Link>
                </div>
                
            </Box>
            </div>
        </div>
        </div>
    );
}

export default Map;

  
