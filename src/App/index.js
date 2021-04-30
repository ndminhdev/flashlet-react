import React, { useEffect } from 'react';

import './style.scss';
import AppRoutes from '@/routes';
import { usePreferences } from '@/hooks';

const App = () => {
  const preferences = usePreferences();

  // enable dark mode in whole app pages
  useEffect(() => {
    if (preferences.darkMode) {
      document.documentElement.className = 'dark';
    } else {
      document.documentElement.className = '';
    }
  }, [preferences.darkMode]);

  return <AppRoutes />;
};

export default App;
