import React from 'react';

import './Home.scss';
import Featured from '../../components/featured/Featured';
import TrustedBy from '../../components/trustedBy/TrustedBy';
import Slide from '../../components/Slide/Slide';
import { cards, projects } from '../../constants/data';
import CatCard from '../../components/catCard/CatCard';
import images from '../../constants/images';
import ProjectCard from '../../components/projectCard/ProjectCard';

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

      <section className="features dark">
        <div className="container">
          <section className="item">
            <article>
              <h2>
                Fiverr <em>Business</em>
              </h2>
              <h3>
                A business solution designed for <em>teams</em>
              </h3>
              <p>
                Upgrade to a curated experience packed with tools and benefits,
                dedicated to businesses
              </p>
            </article>

            <figure className="title">
              <img src={images.check} alt="" />
              <figcaption>The best for every budget</figcaption>
            </figure>

            <figure className="title">
              <img src={images.check} alt="" />
              <figcaption>The best for every budget</figcaption>
            </figure>

            <figure className="title">
              <img src={images.check} alt="" />
              <figcaption>The best for every budget</figcaption>
            </figure>

            <button>Explore Fiverr Business</button>
          </section>

          <section className="item">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt=""
            />
          </section>
        </div>
      </section>

      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((item) => (
          <ProjectCard key={item.id} item={item} />
        ))}
      </Slide>
    </div>
  );
};

export default Home;
