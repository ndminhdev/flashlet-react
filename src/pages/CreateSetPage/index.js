import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import './style.scss';
import { Layout } from '@/layouts';
import { SetForm } from '@/features/Sets';
import { useToken, useNavigate } from '@/hooks';
import { SetAPI } from '@/api';

const CreateSetPage = () => {
  const token = useToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSetAdd = async (data) => {
    try {
      setLoading(true);
      const responseData = await SetAPI.createSet(data, token);
      setLoading(false);
      navigate(`/sets/${responseData.set._id}/cards`);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Create a new study set | Flashlet</title>
      </Helmet>
      <div className="create-set-page">
        <SetForm loading={loading} onSubmit={onSetAdd} />
      </div>
    </Layout>
  );
};

export default CreateSetPage;
