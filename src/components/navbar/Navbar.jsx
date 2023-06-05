import React, { useCallback, useEffect, useState } from 'react';

import './Navbar.scss';
import { Link } from 'react-router-dom';
import images from '../../constants/images';

const Navbar = () => {
  const [isActive, setIsActive] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const checkIsActive = () => {
    window.scrollY > 0 ? setIsActive(true) : setIsActive(false);
  };

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', checkIsActive);

    return () => window.removeEventListener('scroll', checkIsActive);
  }, []);

  const currentUser = {
    id: 1,
    username: 'John Doe',
    isSeller: true,
    imgSrc: ''
  };

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
          {!currentUser?.isSeller && <li>Become a Seller</li>}
          {!currentUser && (
            <li>
              <button>Join</button>
            </li>
          )}
          {currentUser && (
            <li className="user" onClick={toggleMenu}>
              <img src={currentUser.imgSrc || images.avatar} alt="user dp" />
              <span>{currentUser?.username}</span>
              {menuOpen && (
                <ul className="options">
                  {currentUser?.isSeller && (
                    <>
                      <li>Gigs</li>
                      <li>Add New Gig</li>
                    </>
                  )}
                  <li>Orders</li>
                  <li>Messages</li>
                  <li>Logout</li>
                </ul>
              )}
            </li>
          )}
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
