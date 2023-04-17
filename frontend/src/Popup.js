import React from 'react'
import { Link } from "react-router-dom";

function Popup(props) {
  return (props.trigger) ? (
    <div className="popup">
        <div className="popup-inner">
            <button className="close-btn" onClick={() => props.setTrigger(false)}>Cancel</button>
            <Link to="/accepted">
                <button className="accept-btn" onClick={() => props.setTrigger(false)}>Accept</button>
            </Link>
            { props.children }
        </div>
    </div>
  ) : "";
}

export default Popup  