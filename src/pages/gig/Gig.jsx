import React from 'react';

import { Slider } from 'infinite-react-carousel/lib';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import './Gig.scss';
import images from '../../constants/images';
import axiosRequest from '../../utils/axiosRequest';
import { formatDate } from '../../utils/helper';
import Reviews from '../../components/reviews/Reviews';

const Gig = () => {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ['gig'],
    queryFn: () => axiosRequest.get(`/gigs/${id}`).then((res) => res.data)
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => axiosRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId
  });

  return (
    <div className="gig">
      {isLoading ? (
        'loading...'
      ) : error ? (
        'Somethign went wrong!'
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              GigHouse {'>'} Graphics & Design {'>'}
            </span>
            <h1>{data.title}</h1>

            {isLoadingUser ? (
              'loading...'
            ) : errorUser ? (
              'Something went wrong!'
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, idx) => (
                        <img src={images.star} alt="star" key={idx} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              <img
                src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <img
                src="https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <img
                src="https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
            </Slider>
            <h2>About This Gig</h2>
            <p>
              {data.desc}
            </p>
            <div className="seller">
              <h2>About The Seller</h2>
              <div className="user">
                <img
                  src="https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <div className="info">
                  <span>Anna Bell</span>
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, idx) => (
                        <img src={images.star} alt="star" key={idx} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                  <button>Contact Me</button>
                </div>
              </div>
              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className="title">From</span>
                    <span className="desc">{dataUser?.country}</span>
                  </div>
                  <div className="item">
                    <span className="title">Member since</span>
                    <span className="desc">{formatDate(dataUser?.createdAt)}</span>
                  </div>
                  <div className="item">
                    <span className="title">Avg. response time</span>
                    <span className="desc">4 hours</span>
                  </div>
                  <div className="item">
                    <span className="title">Last delivery</span>
                    <span className="desc">1 day</span>
                  </div>
                  <div className="item">
                    <span className="title">Languages</span>
                    <span className="desc">English</span>
                  </div>
                </div>
                <hr />
                <p>{dataUser?.desc}
                </p>
              </div>
            </div>

            <Reviews gigId={id} />

          </div>
          <div className="right">
            <div className="price">
              <h3>1 AI generated image</h3>
              <h2>$ 59.99</h2>
            </div>
            <p>
              I will create a unique high quality AI generated image based on a
              description that you give me
            </p>
            <div className="details">
              <div className="item">
                <img src={images.clock} alt="" />
                <span>2 Days Delivery</span>
              </div>
              <div className="item">
                <img src={images.recycle} alt="" />
                <span>3 Revisions</span>
              </div>
            </div>
            <div className="features">
              <div className="item">
                <img src={images.greencheck} alt="" />
                <span>Prompt writing</span>
              </div>
              <div className="item">
                <img src={images.greencheck} alt="" />
                <span>Artwork delivery</span>
              </div>
              <div className="item">
                <img src={images.greencheck} alt="" />
                <span>Image upscaling</span>
              </div>
              <div className="item">
                <img src={images.greencheck} alt="" />
                <span>Additional design</span>
              </div>
            </div>
            <button>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gig;
