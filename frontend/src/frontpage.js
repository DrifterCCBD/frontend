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
                <Link to="https://drifter-coms6998.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=3t2sp5jg3mphpbo3udmptlrpi4&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fjianmin.dev%2F">
                <button className="frontpage-button">Get drifting 
                    <FontAwesomeIcon icon={faArrowRight} className="right-arrow"/>
                </button>
                </Link>
            </div>
            <div className="buttons">
              <Link to="https://drifter-coms6998.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=3t2sp5jg3mphpbo3udmptlrpi4&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fjianmin.dev%2F">
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
  