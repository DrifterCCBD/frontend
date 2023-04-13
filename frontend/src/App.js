import './App.css';

import {BrowserRouter as Router,  Route,  Routes} from "react-router-dom";
import Login from "./login";
import Frontpage from './frontpage';
import MyTrips from './mytripsDriver';
import AllRoutes from './allroutesdriver';
import Notifications from './notificationsDriver';
import CreateTripDriver from './createtripDriver';
import ProfileDriver from './profileDriver';
import { Amplify } from 'aws-amplify';
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {default as amplifyAuth} from './awsExports';
import chooseRouteDriver from './chooseRouteDriver';
import EditprofileDriver from './editProfileDriver';

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
            <Route path="/mytripsDriver" Component={MyTrips}>
            </Route>
            <Route path="/profileDriver" Component={ProfileDriver}>
            </Route>
            <Route path="/routes" Component={AllRoutes}>
            </Route>
            <Route path="/notifications" Component={Notifications}>
            </Route>
            <Route path="/createTripDriver" Component={CreateTripDriver}></Route>
            <Route path="/chooseRouteDriver" Component={chooseRouteDriver}></Route>
            <Route path="/editprofileDriver" Component={EditprofileDriver}></Route>
            {/* Rider */}
          </Routes>
        </Router>
     </Authenticator>
    );

}


export default App;
