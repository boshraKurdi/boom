import React from "react";
import { AlertTriangle } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import { useTranslation } from "react-i18next";
const ReportMinePage = () => {
    const { t } = useTranslation();
  return (
    <div className="report-page padding_page">
       <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
      <div className="big_title">
        <h2 className="page-title">{t('Report a Mine Location')}</h2>
        <p className="page-subtitle">
          {t('Help us make communities safer by reporting suspected mine locations. Your report could save lives.')}
        </p>
      </div>

      <div className="report-layout">
        <div className="report-form">
          <form>
            <h2>
              <span className="marker-icon">
                <AlertTriangle />
              </span>{" "}
              {t('Report A Mine')}
            </h2>

            <label>{t('Location Name')}</label>
            <input
              type="text"
              placeholder="e.g. Northern Hills Village, Junction 27"
            />

            <label>{t('Detailed Description')}</label>
            <textarea
              placeholder="Please describe what you saw and any identifying features of the area.."
              rows="5"
            />

            <label>{t('Assign Task Force')}</label>
            <select>
              <option>{t('Select a task force')}</option>
              <option>Team Alpha</option>
              <option>Team Bravo</option>
            </select>

            {/* <label>Upload Photos (Optional)</label>
            <input type="file" multiple /> */}

            <div className="safety-box">
              <p>
                <strong> {t('Important Safety Information')}</strong>
              </p>
              <p>
                {t('Never approach or touch any suspicious object. Always stay at a safe distance when taking photos. Your safety is paramount.')}
              </p>
            </div>

            <button type="submit" className="submit-btn">
              {t('Submit Report')}
            </button>
          </form>
        </div>

        <div className="report-map">
          <h3>{t('Select Location on Map')}</h3>
          <p className="map-note">
            {t('Use the map to precisely select the suspected mine location.')}
          </p>
          <div className="search-map">
            <input type="text" placeholder="Search locations..." />
            <button>{t('Search')}</button>
          </div>
          <div className="map-wrapper">
            <div className="map">
              <MapContainer
                center={[36.19924, 37.1637253]}
                zoom={13}
                style={{ height: "100%", width: "100%", zIndex: "1" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                   <Marker position={[36.19924, 37.1637253]}>
                <Popup>Syria</Popup>
              </Marker>
              </MapContainer>
           
            </div>
          </div>
        </div>
      </div>
      </motion.div>
    </div>
  );
};

export default ReportMinePage;
