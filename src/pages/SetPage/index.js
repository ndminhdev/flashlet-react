import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './style.scss';
import { Layout } from '@/layouts';
import { IconButton } from '@/components';
import { Flashcards } from '@/features/Sets';
import { useAuth, useNavigate, useClipboard } from '@/hooks';
import icons from '@/utils/icons';
import { SetAPI } from '@/api';

const sidebarItems = [
  {
    name: 'flashcards',
    label: 'Flashcards',
    icon: icons.Card
  },
  {
    name: 'learn',
    label: 'Write',
    icon: icons.Write
  }
];

const SetPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setId } = useParams();
  const [set, setSet] = useState(null);
  const { success, copy } = useClipboard();

  const onLinkCopy = () => {
    copy(`http://localhost:8080/sets/${set._id}`);
  };

  useEffect(() => {
    (async () => {
      const responseData = await SetAPI.getSetById(setId);
      setSet(responseData.set);
    })();
  }, []);

  return (
    <Layout>
      <div className="set">
        {set && (
          <React.Fragment>
            <div className="set__info">
              <h1>{set.title}</h1>
              <p className="set__description">{set.description}</p>
            </div>
            <div className="set__container">
              <div className="set__sidebar">
                {sidebarItems.map(({ name, label, icon: Icon }) => (
                  <div key={name} className="set__sidebar-item">
                    <Icon className="set__sidebar-icon" />
                    <span className="set__sidebar-label">{label}</span>
                  </div>
                ))}
              </div>
              <div className="set__main">
                <Flashcards set={set} />
                <div className="set__bottom">
                  <Link
                    className="set__user"
                    to={`/users/${set.user.username}`}
                  >
                    <div className="set__image-container">
                      <img
                        className="set__image"
                        src={
                          set.user.profileImage || set.user.profileImageDefault
                        }
                        alt="profile-image"
                      />
                    </div>
                    <div className="set__text">
                      <span className="set__created-by">Create by</span>
                      <span className="set__name">{set.user.name}</span>
                    </div>
                  </Link>
                  <div className="set__tools">
                    {set.user._id === user?._id && (
                      <IconButton
                        icon={icons.Edit}
                        onClick={() => navigate(`/sets/${set._id}/cards`)}
                      />
                    )}
                    <IconButton
                      icon={success ? icons.Check : icons.GetLink}
                      onClick={onLinkCopy}
                    />
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </Layout>
  );
};

export default SetPage;
