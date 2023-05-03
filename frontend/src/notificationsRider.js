import { Link } from "react-router-dom";
import HeaderDriver from "./headerRider";
import './headerRider.css'
import './index.css'
import './notificationsDriver.css'
import React, { useState } from "react";
import Modal from "react-modal";



function NotificationsRider() {
  // TODO: connect with lambda and check if there's a new trip request
  const [isOpen, setIsOpen] = useState(false);

    const notiContent = (
      <div className="notification-container">
        <div className="notification-content">
          <h2>New trip request accepted!</h2>
          <p>Toby has accepted your trip from LA to NY</p>
          <div>
            <button onClick={() => setIsOpen(false)}>Decline</button>
            <Link to="/availableTripsRider">
              <button>Accept</button>
            </Link>
          </div>
        </div>
      </div>
    );
  
    return (
      <div>
        <HeaderDriver></HeaderDriver>
        <button onClick={() => setIsOpen(true)}>Open notifications</button>
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
          {notiContent}
        </Modal>

      </div>
    );
  }
  
  export default NotificationsRider;
  