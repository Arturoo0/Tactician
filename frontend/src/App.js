import React, { useState, useEffect } from 'react';
import Login from "./pages/Login";
import { get } from './utils/baseRequest';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(async () => {
    const response = await get('/auth/is-valid-session', {});
    console.log(response);
  }, []); 

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
