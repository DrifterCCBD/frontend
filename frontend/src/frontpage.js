import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

function Frontpage() {
    return (
        <div className="App">
            <div className="frontpage">
              <div>
                <h1 className="frontpage-title">
                  Welcome to Drifter!
                </h1>
              </div>
            <div>
              <h2 className='frontpage-undertitle'>
                Share a ride today!
              </h2>
            </div>
            <div className="buttons">
                <Link to="/availableRoutesRider">
                <button className="frontpage-button">Get drifting 
                    <FontAwesomeIcon icon={faArrowRight} className="right-arrow"/>
                </button>
                </Link>
            </div>
            <div className="buttons">
                <Link to="/mytripsDriver">
                <button className="frontpage-button">For drivers 
                  <FontAwesomeIcon icon={faArrowRight} className="right-arrow"/>
                </button>
              </Link>
            </div>
          </div>
        </div>
    );
  }
  
  export default Frontpage;
  
