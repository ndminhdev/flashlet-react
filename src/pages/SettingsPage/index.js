import React from 'react';
import { Helmet } from 'react-helmet';

import './style.scss';
import { Layout } from '@/layouts';
import { DarkToggle } from '@/features/Settings';

const settings = [
  {
    key: 'darkMode',
    title: 'Enable Dark Mode',
    component: DarkToggle
  }
];

const SettingsPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Settings | Flashlet</title>
      </Helmet>
      <div className="settings">
        <h1>Settings</h1>

        <div className="settings__main">
          {settings.map(({ key, title, component: Component }) => (
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

export default SettingsPage;
