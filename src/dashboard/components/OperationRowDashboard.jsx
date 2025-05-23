import React, { useState } from "react";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";

export default function OperationRowDashboard({
  i_0,
  i_1,
  i_2,
  i_3,
  i_4,
  i_5,
  i_6,
  i_7,
  i_8,
  i_image = "",
  setIsModalOpen,
  handleViewDetails,
  handleDelete,
}) {
  const [open, setOpen] = useState(false);

  const statusColor = {
    danger: "status-critical-dashboard",
    High: "status-high-dashboard",
    Medium: "status-medium-dashboard",
    safe: "status-low-dashboard",
     free: "status-low-dashboard",
  };

  return (
    <div className="operation-row-dashboard">
      <span>{i_0}</span>
      {i_image ? <span>
        <img src={`${i_image}`} alt="none" />
      </span> : ""}
      <span>{i_1}</span>
      {i_2 ? <span>{i_2}</span> : ""}
      {i_3 ? <span>{i_3}</span> : ""}
      {i_4 ? <span>{i_4}</span> : ""}
      {i_5 ? <span>{i_5}</span> : ""}
      {i_6 ? (
        <span className={`operation-status-dashboard status-high-dashboard`}>
          {i_6}
        </span>
      ) : (
        ""
      )}
      {i_7 ? (
        <span className={`operation-status-dashboard status-low-dashboard`}>
          {i_7}
        </span>
      ) : (
        ""
      )}
        {i_8 ? (
        <span className={`operation-status-dashboard ${statusColor[i_8]}`}>
          {i_8}
        </span>
      ) : (
        ""
      )}
      <div className="operation-actions-dashboard">
        <MoreVertical
          onClick={() => setOpen(!open)}
          className="action-icon-dashboard"
        />
        {open && (
          <div className="dropdown-dashboard">
            <div
              onClick={() => handleViewDetails()}
              className="dropdown-item-dashboard"
            >
              <Eye size={16} />
              View Details
            </div>
            <div
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="dropdown-item-dashboard"
            >
              <Pencil size={16} />
              Edit
            </div>
            <div
              onClick={() => {
                handleDelete(i_0);
              }}
              className="dropdown-item-dashboard"
            >
              <Trash2 size={16} />
              Delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
