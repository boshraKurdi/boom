import StatisticsSection from "./StatisticsSection";
import { CiLocationOn } from "react-icons/ci";
import { IoMdPhonePortrait } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <div className="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
      >
        <p className="p_hero">
          <AlertTriangle />
          {t("Landmine Awareness & Reporting Platform")}
        </p>
        <h2>{t("Prodtecting Communities Form Hidden Dangers")}</h2>
        <p>
          {t(
            "Report suspected landmines, track clearance teams, and access life-saving educational resources to keep your community safe."
          )}
        </p>

        <button className="button-primary">
          <CiLocationOn />
          {t("Report Landmine")}
        </button>
        <button className="button-secondary">
          <IoMdPhonePortrait />
          {t("Safety Resources")}
        </button>
      </motion.div>
      <StatisticsSection />
    </div>
  );
};

export default HeroSection;
