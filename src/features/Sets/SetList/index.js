import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Set from '../Set';

const SetList = ({ sets }) => {
  return (
    <div className="set-list">
      {sets.map((s) => (
        <Set key={s._id} {...s} />
      ))}
    </div>
  );
};

SetList.propTypes = {
  sets: PropTypes.array.isRequired
};

export default SetList;
