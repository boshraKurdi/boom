import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ActStore } from "../store/Reports/ReportsSlice";
import ButtonLoading from "../components/ButtonLoading";

// مكون لاختيار النقطة من الخريطة
const LocationSelector = ({ setCoordinates }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setCoordinates({ lat, lng });
    },
  });
  return null;
};

const ReportMinePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [coordinates, setCoordinates] = useState({ lat: 36.19924, lng: 37.1637253 });
  const [searchQuery, setSearchQuery] = useState("");
  const { loading } = useSelector((state) => state.reports_app)

  const onSubmit = (data) => {
    const fullData = {
      ...data,
      lat: coordinates.lat,
      lon: coordinates.lng,
      location_status:"danger" ,
      statue :"processing"
    };
    
    dispatch(ActStore(fullData)).unwrap()
      .then(() => {
        toast.success(`send report successfuly!`);
      })
      .catch(() => {
        toast.error(`send report faild!`);
      });
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
      } else {
        alert("الموقع غير موجود");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <div className="report-page padding_page">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="big_title">
          <h2 className="page-title">{t("Report a Mine Location")}</h2>
          <p className="page-subtitle">
            {t(
              "Help us make communities safer by reporting suspected mine locations. Your report could save lives."
            )}
          </p>
        </div>

        <div className="report-layout">
          <div className="report-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>
                <span className="marker-icon">
                  <AlertTriangle />
                </span>{" "}
                {t("Report A Mine")}
              </h2>

              <label>{t("Location Name")}</label>
              <input
                type="text"
                placeholder="e.g. Northern Hills Village, Junction 27"
                {...register("location_name", { required: true })}
              />
              {errors.location_name && <span>{t("This field is required")}</span>}

              <label>{t("Detailed Description")}</label>
              <textarea
                placeholder="Please describe what you saw and any identifying features of the area.."
                rows="5"
                {...register("description", { required: true })}
              />
              {errors.description && <span>{t("This field is required")}</span>}

              <div className="safety-box">
                <p>
                  <strong>{t("Important Safety Information")}</strong>
                </p>
                <p>
                  {t(
                    "Never approach or touch any suspicious object. Always stay at a safe distance when taking photos. Your safety is paramount."
                  )}
                </p>
              </div>

              {/* Hidden fields to include coordinates */}
              <input
                type="hidden"
                {...register("latitude")}
                value={coordinates.lat}
              />
              <input
                type="hidden"
                {...register("longitude")}
                value={coordinates.lng}
              />

              <button type="submit" className="submit-btn">
                {loading == "pending"  ? <ButtonLoading/> : t("Submit Report")}
              </button>
            </form>
          </div>

          <div className="report-map">
            <h3>{t("Select Location on Map")}</h3>
            <p className="map-note">
              {t("Use the map to precisely select the suspected mine location.")}
            </p>
            <div className="search-map">
              <input
                type="text"
                placeholder={t("Search locations...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="button" onClick={handleSearch}>
                {t("Search")}
              </button>
            </div>
            <div className="map-wrapper">
              <div className="map">
                <MapContainer
                  center={[coordinates.lat, coordinates.lng]}
                  zoom={13}
                  key={`${coordinates.lat}-${coordinates.lng}`} // لإعادة تحميل الخريطة عند تغيير الموقع
                  style={{ height: "100%", width: "100%", zIndex: "1" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <LocationSelector setCoordinates={setCoordinates} />
                  <Marker position={[coordinates.lat, coordinates.lng]}>
                    <Popup>{t("Selected Location")}</Popup>
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
