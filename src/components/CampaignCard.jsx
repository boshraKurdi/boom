import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { MapPin , Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const CampaignCard = ({
  image,
  name,
  start_date,
  end_date,
  location,
  description,
  team,
  id
}) => {
  const nav = useNavigate();
  const { t } = useTranslation();
  return (
    
    <div className="Campaigns_card">
      <img src={image} alt={name} className="card-img" />
      <div className="card-body">
        <div className="card-header">
          <h3>{name}</h3>
          <span className={`status`}>
            {format(start_date, "d MMMM", { locale: fr })} to{" "}
            {format(end_date, "d MMMM", { locale: fr })}
          </span>
        </div>
        {/* <p className="date"><i className="fa fa-calendar" /> {start_date}</p> */}
        <p className="location">
          <i className="fa fa-map-marker" />
          <MapPin/> {t('Location')}: {location?.name}
        </p>
        <p className="description">{description}</p>
        <p className="team">
          <strong><Users/>{t('Task Force')}:</strong> {team?.name}
        </p>
        <button
          onClick={() => {
            nav("/CampaignDetails/"+id);
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
