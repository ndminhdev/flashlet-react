import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import './style.scss';

import { Layout } from '@/layouts';
import { Button } from '@/components';
import { useDispatch, useOverlay } from '@/hooks';
import { showSignUpOverlay } from '@/context/actions/ui';

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
  const dispatch = useDispatch();
  const [currentItem, setCurrenItem] = useState(carouselItems[0]);
  const { signInOverlayShown, signUpOverlayShown } = useOverlay();

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

  const overlayShown = signInOverlayShown || signUpOverlayShown;

  return (
    <Layout>
      <Helmet>
        <title>Flashlet</title>
      </Helmet>
      <div className={`landing ${overlayShown ? 'landing--lock' : ''}`}>
        <div className="landing__hero">
          <h1 className="landing__title">
            Unstoppable <br />
            Motivate yourself <br />
            Take up new challenges
          </h1>
          <span className="landing__description">
            Try our incredible study tools
          </span>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => showSignUpOverlay(dispatch)}
          >
            TRY FOR FREE
          </Button>
        </div>

        <div className="landing__carousel">
          <div className="landing__image-container">
            <img
              className="landing__image"
              src={currentItem.image}
              alt={`carousel-${currentItem.id}`}
            />
          </div>
          <p className="landing__text">Flashlet is for</p>
          <span className="landing__quote">
            &quot;{currentItem.quote}&quot;
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
