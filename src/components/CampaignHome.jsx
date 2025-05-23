import CampaignCard from "./CampaignCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ActIndex } from "../store/Compaigns/CompaignsSlice";
import PageLoading from "./PageLoading";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function CampaignHome() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ActIndex());
  }, [dispatch]);
  const { data, loading } = useSelector((state) => state.compaigns_app);
  const campaigns = data?.slice(-3);

  return (
    <motion.div
      className="campaigns-container"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="big_title">
        <h2 className="title">{t("Danger Map")}</h2>
        <p className="subtitle">
          {t(
            "Explore areas with reported landmines and assess risk levels in different regions"
          )}
        </p>
      </div>
      <div className="campaigns-grid">
        {loading != "pending" ? (
          campaigns?.map((campaign, id) => (
            <CampaignCard key={id} {...campaign} />
          ))
        ) : (
          <PageLoading />
        )}
      </div>
    </motion.div>
  );
}
