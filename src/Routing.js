import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import Characters from './Characters';
import WatchList from './WatchList';
import Home from './Home'

const Routing = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/characters" element={<Characters />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/" element={<Home />} /> 
          <Route path="/Home" element={<Home />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default Routing;
