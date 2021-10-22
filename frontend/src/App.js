import React, { useState, useEffect } from 'react';
import Login from "./pages/Login";
import PlayPuzzle from './pages/PlayPuzzle';
import History from './pages/History';
import { get } from './utils/baseRequest';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PageNav, SignedOut } from './components';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";

const signedOutContainerStyle = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(async () => {
    const response = await get('/auth/is-valid-session', {});
    if (response.status !== 200) setIsAuthenticated(false);
    else setIsAuthenticated(true);
  }, [])
  
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div style={{backgroundColor: '#112031'}}>
        <Switch>
          <Route path="/auth">
            <Login />
          </Route>
          <Route path="/home">
            {
              isAuthenticated ? 
                <>
                  <PageNav />
                  <Route exact path="/home/history">
                    <History />
                  </Route>
                  <Route exact path="/home">
                    <PlayPuzzle />
                  </Route>
                </>  
              :
                <div style={signedOutContainerStyle}>
                  <SignedOut />
                </div>
            }
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
