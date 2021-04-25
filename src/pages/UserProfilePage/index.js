import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './style.scss';
import { Layout } from '@/layouts';
import { SetList } from '@/features/Sets';
import { UserAPI } from '@/api';

const UserProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const responseData = await UserAPI.getUserProfile(username);
      setUser(responseData.user);
    })();
  }, []);

  return (
    <Layout>
      <div className="user-profile">
        {user && (
          <React.Fragment>
            <div className="user-profile__user">
              <div className="user-profile__image-container">
                <img
                  className="user-profile__image"
                  src={user.profileImage || user.profileImageDefault}
                  alt="profile-image"
                />
              </div>
              <div className="user-profile__info">
                <span className="user-profile__name">{user.name}</span>
                <span className="user-profile__email">{user.email}</span>
              </div>
            </div>
            <div className="user-profile__main">
              <SetList
                title={`${user.name}'s sets`}
                fetchData={UserAPI.getPublicSetsOfAnUser(user.username)}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    </Layout>
  );
};

export default UserProfilePage;
