import React, { useEffect, useState } from 'react';

import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isActive, setIsActive] = useState(true);

  const checkIsActive = () => {
    window.scrollY > 0 ? setIsActive(true) : setIsActive(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkIsActive);

    return () => window.removeEventListener('scroll', checkIsActive);
  }, []);

  return (
    <nav className={isActive ? 'navbar active' : 'navbar'}>
      <div className="container">
        <div className="logo">
          {/* <Link to="/"> */}
          <span className="text">Fiverr</span>
          {/* </Link> */}
          <span className="dot">.</span>
        </div>

        <ul className="links">
          <li>Fiverr Business</li>
          <li>Explore</li>
          <li>English</li>
          <li>Sign in</li>
          <li>Become a Seller</li>
          <li>
            <button>Join</button>
          </li>
        </ul>
      </div>

      {isActive && (
        <>
          <hr />

          <div className="container menu">
            <span>Test</span>
            <span>Test2</span>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
