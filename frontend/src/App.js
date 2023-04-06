import './App.css';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./login";
import Frontpage from './frontpage';
import MyTrips from './mytripsDriver';
import AllRoutes from './allroutesdriver';
import Notifications from './notifications';
import CreateTrip from './createtripDriver';
import profileDriver from './profileDriver';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Frontpage}>
        </Route>
        <Route path="/login" Component={Login}>
        </Route>
        <Route path="/mytrips" Component={MyTrips}>
        </Route>
        <Route path="/profile" Component={profileDriver}>
        </Route>
        <Route path="/routes" Component={AllRoutes}>
        </Route>
        <Route path="/notifications" Component={Notifications}>
        </Route>
        <Route path="/createTrip" Component={CreateTrip}></Route>
        <Route></Route>
      </Routes>
    </Router>
  );
}

export default App;