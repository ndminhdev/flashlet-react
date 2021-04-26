import React, { useState } from 'react';

import './style.scss';
import { Button } from '@/components';
import { useToken, useDispatch } from '@/hooks';
import { signOut } from '@/context/actions/session';
import { UserAPI } from '@/api';

const SecurityArea = () => {
  const token = useToken();
  const dispatch = useDispatch();
  const [signOutLoading, setSignOutLoading] = useState(false);
  const [deleteAccountLoading, setDeleteAccountLoading] = useState(false);

  const onSignOutAllClick = async () => {
    try {
      setSignOutLoading(true);
      await UserAPI.signOutAll(token);
      setSignOutLoading(false);
      signOut(dispatch, token);
    } catch (err) {
      console.log(err);
      setSignOutLoading(false);
    }
  };

  const onDeleteAccountClick = async () => {
    try {
      setDeleteAccountLoading(true);
      await UserAPI.deleteAccount(token);
      setDeleteAccountLoading(false);
      signOut(dispatch, token);
    } catch (err) {
      console.log(err);
      setDeleteAccountLoading(false);
    }
  };

  return (
    <div className="security-area">
      <Button loading={signOutLoading} onClick={onSignOutAllClick}>
        Sign out
      </Button>
      <Button
        loading={deleteAccountLoading}
        variant="coral"
        onClick={onDeleteAccountClick}
      >
        Delete account
      </Button>
    </div>
  );
};

export default SecurityArea;
