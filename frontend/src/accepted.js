import HeaderRider from "./headerRider";
import './headerRider.css'
import './index.css'
import './mytripsRider.css'
import { Link } from "react-router-dom";


function Accepted() {

  return (
    <div>
      <HeaderRider></HeaderRider>
      <div>
        <h3>Thank for for selecting a trip. We will let you know when the driver accepts.</h3>
      </div>
        <Link to="/availableRoutesRider">
            <button className="back">Back</button>
        </Link>
    </div>
  );
}

export default Accepted;

  