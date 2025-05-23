import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useParams } from "react-router-dom";
import { fetchLocationAndZones } from "../services/mapService";
import { useTranslation } from "react-i18next";
import { ActIndex } from "../store/Locaions/LocationsSlice";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const FlyToLocation = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 13);
  }, [position, map]);
  return null;
};

const InteractiveMapPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { search } = useParams();
  const paramsSearch = search || "";
  const [searchText, setSearchText] = useState(paramsSearch);
  const [searchPosition, setSearchPosition] = useState(null);
  const [detils, setDetils] = useState(null);
  const [nearbyZones, setNearbyZones] = useState([]);
  const { data } = useSelector((state) => state.locations_app);

  useEffect(() => {
    dispatch(ActIndex());
  }, [dispatch]);

  const handleSearch = async () => {
    const result = await fetchLocationAndZones(searchText);
    if (result?.position) {
      setSearchPosition(result.position);
      setNearbyZones(result.zones);

      const filteredDetails = data?.find((location) =>
        location?.name?.toLowerCase().includes(searchText.toLowerCase())
      );

      if (filteredDetails) {
        setDetils(filteredDetails);
      } else {
        setDetils(null);
      }
    } else {
      alert("لم يتم العثور على الموقع");
      setDetils(null);
    }
  };

  const handleResetSearch = () => {
    setSearchText("");
    setSearchPosition(null);
    setNearbyZones([]);
    setDetils(null);
  };

  useEffect(() => {
    if (searchText) {
      handleSearch();
    }
  }, []); // run once on load

  return (
    <div className="map-page padding_page">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="big_title">
          <h2 className="page-title">{t("Interactive Mine Map")}</h2>
          <p className="page-subtitle">
            {t(
              "Explore reported mine locations and safe zones. Search for specific areas to check their status."
            )}
          </p>
        </div>

        <div className="map-search-container">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder={`${t("Search locations...")}`}
          />
          <button onClick={handleSearch}>{t("Search")}</button>
          <button onClick={handleResetSearch} style={{ marginLeft: "10px" }}>
            {t("Reset")}
          </button>
        </div>

        <div className="map-layout">
          <div className="map-area">
            <div className="map" style={{ position: "relative" }}>
              <MapContainer
                center={[36.19924, 37.1637253]}
                zoom={13}
                style={{ height: "100%", width: "100%", zIndex: "1" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <FlyToLocation position={searchPosition} />

                {data?.map((location) => (
                  <Marker
                    key={location.id}
                    position={[location.lat, location.lon]}
                    icon={
                      new L.divIcon({
                        className: `custom-marker ${location.status}`,
                        html: `<div class="marker ${location.status}"></div>`,
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                      })
                    }
                  >
                    <Popup>
                      <strong>{location.name}</strong>
                      <br />
                      {t("Risk Level")}: {location.status}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          <div className="sidebar">
            <div className="legend-box">
              <h3>{t("Map Legend")}</h3>
              <ul>
                <li>
                  <span className="dot high" />{" "}
                  {t("High Risk - Confirmed landmines")}
                </li>
                <li>
                  <span className="dot medium" />{" "}
                  {t("Medium Risk - Suspected landmines")}
                </li>
                <li>
                  <span className="dot low" />{" "}
                  {t("Low Risk - Historical records")}
                </li>
                <li>
                  <span className="dot safe" /> {t("Safe - Cleared area")}
                </li>
              </ul>
            </div>

            <div className="reports-box">
              <h3>{t("Recent Reports")}</h3>
              {detils?.reports?.length > 0 ? (
                detils.reports.map((data, i) => (
                  <div className="report-item" key={i}>
                    <p>{data?.description}</p>
                    <div className="Reports_flex">
                      <span className="status available">{data?.statue}</span>
                      <small>
                        {t("Last updated")}:{" "}
                        {format(new Date(data.updated_at), "d MMMM", {
                          locale: fr,
                        })}
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <p>{t("No reports found for this area")}</p>
              )}
            </div>

            <div className="tasks-box">
              <h3>{t("Task Forces Deployed")}</h3>
              <div className="task-item">
                <p>Team Alpha</p>
                <div className="Reports_flex">
                  <span className="status available">Available</span>
                  <small>Southern Region</small>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveMapPage;
