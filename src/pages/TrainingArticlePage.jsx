import React, { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ActShow } from "../store/Learns/LearnsSlice";
import { useTranslation } from "react-i18next";
export default function TrainingArticlePage() {
   const { t } = useTranslation();
   const dispatch = useDispatch()
  const { id } = useParams()
  useEffect(()=>{
    dispatch(ActShow(id))
  } , [dispatch , id])
  const { record } = useSelector((state) => state.learns_app)
  return (
    <section className="training-page padding_page">
      <h2 className="warning-title"><AlertTriangle/> {record?.name}</h2>

      <div className="content-grid">
        <div className="main-content">
          <div className="video-placeholder">
            <div className="video-icon">🎥</div>
          </div>
          <small className="video-duration">{t('Training Video')}: 24:15</small>

          <p className="training-desc">
            {record?.description}
          </p>

          <div className="alert-box">
            <strong>{t('CRITICAL WARNING')}:</strong> {t('Never attempt to handle or disarm mines without proper certification and equipment. This material is for educational purposes only.')}
          </div>

          <h4 className="section-title">📌 {t('Key Learning Objectives')}</h4>
          <ul className="learning-objectives">
            {/* {record?.objective?.map((data)=>{
              return(
                   <li key={data.id}>{data?.name}</li>
              )
            })} */}
         
         
          </ul>

        
        </div>

        <aside className="sidebar">
          <div className="resources-box">
            <h4>📚 {t('Related Resources')}</h4>
            <ul>
              <li><a href="#">Field Manual: Mine Recognition Chart</a></li>
              <li><a href="#">Emergency Response Procedures</a></li>
              <li><a href="#">Terrain Assessment Guidelines</a></li>
              <li><a href="#">Communication Protocols</a></li>
            </ul>
          </div>

         
        </aside>
      </div>
    </section>
  );
}
