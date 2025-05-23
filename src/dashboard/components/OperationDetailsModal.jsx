import React from "react";
import { AlertTriangle } from "lucide-react";

const OperationDetailsModal = ({ isOpen, onClose, operation, title, data }) => {
  if (!isOpen || !operation) return null;

  return (
    <div className="modal-overlay-dashboard">
      <div className="modal-container-dashboard">
        <div className="modal-header-dashboard">
          <h2 className="modal-title-icon-dashboard">
            <AlertTriangle
              size={20}
              color="#dc2626"
              style={{ marginRight: "8px" }}
            />
            Operation Details
          </h2>
          <button className="modal-close-btn-dashboard" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="operation-details-grid-dashboard">
          {title?.map((d, index) => {
            return (
              <div key={`title-${index}`}>
                <label>{d}</label>
                <div>{operation?.[d]}</div>
              </div>
            );
          })}

          {data?.map((d, index) => (
            <div key={`data-${index}`}>
              <label>{d}</label>
              {Array.isArray(operation?.[d]) ? (
                operation[d].map((dd, i) => (
                  <div key={`item-${i}`}>{dd?.name ? dd?.name : dd?.id}</div>
                ))
              ) : (
                <div>{operation?.[d]?.name || operation?.[d]?.id || "N/A"}</div>
              )}
            </div>
          ))}
        </div>

        <div className="operation-notes-dashboard">
          <label>Additional Notes</label>
          <p>{operation?.notes || "No notes available"}</p>
        </div>
      </div>
    </div>
  );
};

export default OperationDetailsModal;
