import React, { useState, useEffect } from 'react';

import './style.scss';
import { Toggle } from '@/components';

const html = document.documentElement;

const DarkToggle = () => {
  const [dark, setDark] = useState(false);

  const onDarkToggle = () => {
    setDark(!dark);
  };

  useEffect(() => {
    if (dark) {
      html.className = 'dark';
    } else {
      html.className = '';
    }
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
