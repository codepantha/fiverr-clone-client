import React from 'react';

import './Home.scss';
import Featured from '../../components/featured/Featured';
import TrustedBy from '../../components/trustedBy/TrustedBy';
import Slide from '../../components/Slide/Slide';
import { cards } from '../../constants/data';
import CatCard from '../../components/catCard/CatCard';
import images from '../../constants/images';

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} item={card} />
        ))}
      </Slide>

      <section className="features">
        <div className="container">
          <section className="item">
            <h2>A whole world of freelance talent at your fingertips</h2>
            <article>
              <figure className="title">
                <img src={images.check} alt="" />
                <figcaption>The best for every budget</figcaption>
              </figure>
              <p>
                Find high-quality services at every price point. No hourly
                rates, just project-based pricing.
              </p>
            </article>
            <article>
              <figure className="title">
                <img src={images.check} alt="" />
                <figcaption>The best for every budget</figcaption>
              </figure>
              <p>
                Find high-quality services at every price point. No hourly
                rates, just project-based pricing.
              </p>
            </article>
            <article>
              <figure className="title">
                <img src={images.check} alt="" />
                <figcaption>The best for every budget</figcaption>
              </figure>
              <p>
                Find high-quality services at every price point. No hourly
                rates, just project-based pricing.
              </p>
            </article>
          </section>

          <section className="item">
            <video src="../video.mp4" controls></video>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Home;
