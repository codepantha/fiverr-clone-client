import React from 'react';

import './GigCard.scss';
import images from '../../constants/images';
import { Link } from 'react-router-dom';

const GigCard = ({ item }) => {
  return (
    <Link to="/gigs/123" className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          <div className="user">
            <img src={item.pp} alt="" />
            <span>{item.username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <img src={images.star} alt="star" />
            <span>
              {!isNaN(Math.round(item.totalStars / item.starNumber)) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>

        <hr />

        <div className="details">
          <img src={images.heart} alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>${item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
