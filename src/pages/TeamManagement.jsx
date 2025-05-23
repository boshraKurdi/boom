import React, { useEffect, useState } from "react";
import TeamCard from "../components/TeamCard";
import RegionCard from "../components/RegionCard";
import LeadershipCard from "../components/LeadershipCard";
import { useDispatch, useSelector } from "react-redux";
import { ActIndex } from "../store/Teams/TeamsSlice";
import { ActIndex as ActIndexLocations } from "../store/Locaions/LocationsSlice";
import PageLoading from "../components/PageLoading";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import JoinOurTeamsBanner from "../components/JoinOurTeamsBanner";
import JoinTeamModal from "../components/JoinTeamModal";

const TeamManagement = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showJoinModal, setShowJoinModal] = useState(false);

  useEffect(() => {
    dispatch(ActIndex());
    dispatch(ActIndexLocations());
  }, [dispatch]);
  const { data, loading } = useSelector((state) => state.teams_app);
  const { data: LocationsData, loading: LocationsLoading } = useSelector(
    (state) => state.locations_app
  );
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("status");
  const [visibleCount, setVisibleCount] = useState(6);
  const initialTeams = data;

  const filteredTeams =
    filter === "all"
      ? initialTeams
      : initialTeams.filter((team) => team.status === filter);

  const visibleTeams = filteredTeams.slice(0, visibleCount);
  const visibleLocations = LocationsData.slice(0, visibleCount);
  // const visibleUsers = filteredCampaigns.slice(0, visibleCount);
  return (
    <div className="team-management padding_page">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="big_title">
          <h2 className="page-title">{t("Team Management")}</h2>
          <p className="page-subtitle">
            {t(
              "Track landmine clearance teams, their current status, and areas of operation."
            )}
          </p>
        </div>

        {/* شريط الفلاتر العلوي */}
        <div className="top-filters">
          <span
            onClick={() => setView("status")}
            className={view === "status" ? "top-filter active" : "top-filter"}
          >
            {t("Team Status")}
          </span>
          <span
            onClick={() => setView("coverage")}
            className={view === "coverage" ? "top-filter active" : "top-filter"}
          >
            {t("Regional Coverage")}
          </span>
          <span
            onClick={() => setView("leadership")}
            className={
              view === "leadership" ? "top-filter active" : "top-filter"
            }
          >
            {t("Leadership")}
          </span>
        </div>

        {/* فلاتر الحالة */}
        {view === "status" && (
          <div className="filter-buttons">
            {["all", "available", "busy", "waiting"].map((status) => (
              <button
                key={status}
                className={
                  filter === status ? `active filter-btn` : `filter-btn`
                }
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        )}

        {/* بطاقات الفرق */}
        <div className="teams-container">
          {view === "status" && (
            <>
              {loading != "pending" ? (
                <>
                  {visibleTeams.map((team) => (
                    <TeamCard
                      key={team.id}
                      team={team}
                      onViewProfile={() => alert(`Viewing ${team.name}`)}
                    />
                  ))}
                  <div style={{ width: "100%" }}>
                    {visibleCount < filteredTeams.length && (
                      <motion.button
                        className="button-primary-load load-more-btn"
                        onClick={() => setVisibleCount((prev) => prev + 6)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {t("Load More")}{" "}
                        <ChevronDown size={18} style={{ marginLeft: "8px" }} />
                      </motion.button>
                    )}
                    <JoinOurTeamsBanner
                      handelNav={() => setShowJoinModal(true)}
                      title={`${t("Join Our Mine Clearance Teams")}`}
                      des={`${t("We're recruiting trained individuals to join our task forces. Training provided.")}`}
                    />
                  </div>
                </>
              ) : (
                <PageLoading />
              )}
            </>
          )}

          {view === "coverage" && (
            <div className="region-cards">
              {LocationsLoading != "pending" ? (
                <>
                  {visibleLocations?.map((data) => {
                    return (
                      <RegionCard
                        region={`${data?.name}`}
                        risk={`${data?.status}`}
                        teams={3}
                        responseTime="15–30 minutes"
                        incidents={`${data?.reports?.length}`}
                        theme={`${data?.status}`}
                      />
                    );
                  })}
                  {visibleCount < LocationsData.length && (
                    <motion.button
                      className="button-primary-load load-more-btn"
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {t("Load More")}{" "}
                      <ChevronDown size={18} style={{ marginLeft: "8px" }} />
                    </motion.button>
                  )}
                </>
              ) : (
                <PageLoading />
              )}
            </div>
          )}

          {view === "leadership" && (
            <>
              <LeadershipCard
                name="Dr. Sarah Chen"
                title="Director of Operations"
                expertise="Explosive Ordnance Disposal, Crisis Management"
                location="Headquarters, Central City"
                contact="+1-800-555-0100"
              />
              <LeadershipCard
                name="Colonel Michael Torres"
                title="Field Operations Manager"
                expertise="Military Engineering, Tactical Operations"
                location="Northern Plains Command Center"
                contact="+1-800-555-0101"
              />
              <LeadershipCard
                name="Dr. Elena Dubois"
                title="Medical Response Coordinator"
                expertise="Emergency Medicine, Trauma Response"
                location="Central Medical Facility"
                contact="+1-800-555-0102"
              />
            </>
          )}
        </div>
        <JoinTeamModal
          isOpen={showJoinModal}
          onClose={() => setShowJoinModal(false)}
        />
      </motion.div>
    </div>
  );
};

export default TeamManagement;
