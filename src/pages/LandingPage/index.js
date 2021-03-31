import React, { useEffect, useState } from 'react';

import './style.scss';

import { Layout } from '@/layouts';
import { Button, Overlay } from '@/components';
import { SignInBox, SignUpBox } from '@/features/Auth';
import { useOverlay } from '@/hooks';

import { carouselImages } from '@/utils/images';

const carouselItems = [
  {
    id: 0,
    image: carouselImages.carouselOne,
    quote: 'I am done with my books. I will try something new.'
  },
  {
    id: 1,
    image: carouselImages.carouselTwo,
    quote: 'Tonight I work, so tomorrow I can hang out'
  },
  {
    id: 2,
    image: carouselImages.carouselThree,
    quote: 'I can sleep all day after exams are over'
  }
];

const SWAP_TIME = 3000;

const LandingPage = () => {
  const [currentItem, setCurrenItem] = useState(carouselItems[0]);
  const [progress, setProgress] = useState(0);
  const [showSignInOverlay, toggleShowSignInOverlay] = useOverlay();
  const [showSignUpOverlay, toggleShowSignUpOverlay] = useOverlay();

  useEffect(() => {
    const item =
      currentItem.id >= carouselItems.length - 1
        ? carouselItems[0]
        : carouselItems[currentItem.id + 1];

    const timeout = setTimeout(() => {
      setCurrenItem(item);
    }, SWAP_TIME);
    return () => clearInterval(timeout);
  }, [currentItem]);

  return (
    <React.Fragment>
      <Layout>
        <div className="landing">
          <div className="landing__hero">
            <h1 className="landing__title">
              Unstoppable <br />
              Motivate yourself <br />
              Take up new challenges
            </h1>
            <span className="landing__description">
              Try our incredible study tools
            </span>
            <Button size="lg" variant="gold" onClick={toggleShowSignUpOverlay}>
              TRY FOR FREE
            </Button>
          </div>

          <div className="landing__carousel">
            <div className="landing__image">
              <img src={currentItem.image} alt={`carousel-${currentItem.id}`} />
            </div>
            <p className="landing__text">Flashlet is for</p>
            <span className="landing__quote">
              &quot;{currentItem.quote}&quot;
            </span>
            <div className="landing__processbar">
              <span
                className="landing__processcursor"
                style={{
                  width: `${progress}%`
                }}
              >
                &nbsp;
              </span>
            </div>
          </div>
        </div>
      </Layout>
      <Overlay
        component={SignInBox}
        show={showSignInOverlay}
        toggleShow={toggleShowSignInOverlay}
      />
      <Overlay
        component={SignUpBox}
        show={showSignUpOverlay}
        toggleShow={toggleShowSignUpOverlay}
        showSignInOverlay={toggleShowSignInOverlay}
      />
    </React.Fragment>
  );
};

export default LandingPage;
