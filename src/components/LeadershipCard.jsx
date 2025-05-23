// components/LeadershipCard.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserCircle, FaMapMarkerAlt, FaPhoneAlt, FaMedal } from 'react-icons/fa';

const LeadershipCard = ({ name, title, expertise, location, contact }) => {
      const { t } = useTranslation();
  return (
    <div className="leadership-card">
      <FaUserCircle className="leader-icon" />
      <h3>{name}</h3>
      <p className="title">{title}</p>

      <div className="info">
        <p className='info_flex'><div><FaMedal /> <strong>{t('Expertise')}:</strong></div> <div className='info_b'>{expertise}</div></p>
        <p className='info_flex'><div><FaMapMarkerAlt /> <strong>{t('Location')}:</strong></div> <div className='info_b'> {location}</div></p>
        <p className='info_flex'><div><FaPhoneAlt /> <strong>{t('Contact')}:</strong></div> <div className='info_b'>{contact}</div></p>
      </div>
    </div>
  );
};

export default LeadershipCard;
