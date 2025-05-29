import React, { useEffect, useState } from "react";
import { CheckCircle, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import toast from "react-hot-toast";
import { ActIndex, ActDelete, ActUpdate } from "../store/Users/UsersSlice";
import { useTranslation } from "react-i18next";
import EditProfileForm from "../components/EditProfileForm";
import { useNavigate } from "react-router-dom";
import { LogOut, SetAuth } from "../store/Auth/AuthSlice";

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("report");
  const [isEditing, setIsEditing] = useState(false);

  const operationsData = [
    {
      title: "Northern Highway Clearance",
      date: "May 25, 2024",
      description:
        "Continuation of the highway corridor clearance operation. Team meeting at 07:00 at North Base.",
      status: "Assigned",
    },
    {
      title: "Training: New Equipment",
      date: "June 3, 2024",
      description:
        "Training session on the new detection equipment. Central Training Facility, 09:00–16:00.",
      status: "Optional",
    },
  ];
  const [operations, setOperations] = useState(operationsData);

  const toggleStatus = (index) => {
    const newOps = [...operations];
    newOps[index].status =
      newOps[index].status === "Assigned" ? "Optional" : "Assigned";
    setOperations(newOps);
  };

  useEffect(() => {
    dispatch(ActIndex());
  }, [dispatch]);

  const { data, reports, points, loading } = useSelector(
    (state) => state.users_app
  );

  const verifiedReports = reports?.filter(
    (report) => report?.statue === "verified"
  );
  const nav = useNavigate();
  const handleProfileUpdate = (formData) => {
    dispatch(ActUpdate(formData))
      .unwrap()
      .then((data) => {
        toast.success(`edit account successfuly!`);
        dispatch(SetAuth(data));
      })
      .catch(() => {
        toast.error(`edit account faild!`);
      });
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    const promise = dispatch(ActDelete())
       toast.success(`delete account successfuly!`);
        dispatch(LogOut());
        nav("/");
       return () => {
      promise.abort();
    };
  };

  return (
    <div className="profile-container padding_page">
      <div className="profile-header">
        <div className="profile-info">
          <img src="https://i.pravatar.cc/100" alt="User" className="avatar" />
          <div>
            <h2>
              {data?.name} <Star className="badge-icon" />
            </h2>
            <p className="email">{data?.email}</p>
            <div className="badges">
              <span className="badge red">{data?.role}</span>
              <span className="badge orange">
                {t("Team")}: {data?.team?.name}
              </span>
              <span className="badge gray">{data?.field_experiance}</span>
            </div>
          </div>
        </div>
        <div className="profile-actions">
          <button className="btn red" onClick={() => setIsEditing(true)}>
            {t("Edit Profile")}
          </button>
          <button className="btn" onClick={handleDeleteAccount}>
            {t("Delete Account")}
          </button>
        </div>
      </div>

      {isEditing && (
        <EditProfileForm
          defaultValues={{
            name: data?.name,
            email: data?.email,
            field_experiance: data?.field_experiance,
            loading: { loading },
          }}
          onSubmit={handleProfileUpdate}
          onCancel={() => setIsEditing(false)}
        />
      )}

      <section className="stats-cards">
        <div className="card">
          <h3>{reports?.length}</h3>
          <p>{t("Total Reports")}</p>
        </div>
        <div className="card">
          <h3>{verifiedReports?.length}</h3>
          <p>{t("Verified Reports")}</p>
        </div>
        <div className="card">
          <h3>{points}</h3>
          <p>{t("Points Earned")}</p>
          <div className="progress">
            <div className="progress-bar" style={{ width: "65%" }}></div>
          </div>
        </div>
      </section>

      <div className="tabs">
        <button
          onClick={() => setStatus("report")}
          className={status === "report" ? `tab active` : "tab"}
        >
          {t("My Reports")}
        </button>
        <button
          onClick={() => setStatus("prizes")}
          className={status === "prizes" ? "active tab" : "tab"}
        >
          {t("Available Prizes")}
        </button>
        <button
          onClick={() => setStatus("team")}
          className={status === "team" ? "active tab" : "tab"}
        >
          {t("My Team")}
        </button>
      </div>

      {status === "report" ? (
        <div className="reports-list">
          {reports?.map((report, index) => (
            <div className="report-card" key={index}>
              <div>
                <h4>{report?.location_id}</h4>
                <p>
                  {t("Date")}:{" "}
                  {format(report?.updated_at, "d MMMM", { locale: fr })}
                </p>
                <p>Location: Northern Highway, Sector 3</p>
              </div>
              <div className="report-status">
                <span className="points">+150</span>
                <span className="verified">
                  <CheckCircle size={16} /> Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : status === "team" ? (
        data?.team ? (
          <div className="team-container">
            <div className="team-header">
              <h3>
                {t("Team")}: <span>{data?.team?.name}</span>
              </h3>
            </div>

            <div className="team-role">
              <h4>{t("Field Technician")}</h4>
              <p>{data?.technical_skills}</p>

              <div className="team-metrics">
                <div>
                  <strong>{t("compaigns num")}:</strong> {data?.compaigns_num}
                </div>
                <div>
                  <strong>{t("areas examined")}:</strong> {data?.areas_examined}
                </div>
                <div>
                  <strong>{t("level")}:</strong> {data?.level}
                </div>
              </div>

              <button className="btn leave-btn">{t("Leave Team")}</button>
            </div>

            <div className="operations-section">
              <h4>{t("Upcoming Operations")}</h4>
              {operations.map((op, index) => (
                <div className="operation-card" key={index}>
                  <div className="op-content">
                    <h5>{op.title}</h5>
                    <span className="op-date">{op.date}</span>
                    <p>{op.description}</p>
                  </div>
                  <button
                    className={`status-btn ${op.status.toLowerCase()}`}
                    onClick={() => toggleStatus(index)}
                  >
                    {op.status}
                  </button>
                </div>
              ))}
              <button className="btn calendar-btn">View Team Calendar</button>
            </div>
          </div>
        ) : (
          "no team "
        )
      ) : (
        <div className="reports-list">
          {data?.donations?.map((donation, index) => (
            <div className="report-card" key={index}>
              <div>
                <h4>{donation?.tool_id}</h4>
                <p>
                  {t("Date")}:{" "}
                  {format(donation?.updated_at, "d MMMM", { locale: fr })}
                </p>
                <p>Location: Northern Highway, Sector 3</p>
              </div>
              <div className="report-status">
                <span className="points">Cost: {donation?.cost}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
