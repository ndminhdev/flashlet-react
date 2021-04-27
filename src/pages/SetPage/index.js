import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect
} from 'react-router-dom';

import './style.scss';
import { Layout } from '@/layouts';
import { IconButton } from '@/components';
import { Flashcards, WritingCards } from '@/features/Sets';
import { useAuth, useNavigate, useClipboard } from '@/hooks';
import icons from '@/utils/icons';
import { SetAPI } from '@/api';

const sidebarItems = [
  {
    path: '/flashcards',
    label: 'Flashcards',
    icon: icons.Card,
    component: Flashcards
  },
  {
    path: '/write',
    label: 'Write',
    icon: icons.Write,
    component: WritingCards
  }
];

const SetPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setId } = useParams();
  const match = useRouteMatch();
  const [set, setSet] = useState(null);
  const { success, copy } = useClipboard();

  const onLinkCopy = () => {
    copy(`http://localhost:8080/sets/${set._id}`);
  };

  useEffect(() => {
    console.log(location);
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
                {sidebarItems.map(({ path, label, icon: Icon }) => (
                  <Link
                    to={match.url + path}
                    key={path}
                    className={`set__sidebar-item ${
                      false && 'set__sidebar-item--active'
                    }`}
                  >
                    <Icon className="set__sidebar-icon" />
                    <span className="set__sidebar-label">{label}</span>
                  </Link>
                ))}
              </div>
              <div className="set__main">
                <Switch>
                  {sidebarItems.map(({ path, component: Component }) => (
                    <Route key={path} exact path={match.url + path}>
                      <Component set={set} />
                    </Route>
                  ))}
                  <Redirect to={match.url + '/flashcards'} />
                </Switch>
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
                        onClick={() => navigate(`/sets/edit/${set._id}`)}
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
