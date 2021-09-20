import React, { useState, useEffect } from 'react';
import Login from "./pages/Login";
import { get } from './utils/baseRequest';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(async () => {
    const response = await get('/auth/is-valid-session', {});
    if (response.status !== 200) setIsAuthenticated(false);
    else setIsAuthenticated(true);
  }, [])

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/auth">
            <Login />
          </Route>
          <Route path="/home">
            {
              isAuthenticated ? 
              <div>yes</div>
              :
              <div>no</div>
            }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
