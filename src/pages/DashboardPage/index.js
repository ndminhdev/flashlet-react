import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import './style.scss';
import { Layout } from '@/layouts';
import { SetList } from '@/features/Sets';
import icons from '@/utils/icons';
import { SetAPI } from '@/api';

const sidebarItems = [
  {
    name: 'sets',
    label: 'Study sets',
    icon: icons.Set
  }
];

const DashboardPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Dashboard | Flashlet</title>
      </Helmet>
      <div className="dashboard">
        <div className="dashboard__sidebar">
          <Link className="dashboard__create-btn" to="/create-set">
            + Create Set
          </Link>
          <ul className="dashboard__sidebar-list">
            {sidebarItems.map(({ name, label, icon: Icon }) => (
              <li className="dashboard__sidebar-item" key={name}>
                <Icon className="dashboard__sidebar-icon" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="dashboard__main">
          <SetList title="Your sets" fetchData={SetAPI.getMySets} />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
