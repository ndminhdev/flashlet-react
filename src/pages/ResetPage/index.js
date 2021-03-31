import React from 'react';

import './style.scss';
import { ResetForm } from '@/features/Auth';
import { Layout } from '@/layouts';
import { illustrations } from '@/utils/images';

const LeftImage = illustrations.left;
const RightImage = illustrations.right;

const ResetPage = () => (
  <Layout>
    <div className="forgotten">
      <ResetForm />
      <LeftImage className="forgotten__left" />
      <RightImage className="forgotten__right" />
    </div>
  </Layout>
);

export default ResetPage;
