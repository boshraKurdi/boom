import React, { useEffect, useState } from "react";
import Img1 from "../assets/section_2.jfif";
import LearnCard from "../components/LearnCard";
import { AlertTriangle, BookOpen, UserCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { ActIndex } from "../store/Learns/LearnsSlice";
import PageLoading from "../components/PageLoading";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const EducationPage = () => {
  const { t } = useTranslation();
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ActIndex());
  }, [dispatch]);
  const { data, loading } = useSelector((state) => state.learns_app);
  const [visibleCount, setVisibleCount] = useState(6);
  const infoCards = [
    {
      icon: <AlertTriangle size={32} color="#d32f2f" />,
      title: `${t("If You Find a Landmine")}`,
      items: [
        `${t("Stop immediately. Do not move closer.")}`,
        `${t("Stay calm and mark your position if possible.")}`,
        `${t("Do not touch or try to move the object.")}`,
        `${t("Retrace your steps carefully to get to safety.")}`,
        `${t("Call emergency services: +1-800-555-0123")}`,
      ],
      bg: `#fdecea`,
    },
    {
      icon: <BookOpen size={32} color="#ff9800" />,
      title: `${t("Recognizing Landmines")}`,
      items: [
        `${t("Small metal or plastic discs, boxes, or cylinders.")}`,
        `${t("Exposed wires, trip wires, or thin strings.")}`,
        `${t("Unusual mounds or disturbances in the ground.")}`,
        `${t("Areas with unusual patches of different colored soil.")}`,
        `${t("Objects that seem out of place in the environment.")}`,
      ],
      bg: `#fff3e0`,
    },
    {
      icon: <UserCheck size={32} color="#7e57c2" />,
      title: `${t("Traveling Safely")}`,
      items: [
        `${t("Stick to well-traveled roads and paths.")}`,
        `${t("Watch for warning signs and marked areas.")}`,
        `${t("Avoid areas with tall grass or dense vegetation.")}`,
        `${t("Be cautious around abandoned buildings or equipment.")}`,
        `${t("Check our map for known danger zones before traveling.")}`,
      ],
      bg: `#f3e5f5`,
    },
  ];

  const sampleResources = data;
  const filteredResources = sampleResources.filter(
    (resource) =>
      (filterType === "all" || resource.type === filterType) &&
      resource.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const visibleResources = filteredResources.slice(0, visibleCount);

  return (
    <div className="education-page padding_page">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
      <div className="big_title">
        <h2 className="page-title">{t("Mine Safety & Education")}</h2>
        <p className="page-subtitle">
          {t(
            "Access educational resources to learn about mine safety, identification techniques, and emergency procedures."
          )}
        </p>
      </div>
      <h2 className="section-title">{t("Priority Safety Information")}</h2>
      
        <div className="card-grid">
          {infoCards.map((card, idx) => (
            <div
              key={idx}
              className="info-card"
              style={{ backgroundColor: card.bg }}
            >
              <div className="icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <ul>
                {card.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
      <h2 className="section-title">{t("Resource Library")}</h2>
      <input
        type="text"
        className="search-input"
        placeholder={`${t("Search resources...")}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="filter-buttons">
        {[`all`, `video`, `guide`, `article`].map((type) => (
          <button
            key={type}
            className={`filter-btn ${filterType === type ? "active" : ""}`}
            onClick={() => setFilterType(type)}
          >
            {type === `${t("all")}`
              ? "All Resources"
              : type.charAt(0).toUpperCase() + type.slice(1) + "s"}
          </button>
        ))}
      </div>
      <>
        <div className="resources-grid">
          {loading !== "pending" ? (
            <>
              {visibleResources.map((resource) => (
                <LearnCard key={resource.id} resource={resource} />
              ))}
            </>
          ) : (
            <PageLoading />
          )}
        </div>
        {loading !== "pending" &&
          visibleCount < filteredResources.length && ( // يجب استخدام filteredResources هنا
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
    </div>
  );
};

export default EducationPage;
