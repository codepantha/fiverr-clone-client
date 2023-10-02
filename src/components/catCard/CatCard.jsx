import React from 'react';
import { Link } from 'react-router-dom'

import './CatCard.scss'

const CatCard = ({ item }) => {
  return (
    <Link to="/gigs?category=design">
      <article className="catCard">
        <figure>
          <img src={item.img} alt={item.title} />
          <p className="desc">{item.desc}</p>
          <figcaption className="title">{item.title}</figcaption>
        </figure>
      </article>
    </Link>
  )
}

export default CatCard