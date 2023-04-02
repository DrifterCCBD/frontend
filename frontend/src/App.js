import './App.css';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./login";
import Frontpage from './frontpage';
import MyTrips from './mytrips';
import Profile from './profile';
import AllRoutes from './allroutes';
import Notifications from './notifications';

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
        <Route path="/profile" Component={Profile}>
        </Route>
        <Route path="/routes" Component={AllRoutes}>
        </Route>
        <Route path="/notifications" Component={Notifications}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;