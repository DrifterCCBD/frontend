import { Link } from "react-router-dom";
import HeaderDriver from "./headerDriver";
import './headerDriver.css'
import './index.css'
import './notifications.css'
import React, { useState } from "react";
import Modal from "react-modal";



function NotificationsDriver() {
  // TODO: connect with lambda and check if there's a new trip request
  const [isOpen, setIsOpen] = useState(false);

    const notiContent = (
      <div className="notification-container">
        <div className="notification-content">
          <h2>New trip request</h2>
          <p>Helena wants to join your trip from LA to NY</p>
          <div>
            <button onClick={() => setIsOpen(false)}>Decline</button>
            <Link to="/mytripsDriver">
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
  
  export default NotificationsDriver;
  