// components/EmergencyContact.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
const EmergencyContact = () => {
  const { t } = useTranslation();
  return (
    <motion.section
      className="emergency-section"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
    >
      <h2>{t("Emergency Contact")}</h2>
      <p>
        {t(
          "If you have encountered a landmine or suspicious object, move to a safe distance and contact emergency services immediately."
        )}
      </p>
      <div className="emergency-actions">
        <div className="emergency-box">
          <span className="label">{t("Emergency Hotline")}</span>
          <span className="hotline">+1-800-555-0123</span>
        </div>
        <div className="emergency-box">
          <span className="label">{t("Report Online")}</span>
          <span className="report-now">{t("Report Now")}</span>
        </div>
      </div>
    </motion.section>
  );
};

export default EmergencyContact;
