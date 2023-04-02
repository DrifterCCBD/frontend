import './App.css';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./login";
import Frontpage from './frontpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Frontpage}>
        </Route>
        <Route path="/login" Component={Login}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;