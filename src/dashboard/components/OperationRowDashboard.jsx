import React, { useState } from "react";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  i_image = "b",
  setIsModalOpen,
  handleViewDetails,
  handleDelete,
}) {
    const { t } = useTranslation();
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
      {i_image != "b" ? <span>
        <img style={{width:"50px" , height:"50px" , borderRadius:"50%"}} src={`${i_image}`} alt="none" />
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
              {t("View Details")}
            </div>
            <div
              onClick={() => {
                handleViewDetails()
                setIsModalOpen(true);
              }}
              className="dropdown-item-dashboard"
            >
              <Pencil size={16} />
              {t("Edit")}
            </div>
            <div
              onClick={() => {
                handleDelete(i_0);
              }}
              className="dropdown-item-dashboard"
            >
              <Trash2 size={16} />
              {t("Delete")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
