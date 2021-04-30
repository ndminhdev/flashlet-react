import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import './style.scss';
import { Layout } from '@/layouts';
import { SetForm } from '@/features/Sets';
import { useToken, useNavigate } from '@/hooks';
import { SetAPI } from '@/api';
import handleError from '@/utils/handleError';

const CreateSetPage = () => {
  const token = useToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const onSetAdd = async (data) => {
    try {
      setLoading(true);
      const responseData = await SetAPI.createSet(data, token);
      setLoading(false);
      navigate(`/sets/edit/${responseData.set._id}`);
    } catch (err) {
      setLoading(false);
      handleError(err, setErrMessage);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Create a new study set | Flashlet</title>
      </Helmet>
      <div className="create-set-page">
        <SetForm loading={loading} onSubmit={onSetAdd} error={errMessage} />
      </div>
    </Layout>
  );
};

export default CreateSetPage;
