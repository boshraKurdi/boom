import { useDispatch, useSelector } from "react-redux";
import TeamCard from "./TeamCard";
import { useEffect } from "react";
import { ActIndex } from "../store/Teams/TeamsSlice";
import PageLoading from "./PageLoading";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function TaskHome() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ActIndex());
  }, [dispatch]);
  const { data, loading } = useSelector((state) => state.teams_app);
  const initialTeams = data;

  return (
    <motion.div
      className="campaigns-container"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="big_title">
        <h2 className="title">{t("Task Forces")}</h2>
        <p className="subtitle">
          {t(
            "Explore areas with reported landmines and assess risk levels in different regions"
          )}
        </p>
      </div>
      <div className="campaigns-grid">
        {loading != "pending" ? (
          initialTeams
            .slice(-3)
            .map((task, id) => <TeamCard key={id} team={task} />)
        ) : (
          <PageLoading />
        )}
      </div>
    </motion.div>
  );
}
