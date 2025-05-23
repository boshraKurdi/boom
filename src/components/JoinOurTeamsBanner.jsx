import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const JoinOurTeamsBanner = ({ title, des, handelNav }) => {
   const { t } = useTranslation();
  return (
    <motion.div
      className="join-banner"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="banner-text">
        <h3>{title}</h3>
        <p>{des}</p>
      </div>
      <motion.button
        onClick={handelNav}
        className="apply-button"
        whileHover={{
          scale: 1.05,
          backgroundColor: "#dc2626", // لون أحمر أغمق
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
       {t("Apply Today")}
      </motion.button>
    </motion.div>
  );
};

export default JoinOurTeamsBanner;
