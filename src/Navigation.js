import './Navigation.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link to="/characters">Characters</Link>
          </li>
          <li>
            <Link to="/watchlist">My Watch List</Link>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Navigation;