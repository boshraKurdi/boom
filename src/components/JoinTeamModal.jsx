// components/JoinTeamModal.jsx
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ActIndex, ActUpdate } from "../store/Teams/TeamsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ButtonLoading from "./ButtonLoading";

const JoinTeamModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ActIndex());
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(ActUpdate({data , id: data.team_id}))
      .unwrap()
      .then(() => {
        toast.success(`join successfuly!`);
        onClose()
      })
      .catch(() => {
        toast.error(`join faild!`);
      });
  };

  const { data, loading } = useSelector((state) => state.teams_app);
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">
          ×
        </button>
        <h2>{t("Join Sentinel Group")}</h2>
        <p>
          {t(
            "Fill out this application to join the team. Someone will contact you shortly."
          )}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="join-form">
          <div
            style={{ marginBottom: "15px"}}
            className="select-wrapper"
          >
            <select
            style={{width: "100%" }}
              {...register("team_id", {
                required: "team is required",
              })}
              defaultValue=""
            >
              <option value="" disabled>
                {t("Select Team")}
              </option>
              {data?.map((team) => {
                return <option value={`${team?.id}`}>{team?.name}</option>;
              })}
            </select>
            {errors.team_id && (
              <p className="error-msg">{errors.team_id.message}</p>
            )}
          </div>
          <div className="form-row">
            <textarea
             style={{width: "96%" }}
              {...register("field_experiance", {
                required: "field_experiance is required",
              })}
              placeholder="Tell us about your experience..."
              rows="3"
            />
             {errors.field_experiance && (
              <p className="error-msg">{errors.field_experiance.message}</p>
            )}
          </div>
          <div className="form-row">
            <textarea
             style={{width: "96%" }}
              {...register("technical_skills", {
                required: "technical_skills is required",
              })}
              placeholder="Share your technical_skills..."
              rows="3"
            />
             {errors.technical_skills && (
              <p className="error-msg">{errors.technical_skills.message}</p>
            )}
          </div>
          <button type="submit" className="submit-button">
            {loading == "pending" ? <ButtonLoading /> :  t("Submit Application")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinTeamModal;
