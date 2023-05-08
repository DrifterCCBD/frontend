import './App.css';

import {BrowserRouter as Router,  Route,  Routes} from "react-router-dom";
import Frontpage from './frontpage';
import MyTripsDriver from './mytripsDriver';
import NotificationsDriver from './notificationsDriver';
import CreateTripDriver from './createtripDriver';
import ProfileDriver from './profileDriver';
import { Amplify } from 'aws-amplify';
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {default as amplifyAuth} from './awsExports';
import EditprofileDriver from './editProfileDriver';
import ProfileRider from './profileRider';
import EditprofileRider from './editProfileRider';
import AddPaymentMethod from './addPaymentMethod';
import HeaderRider from './headerRider';
import MyTripsRider from './mytripsRider';
import availableRoutesRider from './availableRoutesRider';
import RouteSelectionConfirmationRider from './routeSelectionConfirmationRider';
// import AllRoutesRider from './allRoutesRider'
import NotificationsRider from './notificationsRider'
import Map from './map'
import Accepted from './accepted.js'
import UserInfo from './addUserInfo';
import DriverInfo from './addDriverInfo';
import EditTripDriver from './editTripDriver';
import AddFirstPayment from './addFirstPayment';

Amplify.configure(amplifyAuth);

function App() {
  /* https://ui.docs.amplify.aws/react/connected-components/authenticator/customization */
/* https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/#option-1-use-pre-built-ui-components */
  /*https://ui.docs.amplify.aws/react/connected-components/authenticator/configuration*/
    return (
     <Authenticator signUpAttributes={['email']}>
        <Router>
          <Routes>
            <Route path="/" Component={Frontpage}>
            </Route>
            {/* Driver */}
            <Route path="/mytripsDriver" Component={MyTripsDriver}>
            </Route>
            <Route path="/profileDriver" Component={ProfileDriver}>
            </Route>
            <Route path="/notificationsDriver" Component={NotificationsDriver}>
            </Route>
            <Route path="/createTripDriver" Component={CreateTripDriver}></Route>
            <Route path="/editprofileDriver" Component={EditprofileDriver}></Route>
            {/* Rider */}
            <Route path="/profileRider" Component={ProfileRider}></Route>
            <Route path="/addPaymentMethod" Component={AddPaymentMethod}></Route>
            <Route path="/editProfileRider" Component={EditprofileRider}></Route>
            <Route path="/headerRider" Component={HeaderRider}></Route>
            <Route path="/mytripsRider" Component={MyTripsRider}></Route>
            <Route path="/availableRoutesRider" Component={availableRoutesRider}></Route>
            <Route path="/routeSelectionConfirmationRider" Component={RouteSelectionConfirmationRider}></Route>
            {/* <Route path="/allRoutesRider" Component={AllRoutesRider}></Route> */}
            <Route path="/notificationsRider" Component={NotificationsRider}></Route>
            <Route path="/map" Component={Map}></Route>
            <Route path="/accepted" Component={Accepted}></Route>
            <Route path="/insertInfo" Component={UserInfo}></Route>
            <Route path="/addDriverInfo" Component={DriverInfo}></Route>
            <Route path="/editTripDriver" Component={EditTripDriver}></Route>
            <Route path="addFirstPaymentMethod" Component={AddFirstPayment}></Route>
          </Routes>
        </Router>
     </Authenticator>
    );

}


export default App;
