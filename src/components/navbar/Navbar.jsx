import React, { useCallback, useEffect, useState } from 'react';

import './Navbar.scss';
import { Link, useLocation } from 'react-router-dom';
import images from '../../constants/images';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
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

  const { pathname } = useLocation();

  const currentUser = {
    id: 1,
    username: 'John Doe',
    isSeller: true,
    imgSrc: ''
  };

  return (
    <nav className={isActive || pathname !== '/' ? 'navbar active' : 'navbar'}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Fiverr</span>
          </Link>
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
                      <li>
                        <Link className="link" to="/mygigs">
                          Gigs
                        </Link>
                      </li>
                      <li>
                        <Link className="link" to="/add">
                          Add New Gig
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link className="link" to="/orders">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="link" to="/messages">
                      Messages
                    </Link>
                  </li>
                  <li>
                    <Link className="link" to="/">
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </div>

      {(isActive || pathname !== '/') && (
        <>
          <hr />
          <ul className="container menu">
            <li className="list-none">
              <Link className="link menuLink" to="/">
                Graphics & Design
              </Link>
            </li>

            <li className="list-none">
              <Link className="link menuLink" to="/">
                Video & Animation
              </Link>
            </li>

            <li className="list-none">
              <Link className="link menuLink" to="/">
                Writing & Translation
              </Link>
            </li>

            <li className="list-none">
              <Link className="link menuLink" to="/">
                AI Services
              </Link>
            </li>

            <li className="list-none">
              <Link className="link menuLink" to="/">
                Digital Marketing
              </Link>
            </li>

            <li className="list-none">
              <Link className="link menuLink" to="/">
                Music & Audio
              </Link>
            </li>

            <li className="list-none">
              <Link className="link menuLink" to="/">
                Programming & Tech
              </Link>
            </li>

            <li className="list-none">
              <Link className="link menuLink" to="/">
                Business
              </Link>
            </li>

            <li className="list-none">
              <Link className="link menuLink" to="/">
                Lifestyle
              </Link>
            </li>
          </ul>
          <hr />
        </>
      )}
    </nav>
  );
};

export default Navbar;
