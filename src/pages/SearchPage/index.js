import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './style.scss';
import { Layout } from '@/layouts';
import { CollectionList } from '@/features/Collections';
import { CollectionAPI } from '@/api';

const SearchPage = () => {
  const { keyword } = useParams();
  const [collections, setCollections] = useState([]);

  useEffect(async () => {
    const data = await CollectionAPI.searchCollections(keyword);
    setCollections(data.collections);
  }, []);

  return (
    <Layout>
      <div className="search">
        <h1 className="search__keyword">{keyword}</h1>
        <div className="search__top">
          <h3 className="search__title">Collections</h3>
          <select className="search__sort" name="sort">
            <option value="mostRelevant">Most relevant</option>
            <option value="mostRecent">Most recent</option>
          </select>
        </div>
        <div className="search__main">
          <CollectionList collections={collections} />
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
