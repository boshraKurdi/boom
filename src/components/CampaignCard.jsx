import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { MapPin , Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const CampaignCard = ({
 campaign
}) => {
  const nav = useNavigate();
  const { t } = useTranslation();
  return (
    
    <div className="Campaigns_card">
      <img src={campaign?.media && campaign.media[0]?.original_url} alt={name} className="card-img" />
      <div className="card-body">
        <div className="card-header">
          <h3>{campaign?.name}</h3>
          <span className={`status`}>
            {format(campaign?.start_date, "d MMMM", { locale: fr })} to{" "}
            {format(campaign?.end_date, "d MMMM", { locale: fr })}
          </span>
        </div>
        {/* <p className="date"><i className="fa fa-calendar" /> {start_date}</p> */}
        <p className="location">
          <i className="fa fa-map-marker" />
          <MapPin/> {t('Location')}: {campaign?.location?.name}
        </p>
        <p className="description">{campaign?.description}</p>
        <p className="team">
          <strong><Users/>{t('Task Force')}:</strong> {campaign?.team?.name}
        </p>
        <button
          onClick={() => {
            nav("/CampaignDetails/"+campaign?.id);
          }}
          className="btn"
        >
          {t('View Details')}
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;
