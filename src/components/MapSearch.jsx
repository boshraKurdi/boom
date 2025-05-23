import React, { useState, useEffect } from "react";
import { CiSearch, CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { fetchLocationAndZones } from "../services/mapService";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useTranslation } from "react-i18next";
import { ActIndex } from "../store/Locaions/LocationsSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const FlyToLocation = ({ position }) => {
  const map = useMap();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ActIndex());
  }, [dispatch]);
  useEffect(() => {
    if (position) map.flyTo(position, 13);
  }, [position, map]);
  return null;
};

const MapSearch = () => {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchPosition, setSearchPosition] = useState(null);
  const [nearbyZones, setNearbyZones] = useState([]);
  const { data, loading } = useSelector((state) => state.locations_app);
  const handleSearch = async () => {
    const result = await fetchLocationAndZones(searchText);
    if (result?.position) {
      setSearchPosition(result.position);
      setNearbyZones(result.zones);
    } else {
      alert("لم يتم العثور على الموقع");
    }
  };
  return (
    <motion.section
      className="map-search"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="title">{t("Danger Map")}</h2>
      <p className="subtitle">
        {t(
          "Explore areas with reported landmines and assess risk levels in different regions"
        )}
      </p>

      <div className="all_map">
        <div className="search-bar">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search regions..."
          />
          <button onClick={handleSearch}>{t("Search")}</button>
        </div>

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

        <div className="legend">
          <h4>{t("Risk Level")}</h4>
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
              <span className="dot low" /> {t("Low Risk - Historical records")}
            </li>
            <li>
              <span className="dot safe" /> {t("Safe - Cleared area")}
            </li>
          </ul>
        </div>
      </div>

      <button
        style={{ margin: "0" }}
        onClick={() => nav("/Interactive/" + searchText)}
        className="button-primary"
      >
        <CiLocationOn /> {t("view full map")}
      </button>
    </motion.section>
  );
};

export default MapSearch;
