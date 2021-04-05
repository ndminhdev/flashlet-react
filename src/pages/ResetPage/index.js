import React from 'react';

import './style.scss';
import { ResetForm } from '@/features/Auth';
import { Layout } from '@/layouts';
import { illustrations } from '@/utils/images';

const LeftImage = illustrations.left;
const RightImage = illustrations.right;

const ResetPage = () => (
  <Layout>
    <div className="reset">
      <ResetForm />
      <LeftImage className="reset__left" />
      <RightImage className="reset__right" />
    </div>
  </Layout>
);

export default ResetPage;
