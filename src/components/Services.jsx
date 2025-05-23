import React from "react";
import { GoLocation } from "react-icons/go";
import { FiBell } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Services = () => {
  const { t } = useTranslation();
  const services = [
    {
      icon: <GoLocation size={32} color="#1E3A8A" />,
      title: `${t("Report Locations")}`,
      description: `${t(
        "If you spot a potential mine or dangerous area, report it immediately through our system."
      )}`,
      link: `${t("Learn how to report")}`,
    },
    {
      icon: <FiBell size={32} color="#047857" />,
      title: `${t("Join Campaigns")}`,
      description: `${t(
        "Participate in local awareness campaigns to educate your community about mine dangers."
      )}`,
      link: `${t("Find campaigns")}`,
    },
    {
      icon: <FiSearch size={32} color="#CA8A04" />,
      title: `${t("Get Educated")}`,
      description: `${t(
        "Learn about mine safety, recognition, and procedures through our educational resources."
      )}`,
      link: `${t("Access resources")}`,
    },
  ];

  return (
    <motion.section
      className="services"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="title">{t("How You Can Help")}</h2>
      <p className="subtitle">
        {t(
          "The safety of our communities depends on all of us working together. Here is how you can contribute to our mission."
        )}
      </p>
      <div className="service-cards">
        {services.map((service, index) => (
          <div key={index} className="card">
            <div className="icon-circle">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <a href="#">{service.link}</a>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Services;
