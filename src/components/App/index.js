import React from 'react';
import Field from '../common/Field';

import './style.scss';

const App = () => {
  return (
    <div className="App">
      <Field
        size="lg"
        name="email"
        label="Email address"
        //error="Email address is incorrect"
        placeholder="Your email address"
      />
    </div>
  );
};

export default App;
