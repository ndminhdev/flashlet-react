import React, { useState, useEffect } from 'react';

import './style.scss';
import { Toggle } from '@/components';
import { useToken, useDispatch, usePreferences } from '@/hooks';
import { PreferenceAPI } from '@/api';
import { setPreferences } from '@/context/actions/session';

const html = document.documentElement;

const DarkToggle = () => {
  const token = useToken();
  const dispatch = useDispatch();
  const preferences = usePreferences();
  const [dark, setDark] = useState(preferences.darkMode);

  const onDarkToggle = () => {
    setDark(!dark);
  };

  useEffect(() => {
    if (dark) {
      html.className = 'dark';
    } else {
      html.className = '';
    }

    (async () => {
      const responseData = await PreferenceAPI.changePreferences(
        {
          darkMode: dark
        },
        token
      );
      setPreferences(dispatch, responseData);
    })();
  }, [dark]);

  // Dark Toggle🌙🔆

  return (
    <Toggle
      name="darkMode"
      checked={dark}
      onChange={onDarkToggle}
      icons={{ checked: '🌙', unchecked: '🔆' }}
    />
  );
};

export default DarkToggle;
