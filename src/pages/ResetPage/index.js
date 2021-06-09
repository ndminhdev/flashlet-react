import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

import './style.scss';
import { ResetForm } from '@/features/Auth';
import { Layout } from '@/layouts';
import { illustrations } from '@/utils/images';

const LeftImage = illustrations.left;
const RightImage = illustrations.right;

const ResetPage = () => {
  const location = useLocation();
  const { token } = JSON.parse(
    '{"' +
      location.search.substring(1).replace(/&/g, '","').replace(/=/g, '":"') +
      '"}',
    function (key, value) {
      return key === '' ? value : decodeURIComponent(value);
    }
  );

  return (
    <Layout>
      <Helmet>
        <title>Reset your password | Flashlet</title>
      </Helmet>
      <div className="reset">
        <ResetForm token={token} />
        <LeftImage className="reset__left" />
        <RightImage className="reset__right" />
      </div>
    </Layout>
  );
};

export default ResetPage;
