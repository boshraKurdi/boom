import React, { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ActShow } from "../store/Learns/LearnsSlice";

import { useTranslation } from "react-i18next";
import i18next from "i18next";
export default function TrainingArticlePage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(ActShow(id));
  }, [dispatch, id]);
  const { record } = useSelector((state) => state.learns_app);
  console.log(record?.objective);
  const getYoutubeId = (url) => {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  return (
    <section className="training-page padding_page">
      <h2 className="warning-title">
        <AlertTriangle />{" "}
        {i18next.language == "ar" ? record?.name.ar : record?.name.en}
      </h2>

      <div className="content-grid">
        <div className="main-content">
          {record?.video_url ? (
            <div className="video-container">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${getYoutubeId(
                  record.video_url
                )}`}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="video-placeholder">
              <div className="video-icon">🎥</div>
              <small className="video-duration">
                {t("Training Video")}: 24:15
              </small>
            </div>
          )}

          <small className="video-duration">{t("Training Video")}: 24:15</small>

          <p className="training-desc">
            {i18next.language == "ar"
              ? record?.description.ar
              : record?.description.en}
          </p>

          <div className="alert-box">
            <strong>{t("CRITICAL WARNING")}:</strong>{" "}
            {t(
              "Never attempt to handle or disarm mines without proper certification and equipment. This material is for educational purposes only."
            )}
          </div>

          <h4 className="section-title"> {t("Key Learning Objectives")}</h4>
          <ul className="learning-objectives">
            {record?.objective?.map((data) => {
              return (
                <li key={data.id}>
                  {i18next.language == "ar" ? data.name.ar : data.name.en}
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="sidebar">
          <div className="resources-box">
            <h4>📚 {t("Related Resources")}</h4>
            <ul>
              <li>
                <a href="#">Field Manual: Mine Recognition Chart</a>
              </li>
              <li>
                <a href="#">Emergency Response Procedures</a>
              </li>
              <li>
                <a href="#">Terrain Assessment Guidelines</a>
              </li>
              <li>
                <a href="#">Communication Protocols</a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
