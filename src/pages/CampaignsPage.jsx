import React, { useEffect, useState } from "react";
import CampaignCard from "../components/CampaignCard";
import { useDispatch, useSelector } from "react-redux";
import { ActIndex } from "../store/Compaigns/CompaignsSlice";
import { ActIndex as ActIndexLocations } from "../store/Locaions/LocationsSlice";
import PageLoading from "../components/PageLoading";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import JoinOurTeamsBanner from "../components/JoinOurTeamsBanner";
import { useNavigate } from "react-router-dom";

const CampaignsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    dispatch(ActIndex());
    dispatch(ActIndexLocations());
  }, [dispatch]);

  const { data, loading } = useSelector((state) => state.compaigns_app);
  const { data: locationsData } = useSelector((state) => state.locations_app);
  const campaigns = data;

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  // const [filterStatus, setFilterStatus] = useState(""); // "active" | "preparing" | "planning" | ""

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesName = campaign.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesDate = filterDate ? campaign.start_date === filterDate : true;

    const matchesRegion = filterRegion
      ? campaign?.location?.name?.includes(filterRegion)
      : true;

    // const matchesStatus = filterStatus
    //   ? campaign.status === filterStatus
    //   : true;

    return matchesName && matchesDate && matchesRegion;
  });
  const visibleCampaigns = filteredCampaigns.slice(0, visibleCount);
  return (
    <div className="campaigns-container padding_page">
      <div className="big_title">
        <h2>{t("Awareness Campaigns")}</h2>
        <p>
          {t(
            "Find and participate in upcoming mine awareness campaigns in your area."
          )}
        </p>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder={`${t("Search campaigns...")}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <select
          value={filterRegion}
          onChange={(e) => setFilterRegion(e.target.value)}
        >
          <option value="">{t("Filter by region")}</option>
          {locationsData.map((data) => {
            return <option value={`${data.name}`}>{data.name}</option>;
          })}
        </select>
      </div>

      {/* <div className="btn-filters">
        <button className={filterStatus === "" ? "all check" : "all"} onClick={() => setFilterStatus("")}>
          All
        </button>
        <button className={filterStatus === "active" ? "active check" : "active"} onClick={() => setFilterStatus("active")}>
          Active
        </button>
        <button
          className={filterStatus === "preparing" ? "preparing check" : "preparing"}
          onClick={() => setFilterStatus("preparing")}
        >
          Preparing
        </button>
        <button
          className={filterStatus === "planning" ? "planning check" :"planning"}
          onClick={() => setFilterStatus("planning")}
        >
          Planning
        </button>
      </div> */}
      <>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="campaigns-grid">
            {loading !== "pending" ? (
              visibleCampaigns.length > 0 ? (
                <>
                  {visibleCampaigns.map((campaign, id) => (
                    <CampaignCard key={id} campaign={campaign} />
                  ))}
                </>
              ) : (
                <p>{t("No campaigns match the selected filters.")}</p>
              )
            ) : (
              <PageLoading />
            )}
          </div>
        </motion.div>
        {loading !== "pending" && visibleCount < filteredCampaigns.length && (
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
      {loading !== "pending" && (
        <JoinOurTeamsBanner
          title={t("Support Our Mission")}
          des={
            t("Your contributions make a significant difference in our ability to detect and clear mines, protecting vulnerable communities and saving lives")
          }
          handelNav={() => {
            nav("/donate");
          }}
        />
      )}
    </div>
  );
};

export default CampaignsPage;
