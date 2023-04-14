import HeaderRider from "./headerRider";
import './headerRider.css'
import './index.css'
import './mytripsRider.css'
import {
    Box,
    // Button,
    // ButtonGroup,
    // Flex,
    // HStack,
    // IconButton,
    // Input,
    // SkeletonText,
    // Text,
} from '@chakra-ui/react'

import { useState, useEffect } from 'react';
// import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import { useJsApiLoader, GoogleMap } from '@react-google-maps/api'

const center = { lat: 40.7129, lng: -74.0072 } // NYC
// const center = { lat: 48.8584, lng: 2.2945 } // NYC


function Map() { 
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    if (!isLoaded) {
        return <div>
        <HeaderRider></HeaderRider>
        <div className="mytrips-div">
            Something Failed!
        </div>
        {/* <button className="logout-button">Log out</button> */}
        </div>
    }
  

    return (
        <div>
        <HeaderRider></HeaderRider>
        <div className="mytrips-div">
            <Box position='absolute' left={0} top={0} bottom={0} right={0} margin="auto" width="1400px" height="800px">
                {/* Google Map Box */}
                <GoogleMap center={center} zoom={13} mapContainerStyle={{width:"100%", height:"100%"}}>
                    {/* Display markers or directions */}
                </GoogleMap>

            </Box>
            
        </div>
        {/* <button className="logout-button">Log out</button> */}
        </div>
    );
}

export default Map;

  