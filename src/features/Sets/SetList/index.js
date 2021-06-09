import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Set from '../Set';
import { Button } from '@/components';
import { useToken } from '@/hooks';

const sorts = [
  {
    id: '-title',
    label: 'Title A-Z',
    sortBy: 'title',
    orderBy: 1
  },
  {
    id: '-createdAt',
    label: 'Most Recent',
    sortBy: 'createdAt',
    orderBy: -1
  }
];

const SetList = ({ title, keyword, fetchData }) => {
  const token = useToken();
  const [sets, setSets] = useState([]);
  const [sort, setSort] = useState({ sortBy: 'title', orderBy: 1 });
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [setsCount, setSetsCount] = useState(0);

  const handleLoadingMoreClick = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    (async () => {
      const { sortBy, orderBy } = sort;
      const data = await fetchData(
        { keyword, page, sortBy, orderBy, limit: 8 },
        token
      );
      setSets([...sets, ...data.sets]);
      setHasNextPage(data.hasNextPage);
      setSetsCount(data.setsCount);
    })();
  }, [page]);

  useEffect(() => {
    (async () => {
      const { sortBy, orderBy } = sort;
      const data = await fetchData(
        { keyword, page: 1, sortBy, orderBy, limit: 8 },
        token
      );
      setSets(data.sets);
      setHasNextPage(data.hasNextPage);
    })();
  }, [sort, keyword]);

  return (
    <div className="set-list">
      <h3 className="set-list__keyword">
        {keyword || title}{' '}
        <span className="set-list__count">({setsCount})</span>
      </h3>
      {setsCount ? (
        <React.Fragment>
          <div className="set-list__top">
            <h4 className="set-list__title">Sets</h4>
            <div className="set-list__sorts">
              {sorts.map(({ id, sortBy, orderBy, label }) => (
                <button
                  key={id}
                  className="set-list__sort-btn"
                  onClick={() => setSort({ sortBy, orderBy })}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="set-list__main">
            <div className="set-list__list">
              {sets.map((s) => (
                <Set key={s._id} {...s} />
              ))}
            </div>
            {hasNextPage ? (
              <Button size="sm" onClick={handleLoadingMoreClick}>
                Load more
              </Button>
            ) : (
              <span className="set-list__end-of-results">End of results</span>
            )}
          </div>
        </React.Fragment>
      ) : (
        <span className="set-list__info-text">No results</span>
      )}
    </div>
  );
};

SetList.propTypes = {
  title: PropTypes.string.isRequired,
  keyword: PropTypes.string,
  fetchData: PropTypes.func.isRequired
};

export default SetList;
