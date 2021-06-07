import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import './style.scss';
import { Layout } from '@/layouts';
import { DarkToggle } from '@/features/Preferences';
import { useToken, useDispatch } from '@/hooks';
import { PreferenceAPI } from '@/api';
import { setPreferences } from '@/context/actions/session';

const preferenceItems = [
  {
    key: 'darkMode',
    title: 'Enable Dark Mode',
    component: DarkToggle
  }
];

const PreferencesPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Preferences | Flashlet</title>
      </Helmet>
      <div className="settings">
        <h1>Preferences</h1>

        <div className="settings__main">
          {preferenceItems.map(({ key, title, component: Component }) => (
            <div key={key} className="settings__field">
              <div className="settings__heading">{title}</div>
              <div className="settings__component">
                <Component />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PreferencesPage;
