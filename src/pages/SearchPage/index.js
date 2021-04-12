import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './style.scss';
import { Layout } from '@/layouts';
import { SetList } from '@/features/Sets';
import { SetAPI } from '@/api';

const SearchPage = () => {
  const { keyword } = useParams();
  const [sets, setSets] = useState([]);

  useEffect(async () => {
    const data = await SetAPI.searchSets(keyword);
    setSets(data.sets);
  }, []);

  return (
    <Layout>
      <div className="search">
        <h1 className="search__keyword">{keyword}</h1>
        <div className="search__top">
          <h3 className="search__title">Sets</h3>
          <select className="search__sort" name="sort">
            <option value="title">A-Z</option>
            <option value="mostRecent">Most recent</option>
          </select>
        </div>
        <div className="search__main">
          <SetList sets={sets} />
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
