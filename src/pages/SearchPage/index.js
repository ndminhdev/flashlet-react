import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import './style.scss';
import { Layout } from '@/layouts';
import { SetList } from '@/features/Sets';
import { SetAPI } from '@/api';
import { Button } from '@/components';

const sorts = [
  {
    label: 'Title A-Z',
    sort: '+title'
  },
  {
    label: 'Most Recent',
    sort: '-createdAt'
  }
];

const SearchPage = () => {
  const { keyword } = useParams();
  const [sets, setSets] = useState([]);
  const [sort, setSort] = useState('+title');
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [setsCount, setSetsCount] = useState(0);

  const handleLoadingMoreClick = () => {
    setPage(page + 1);
  };

  useEffect(async () => {
    const sortBy = sort.slice(1);
    let orderBy;

    if (sort.startsWith('+')) {
      orderBy = 1;
    } else {
      orderBy = -1;
    }

    const data = await SetAPI.searchSets(keyword, page, sortBy, orderBy, 8);
    setSets([...sets, ...data.sets]);
    setHasNextPage(data.hasNextPage);
    setSetsCount(data.setsCount);
  }, [page]);

  useEffect(async () => {
    const sortBy = sort.slice(1);
    let orderBy;

    if (sort.startsWith('+')) {
      orderBy = 1;
    } else {
      orderBy = -1;
    }

    const data = await SetAPI.searchSets(keyword, 1, sortBy, orderBy, 8);
    setSets(data.sets);
    setHasNextPage(data.hasNextPage);
  }, [sort]);

  return (
    <Layout>
      <Helmet>
        <title>Subject: {keyword} | Flashlet</title>
      </Helmet>
      <div className="search">
        <h1 className="search__keyword">
          {keyword} <span className="search__count">({setsCount})</span>
        </h1>
        {setsCount ? (
          <React.Fragment>
            <div className="search__top">
              <h3 className="search__title">Sets</h3>
              <div className="search__sorts">
                {sorts.map(({ sort, label }) => (
                  <button
                    key={sort}
                    className="search__sort-btn"
                    onClick={() => setSort(sort)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="search__main">
              <SetList sets={sets} />
              {hasNextPage ? (
                <Button
                  size="sm"
                  variant="gold"
                  onClick={handleLoadingMoreClick}
                >
                  Load more
                </Button>
              ) : (
                <span className="search__end-of-results">End of results</span>
              )}
            </div>
          </React.Fragment>
        ) : (
          <span className="search__info-text">No results</span>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
