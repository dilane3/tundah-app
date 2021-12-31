import React from 'react';
import { BrowserRouter } from 'react-router-dom'


import './css/app.css';

import Routes from './Routes'

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
