import React from 'react';
import { AlertTriangle } from "lucide-react";
import { useTranslation } from 'react-i18next';
const RegionCard = ({ region, risk, teams, responseTime, incidents, theme }) => {
  const { t } = useTranslation();
  return (
    <div className={`region-card ${theme}`}>
      <div className="region-header">
        <h3> <AlertTriangle/>{region}</h3>
        <p className="risk-level">
          {risk === 'danger' && 'High-risk area with active reports'}
          {risk === 'warning' && 'Medium-risk area with monitoring'}
          {risk === 'safe' && 'Low-risk area with regular patrols'}
        </p>
      </div>
      <div className="region-details">
        <p><strong>{t("Team Coverage")}:</strong> {teams} {t('team')}</p>
        <p><strong>{t('Response Time')}:</strong> {responseTime}</p>
        <p><strong>{t('Active Incidents')}:</strong> {incidents} {t('report')}</p>
        <button className="view-teams-btn">{t('View Teams')}</button>
      </div>
    </div>
  );
};

export default RegionCard;
