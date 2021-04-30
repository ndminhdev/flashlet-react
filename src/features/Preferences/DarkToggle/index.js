import React, { useState, useEffect } from 'react';

import './style.scss';
import { Toggle } from '@/components';
import { useToken, useDispatch, usePreferences } from '@/hooks';
import { PreferenceAPI } from '@/api';
import { setPreferences, toggleDarkMode } from '@/context/actions/session';

const html = document.documentElement;

const DarkToggle = () => {
  const token = useToken();
  const dispatch = useDispatch();
  const preferences = usePreferences();
  const { darkMode } = preferences;

  const onDarkToggle = () => {
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

  // Dark Toggle🌙🔆

  return (
    <Toggle
      name="darkMode"
      checked={darkMode}
      onChange={onDarkToggle}
      icons={{ checked: '🌙', unchecked: '🔆' }}
    />
  );
};

export default DarkToggle;
