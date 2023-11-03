import React from 'react';

import { Slider } from 'infinite-react-carousel/lib';
import { Link, useParams } from 'react-router-dom';
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
              GigHouse {'>'} {data.cat} {'>'}
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
                  src={dataUser.img || images.avatar}
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
            {data.images?.map((image) => (
              <img
                key={image}
                src={image}
                alt=""
              />
            ))}
            </Slider>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            <div className="seller">
              <h2>About The Seller</h2>
              <div className="user">
                <img
                  src={dataUser?.img || images.avatar}
                  alt=""
                />
                <div className="info">
                  <span>Anna Bell</span>
                  <div className="stars">
                    {!isNaN(data.totalStars / data.starNumber) ? (
                      <>
                        {Array(Math.round(data.totalStars / data.starNumber))
                        .fill() .map((item, idx) => (
                        <img src={images.star} alt="star" key={idx} />
                        ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </>
                    ) : (
                      <>
                        <img src={images.star} alt="star" /> No rating
                      </>
                    )}
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
                    <span className="desc">
                      {formatDate(dataUser?.createdAt)}
                    </span>
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
                <p>{dataUser?.desc}</p>
              </div>
            </div>

            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src={images.clock} alt="" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="item">
                <img src={images.recycle} alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div key={feature._id} className="item">
                  <img src={images.greencheck} alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gig;
