import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { Users } from 'lucide-react';

const TeamCard = ({ team }) => {
  const { t } = useTranslation();

  return (
    <div className="team-card">
      <div className="team-card-header">
        <div className="team-icon">
          <Users size={20} />
          <span>{t('Team')}</span>
        </div>
        <span className={`status-badge ${team.status}`}>
          {t(team.status)}
        </span>
      </div>

      <div className="team-card-body">
        <h3 className="team-name">{team.name}</h3>
        {/* <p className="team-desc">
          <span className={`status-dot ${team.status}`}></span>
          {team.description}
        </p> */}

        <div className="team-details">
          <div>
            <strong>{t('Members')}</strong>
            <p>{team?.users?.length ?? 0}</p>
          </div>
          <div>
            <strong>{t('Areas Examined')}</strong>
            <p>{team.areas_examined}</p>
          </div>
        </div>
      </div>

      <div className="team-footer">
        <span>
          {t('Last updated')}: {format(team.updated_at, 'd MMMM', { locale: fr })}
        </span>
        <div className="card-actions">
          <Link to={`/TeamDetails/${team?.id}`}>{t('View Details')}</Link>
          <Link to="/">{t('Contact')}</Link>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
