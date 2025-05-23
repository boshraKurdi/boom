// pages/CampaignDetails.js
import React, { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { ActShow } from "../store/Compaigns/CompaignsSlice";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { useTranslation } from "react-i18next";
const CampaignDetails = () => {
   const { t } = useTranslation();
  const dispatch = useDispatch()
  const { id } = useParams()
  useEffect(()=>{
    dispatch(ActShow(id))
  } , [dispatch , id])
  const { record } = useSelector((state) => state.compaigns_app) 
  return (
     <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{direction:"ltr"}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="campaign-page padding_page"
      >
   
         <div className="big_title">
        <h2 className="page-title">{t('Mine Safety & Education')}</h2>
        <p className="page-subtitle">
          {t('Access educational resources to learn about mine safety, identification techniques, and emergency procedures.')}
        </p>
      </div>
      <div className="left-campaign">
        <div className="alert-box_campaign">
          <strong>🔶 {t('Critical Information')}:</strong> {t('The Eastern Province remains one of the most heavily mined regions, with an estimated 15,000 uncleared devices affecting 42 communities.')}
        </div>

        {/* Objectives */}
        <div className="campaign-objectives">
          <h2>{t('Campaign Objectives')}</h2>
          <p className="p_obj">
            {t('The Eastern Province remains one of the most heavily mined regions, with an estimated 15,000 uncleared devices affecting 42 communities.')}
          </p>
          <div className="objectives-grid">
            {[
              {
                title: "Community Education",
                desc: "Direct training for 50,000+ residents...",
                icon: "🧠",
              },
              {
                title: "School Programs",
                desc: "Age-appropriate safety education for children...",
                icon: "🏫",
              },
              {
                title: "Material Distribution",
                desc: "Production and distribution of 50,000...",
                icon: "📦",
              },
              {
                title: "Reporting Network",
                desc: "Establishment of local reporting systems...",
                icon: "📡",
              },
            ].map((obj, i) => (
              <div className="objective-card" key={i}>
                <span className="icon">
                  <AlertTriangle />
                </span>
                <div>
                  <h4>{obj.title}</h4>
                  <p>{obj.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="campaign-section">
          <h3 className="section-title">{t('Campaign Materials')}</h3>
          <div className="materials-grid">
            <div className="material-card">Educational Poster (Series 1)</div>
            <div className="material-card">Warning Signs (Multilingual)</div>
            <div className="material-card">Children's Activity Book</div>
            <div className="material-card">Community Training Manual</div>
          </div>
        </div>
        <div className="timeline">
          <div className="timeline-step" data-step="1">
            <h5>{t('Phase')} 1: Initial Deployment (March - May)</h5>
            <p>
              Team training and material preparation. First contact with
              community leaders and school administrators.
            </p>
          </div>
          <div className="timeline-step" data-step="2">
            <h5>{t('Phase')} 2: Community Engagement (June - August)</h5>
            <p>
              Intensive village-level workshops and school programs before
              harvest season when risk increases.
            </p>
          </div>
          <div className="timeline-step" data-step="3">
            <h5>{t('Phase')} 3: Expansion & Reinforcement (Sept - Nov)</h5>
            <p>Reaching more villages and setting up long-term activities.</p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="campaign-main">
        <div className="campaign-overview">
          <div className="alert-box_campaign">
            <h3>📊 {t('Campaign Overview')}</h3>
          </div>

          <ul>
            <li>
              <strong>{t('Target Area')}:</strong> {record?.location?.name}
            </li>
            <li>
              <strong>{t('Population Reached')}:</strong> 27,500 individuals
            </li>
            <li>
              <strong>{t('Budget')}:</strong> $245,000 USD
            </li>
            <li>
              <strong>{t('Partners')}:</strong> Ministry of Safety, InternationalAid,
              LocalNGO
            </li>
          </ul>
        </div>
        <div className="progress-box">
          <h4>{t('Campaign Progress')}</h4>
          <div className="progress-item">
            {t('Villages Reached')} <span style={{ float: "right" }}>18 / 42</span>
          </div>
          <div className="progress-bar-wrapper">
            <div className="progress-bar" style={{ width: "42%" }} />
          </div>

          <div className="progress-item">
            {t('Materials Distributed')}{" "}
            <span style={{ float: "right" }}>23,450 / 50,000</span>
          </div>
          <div className="progress-bar-wrapper">
            <div className="progress-bar" style={{ width: "46%" }} />
          </div>

          <div className="progress-item">
            {t('Schools Engaged')} <span style={{ float: "right" }}>52 / 120</span>
          </div>
          <div className="progress-bar-wrapper">
            <div className="progress-bar" style={{ width: "43%" }} />
          </div>

          <div className="progress-item">
            {t('Budget Utilized')}{" "}
            <span style={{ float: "right" }}>$112,300 / $245,000</span>
          </div>
          <div className="progress-bar-wrapper">
            <div className="progress-bar" style={{ width: "45%" }} />
          </div>
        </div>
        <div className="team-box">
          <h4>{t('Campaign Team')}</h4>
          {["Maria Rodriguez", "David Chen", "Sarah Juma", "Omar Hassan"].map(
            (name, i) => (
              <div className="team-member" key={i}>
                <div className="avatar"></div>
                <div>
                  <strong>{name}</strong>
                  <br />
                  <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                    {/* Example role based on index */}
                    {
                      [
                        "Campaign Director",
                        "Field Operations Manager",
                        "Education Specialist",
                        "Community Liaison",
                      ][i]
                    }
                  </span>
                </div>
              </div>
            )
          )}
          <button
            style={{
              marginTop: "1rem",
              background: "#fff",
              border: "1px solid var(--primary-color)",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {t('View All Team Members')}
          </button>
        </div>
      </div>
 </motion.section>
  );
};

export default CampaignDetails;
