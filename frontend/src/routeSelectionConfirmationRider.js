import HeaderRider from "./headerRider";
import './index.css'
// import './profilerider.css' 
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function RouteSelectionConfirmation() {

    const driverName = "Toby"

    return (
        <div>
            <div>
                <HeaderRider></HeaderRider>
                <h3>Thank you for selecting a trip! We'll let you know when {driverName} accepts your</h3>
            </div>
            <div>
                <Link to="/availableTripsRider">
                    <button>Back</button>
                </Link>
            </div>
        </div>
    );
  }
  
  export default RouteSelectionConfirmation;
  