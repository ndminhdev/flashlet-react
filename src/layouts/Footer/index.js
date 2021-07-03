import React from 'react';

import './style.scss';
import icons from '@/utils/icons';
const { Facebook, Twitter, Youtube, Instagram } = icons;

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <a href="/" className="footer__logo">Flashlet</a>
          <div className="footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook className="footer__social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="footer__social-icon" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <Youtube className="footer__social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram className="footer__social-icon" />
            </a>
          </div>
        </div>
        <div className="footer__bottom">© 2021 Flashlet - All rights reserved</div>
      </div>
    </footer>
  )
};

export default Footer;
