import React from 'react';
import Button from '../common/Button';

import './style.scss';

const App = () => {
  return (
    <div className="App">
      <Button variant="cyan">Button cyan</Button>
      <Button variant="gold">Button gold</Button>
      <Button variant="neutral">Button neutral</Button>
      <Button variant="ink">Button ink</Button>
      <Button variant="none">Button none</Button>
      <Button size="sm">Button small</Button>
      <Button size="md">Button medium</Button>
      <Button size="lg">Button large</Button>
      <Button block={true}>Button block</Button>
    </div>
  );
};

export default App;
