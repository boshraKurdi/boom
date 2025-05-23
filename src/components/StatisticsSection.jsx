import React from 'react';
import { useTranslation } from 'react-i18next';

const StatisticsSection = () => {
   const { t } = useTranslation();
  const stats = [
    { number: 324, label: `${t('Landmines Reported')}` },
    { number: 152, label: `${t('Landmines Cleared')}` },
    { number: 18, label: `${t('Active Teams')}` },
    { number: 43, label: `${t('Communities Protected')}` },
  ];

  return (
    <div className="stats">
      {stats.map((stat, index) => (
        <div key={index} className="stat-box">
          <h3>{stat.number}</h3>
          <p>{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatisticsSection;
