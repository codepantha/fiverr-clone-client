import React, { useState } from 'react';
import './Featured.scss';
import images from '../../constants/images';
import { Link, useNavigate } from 'react-router-dom';

const Featured = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/gigs/?search=${input}`)
  }

  return (
    <header className="featured">
      <div className="container">
        <div className="left">
          <h1>Find the perfect <i>freelance</i> services for your business</h1>
          <div className="search">
            <div className="searchInput">
              <img src={images.search} alt="" />
              <input type="text" placeholder="Try 'mobile app development'" onChange={(e) => setInput(e.target.value)} />
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <ul className="popular list-none">
            <li>Popular:</li>
            <li>
              <Link to={`/gigs?cat=web`}>Web Design</Link>
            </li>
            <li>
              <Link to={`/gigs?cat=web`}>Wordpress</Link>
            </li>
            <li>
              <Link to={`/gigs?cat=design`}>Logo Design</Link>
            </li>
            <li>
              <Link to={`/gigs?cat=content`}>AI Services</Link>
            </li>
          </ul>
        </div>
        <div className="right">
          <img src={images.man} alt="man" />
        </div>
      </div>
    </header>
  );
};

export default Featured;
