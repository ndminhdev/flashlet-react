import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Collection from '../Collection';

const CollectionList = ({ collections }) => {
  return (
    <div className="collection-list">
      {collections.map((c) => (
        <Collection key={c._id} {...c} />
      ))}
    </div>
  );
};

CollectionList.propTypes = {
  collections: PropTypes.array.isRequired
};

export default CollectionList;
