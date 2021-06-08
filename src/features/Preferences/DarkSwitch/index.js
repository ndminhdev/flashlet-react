import React, { useEffect } from 'react';

import { Switch } from '@/components';
import { useToken, useDispatch, usePreferences } from '@/hooks';
import { PreferenceAPI } from '@/api';
import icons from '@/utils/icons';
import { setPreferences, toggleDarkMode } from '@/context/actions/session';

const html = document.documentElement;

const DarkSwitch = () => {
  const token = useToken();
  const dispatch = useDispatch();
  const preferences = usePreferences();
  const { darkMode } = preferences;

  const onDarkSwitch = () => {
    toggleDarkMode(dispatch);
  };

  useEffect(() => {
    if (darkMode) {
      html.className = 'dark';
    } else {
      html.className = '';
    }

    (async () => {
      const responseData = await PreferenceAPI.changePreferences(
        {
          darkMode
        },
        token
      );
      setPreferences(dispatch, responseData);
    })();
  }, [darkMode]);

  // Dark Switch

  return (
    <Switch
      name="darkMode"
      checked={darkMode}
      onChange={onDarkSwitch}
      icons={{
        checked: icons.Sun,
        unchecked: icons.Moon
      }}
    />
  );
};

export default DarkSwitch;
