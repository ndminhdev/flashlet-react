import React from 'react';

import './style.scss';
import { AdaptableCard } from '@/features/Cards';

const Flashcards = () => {
  return (
    <div className="flashcards">
      <AdaptableCard
        _id="someid"
        term="origin"
        definition="the starting point on the grid"
        imageUrl="https://images.unsplash.com/photo-1544511916-0148ccdeb877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1901&q=80i&auto=format&fit=crop"
      />
    </div>
  );
};

export default Flashcards;
