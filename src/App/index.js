import React from 'react';

import './style.scss';
import { CollectionList } from '@/features/Collections';

const collection = {
  title: 'Business Test For English Native Speaker (Part 2)',
  user: {
    _id: '0123',
    name: 'Jason Bennedith',
    profileImage:
      'https://res-1.cloudinary.com/crunchbase-production/image/upload/c_thumb,h_256,w_256,f_auto,g_faces,z_0.7,q_auto:eco/v1443584492/vosgqpvicpjgknz2rn2l.png'
  },
  numOfTerms: 46,
  previewTerms: [
    {
      _id: 0,
      text: 'origin',
      description: 'The starting point on the grid'
    },
    {
      _id: 1,
      text: 'origin',
      description: 'The starting point on the grid'
    },
    {
      _id: 2,
      text: 'origin',
      description: 'The starting point on the grid'
    },
    {
      _id: 3,
      text: 'origin',
      description: 'The starting point on the grid'
    }
  ]
};

const collections = Array.from({ length: 4 }, (v, i) => ({
  _id: i.toString(),
  ...collection
}));

const App = () => {
  return (
    <div className="App">
      <CollectionList collections={collections} />
    </div>
  );
};

export default App;
