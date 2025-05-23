import React, { useState } from "react";
import { CheckCircle, Award, Star } from "lucide-react";

const Profile = () => {
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
  const [status, setStatus] = useState("report");
  const toggleStatus = (index) => {
    const newOps = [...operations];
    newOps[index].status =
      newOps[index].status === "Assigned" ? "Optional" : "Assigned";
    setOperations(newOps);
  };
  return (
    <div className="profile-container padding_page">
      <div className="profile-header">
        <div className="profile-info">
          <img src="https://i.pravatar.cc/100" alt="User" className="avatar" />
          <div>
            <h2>
              Alex Johnson <Star className="badge-icon" />
            </h2>
            <p className="email">alex.johnson@example.com</p>
            <div className="badges">
              <span className="badge red">Senior Detector</span>
              <span className="badge orange">Team: Sentinel Group</span>
              <span className="badge gray">Field Technician</span>
            </div>
          </div>
        </div>
        <div className="profile-actions">
          <button className="btn red">Submit New Report</button>
          <button className="btn">Edit Profile</button>
        </div>
      </div>

      <section className="stats-cards">
        <div className="card">
          <h3>24</h3>
          <p>Total Reports</p>
        </div>
        <div className="card">
          <h3>21</h3>
          <p>Verified Reports</p>
        </div>
        <div className="card">
          <h3>1850</h3>
          <p>Points Earned</p>
          <div className="progress">
            <div className="progress-bar" style={{ width: "65%" }}></div>
          </div>
        </div>
      </section>

      <div className="tabs">
        <button
          onClick={() => {
            setStatus("report");
          }}
          className={status == 'report' ? `tab active` : "tab"}
        >
          My Reports
        </button>
        <button
          onClick={() => {
            setStatus("prizes");
          }}
          className={status == 'prizes' ? "active tab" : "tab"}
        >
          Available Prizes
        </button>
        <button
          onClick={() => {
            setStatus("team");
          }}
          className={status == 'team' ?  "active tab" : "tab"}
        >
          My Team
        </button>
      </div>

      {status == "report" ? (
        <div className="reports-list">
          <div className="report-card">
            <div>
              <h4>Suspicious Area</h4>
              <p>Date: 2024-05-10</p>
              <p>Location: Northern Highway, Sector 3</p>
            </div>
            <div className="report-status">
              <span className="points">+150</span>
              <span className="verified">
                <CheckCircle size={16} /> Verified
              </span>
            </div>
          </div>
        </div>
      ) : status == "team" ? (
        <div className="team-container">
          <div className="team-header">
            <h3>
              Team: <span>Sentinel Group</span>
            </h3>
          </div>

          <div className="team-role">
            <h4>Field Technician</h4>
            <p>
              You are responsible for operating detection equipment and
              documenting findings during field operations. You report directly
              to the Team Lead.
            </p>

            <div className="team-metrics">
              <div>
                <strong>Reports submitted:</strong> 24
              </div>
              <div>
                <strong>Field operations:</strong> 13
              </div>
              <div>
                <strong>Areas cleared:</strong> 8
              </div>
            </div>

            <button className="btn leave-btn">Leave Team</button>
          </div>

          <div className="operations-section">
            <h4>Upcoming Operations</h4>
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
        "no tab"
      )}
    </div>
  );
};

export default Profile;
