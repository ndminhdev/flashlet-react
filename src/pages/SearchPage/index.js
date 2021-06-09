import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import './style.scss';
import { Layout } from '@/layouts';
import { SetList } from '@/features/Sets';
import { SetAPI } from '@/api';

const SearchPage = () => {
  const { keyword } = useParams();
  const [key, setKey] = useState(keyword);

  useEffect(() => {
    setKey(keyword);
  }, [keyword]);

  return (
    <Layout>
      <Helmet>
        <title>Subject: {key} | Flashlet</title>
      </Helmet>
      <div className="search">
        <SetList
          title="Your sets"
          keyword={key}
          fetchData={SetAPI.searchSets}
        />
      </div>
    </Layout>
  );
};

export default SearchPage;
