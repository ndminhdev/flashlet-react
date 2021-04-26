import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './style.scss';
import { Layout } from '@/layouts';
import { Flashcards } from '@/features/Sets';
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
  const { setId } = useParams();
  const [set, setSet] = useState(null);

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
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </Layout>
  );
};

export default SetPage;
