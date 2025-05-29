import React, { useEffect } from "react";
import { Users, Shield, AlertTriangle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ActShow } from "../store/Teams/TeamsSlice";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

export default function AlphaTeamPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(ActShow(id));
  }, [dispatch, id]);
  const { record } = useSelector((state) => state.teams_app);
  console.log(record);
  return (
    <motion.section
      className="alpha-team-page padding_page"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="team-header">
        <h2>
          <Shield /> {i18next.language == "ar" ? record?.name.ar : record?.name.en}
        </h2>
        <div className="team-info-grid">
          <div>
            <h5>{t("Team Designation")}</h5>
            <p>
              {i18next.language == "ar" ? record?.name.ar : record?.name.en} Unit <strong>#A-342</strong>
            </p>
          </div>
          <div>
            <h5>{t("Clearance Level")}</h5>
            <p>
              <span className="clearance-level">Level {i18next.language == "ar" ? record?.level.ar : record?.level.en}</span>{" "}
              Advanced Technical Operations
            </p>
          </div>
          <div>
            <h5>{t("Current Deployment")}</h5>
            <p>
              <strong>Eastern Border Region</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="certification-alert">
        <AlertTriangle />{" "}
        {t(
          "This team is certified for high-risk operations including active minefield clearing and unexploded ordnance disposal."
        )}
      </div>

      <div className="team-section">
        <h3>
          <Users /> {t("Team Members")}
        </h3>
        <div className="team-grid">
          {record?.users?.map((member, index) => (
            <div className="team-card-team" key={index}>
              <div className="avatar-placeholder"></div>
              <div className="team-card-body">
                <h4>{member.name}</h4>
                <p>{member.gender}</p>
                <div className="skill-row">
                  <span>{t("Technical Skills")}</span>
                  <span className="level">{member.technical_skills}</span>
                </div>
                <div className="skill-row">
                  <span>{t("Field Experience")}</span>
                  <span className="level">{member.field_experiance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="alpha-team-page__campaigns">
        <h3>{t("Campaigns Conducted")}</h3>
        <div className="alpha-team-page__campaigns-grid">
          {record?.compaigns?.length ? (
            record.compaigns.map((c, index) => (
              <div key={index} className="alpha-team-page__campaign-card">
                <h4>{c.name}</h4>
                <p>
                  {t("Start Date")}: {c.start_date}
                </p>
                <p>
                  {t("Location")}: {c?.location?.name || t("Unknown")}
                </p>
              </div>
            ))
          ) : (
            <p>{t("No campaigns recorded for this team.")}</p>
          )}
        </div>
      </div>

      <div className="alpha-team-page__reports">
        <h3>{t("Reports and Assessments")}</h3>
        <div className="alpha-team-page__reports-grid">
          {record?.team_report?.length ? (
            record.team_report.map((report, index) => (
              <div key={index} className="alpha-team-page__report-card">
                <h4>{report.team_id}</h4>
                <p>
                  {t("Date")}:
                    {format(report?.updated_at, "d MMMM", { locale: fr })} to{" "}
                </p>
              </div>
            ))
          ) : (
            <p>{t("No reports submitted by this team.")}</p>
          )}
        </div>
      </div>

      <div className="metrics-section">
        <h3>{t("Team Metrics")}</h3>
        <div className="metrics-grid">
          <div className="metric-card">
            <h4>{t("Operations Completed")}</h4>
            <p>
              {record?.areas_examined}{" "}
              <span className="success">this quarter</span>
            </p>
          </div>
          <div className="metric-card">
            <h4>{t("Area Cleared")} (sq km)</h4>
            <p>
              4.8 <span className="success">+0.6 this quarter</span>
            </p>
          </div>
          <div className="metric-card">
            <h4>{t("Compaigns Num")}</h4>
            <p>
              {record?.compaigns_num}{" "}
              <span className="success"> safety record</span>
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
