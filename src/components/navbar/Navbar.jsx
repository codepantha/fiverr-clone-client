import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './Navbar.scss';
import images from '../../constants/images';
import axiosRequest from '../../utils/axiosRequest';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await axiosRequest.delete('/auth/logout');
      localStorage.setItem('currentUser', null);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const { pathname } = useLocation();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <nav className={isActive || pathname !== '/' ? 'navbar active' : 'navbar'}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">GigHouse</span>
          </Link>
          <span className="dot">.</span>
        </div>

        <ul className="links">
          <li>GigHouse Business</li>
          <li><Link className="link" to="/gigs">Explore</Link></li>
          <li>English</li>
          {!currentUser && (
            <Link className="link" to="/login">
              <li>Sign in</li>
            </Link>
          )}
          {!currentUser?.isSeller && <li>Become a Seller</li>}
          {!currentUser && (
            <li>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
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
                    <Link className="link" onClick={handleLogout}>
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
