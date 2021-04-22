import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import './style.scss';
import { Layout } from '@/layouts';
import { SetList } from '@/features/Sets';
import { SetAPI } from '@/api';

const SearchPage = () => {
  const { keyword } = useParams();

  return (
    <Layout>
      <Helmet>
        <title>Subject: {keyword} | Flashlet</title>
      </Helmet>
      <div className="search">
        <SetList
          title="Your sets"
          keyword={keyword}
          fetchData={SetAPI.searchSets}
        />
      </div>
    </Layout>
  );
};

export default SearchPage;
