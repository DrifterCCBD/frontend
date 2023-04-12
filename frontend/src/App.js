import './App.css';

import {BrowserRouter as Router,  Route,  Routes} from "react-router-dom";
import Login from "./login";
import Frontpage from './frontpage';
import MyTrips from './mytripsDriver';
import AllRoutes from './allroutesdriver';
import Notifications from './notifications';
import CreateTrip from './createtripDriver';
import ProfileDriver from './profileDriver';
import { Amplify } from 'aws-amplify';
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {default as amplifyAuth} from './awsExports';

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
            <Route path="/mytrips" Component={MyTrips}>
            </Route>
            <Route path="/profile" Component={ProfileDriver}>
            </Route>
            <Route path="/routes" Component={AllRoutes}>
            </Route>
            <Route path="/notifications" Component={Notifications}>
            </Route>
            <Route path="/createTrip" Component={CreateTrip}></Route>
            <Route></Route>
          </Routes>
        </Router>
      </Authenticator>
    );

}


export default App;
