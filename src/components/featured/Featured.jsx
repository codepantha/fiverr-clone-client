import React from 'react';
import './Featured.scss';
import images from '../../constants/images';

const Featured = () => {
  return (
    <header className="featured">
      <div className="container">
        <div className="left">
          <h1>Find the perfect <i>freelance</i> services for your business</h1>
          <div className="search">
            <div className="searchInput">
              <img src={images.search} alt="" />
              <input type="text" placeholder="Try 'mobile app development'" />
            </div>
            <button>Search</button>
          </div>
          <ul className="popular list-none">
            <li>Popular:</li>
            <li>
              <button>Web Design</button>
            </li>
            <li>
              <button>Wordpress</button>
            </li>
            <li>
              <button>Logo Design</button>
            </li>
            <li>
              <button>AI Services</button>
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
