import { useEffect, useRef, useState } from 'react';

import './Gigs.scss';
import images from '../../constants/images';
import GigCard from '../../components/gigCard/GigCard';
import { useQuery } from '@tanstack/react-query';
import axiosRequest from '../../utils/axiosRequest';
import { useLocation } from 'react-router-dom';

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState('sales');
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axiosRequest
        .get(
          `/gigs?${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => res.data)
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const onApply = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">FIVERR > GRAPHICS & DESIGN</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Fiverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="text" placeholder="min" ref={minRef} />
            <input type="text" placeholder="max" ref={maxRef} />
            <button onClick={onApply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === 'sales' ? 'Best Selling' : 'Newest'}
            </span>
            <img src={images.down} alt="down" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === 'sales' ? (
                  <span onClick={() => reSort('createdAt')}>Newest</span>
                ) : (
                  <span onClick={() => reSort('sales')}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? 'loading...'
            : error
            ? 'Something bad happened!'
            : data.gigs.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
