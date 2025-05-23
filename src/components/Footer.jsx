// components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Logo from '../assets/logo.png'
import { FaLocationDot } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
const Footer = () => {
    const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h3><span className="alert-icon"><img style={{width:"45px"}} src={Logo} alt="logo" /></span> LandmineGuardian</h3>
          <p>
            {t('Providing critical landmine awareness, reporting, and educational resources to keep communities safe.')}
          </p>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>{t('Quick Links')}</h4>
          <ul>
            <li><a href="#">{t('Home')}</a></li>
            <li><a href="#">{t('Report Landmine')}</a></li>
            <li><a href="#">{t('Map')}</a></li>
            <li><a href="#">{t('Team Status')}</a></li>
            <li><a href="#">{t('Education')}</a></li>
            <li><a href="#">{t('Events')}</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>{t('Contact')}</h4>
          <p><FaPhone/> {t('Emergency')}: +1-800-555-0123</p>
          <p><MdEmail/> info@landmineguardian.org</p>
          <p><FaLocationDot/> {t('Headquarters')}: 123 Safety Street, Secure City, SC 12345</p>
        </div>

        <div className="footer-newsletter">
          <h4>{t("Newsletter")}</h4>
          <p>{t('Stay updated with the latest landmine awareness news and safety tips.')}</p>
          <input type="email" placeholder="Enter your email" />
          <button>{t('Subscribe')}</button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 LandmineGuardian. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">UN Landmine Resources</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
