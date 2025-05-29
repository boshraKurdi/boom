import React from "react";
import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "i18next"; // مهم للوصول إلى اللغة الحالية

const OperationDetailsModal = ({ isOpen, onClose, operation, title, data }) => {
  const { t } = useTranslation();
  const currentLang = i18n.language;

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
            {t("Operation Details")}
          </h2>
          <button className="modal-close-btn-dashboard" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="operation-details-grid-dashboard">
          {/* عرض العناوين (title) */}
          {title?.map((d, index) => {
            const value = operation?.[d];
            return (
              <div key={`title-${index}`}>
                <label>{d}</label>
                <div>
                  {typeof value === "object" && value !== null
                    ? value[currentLang] || value["en"] || JSON.stringify(value)
                    : value}
                </div>
              </div>
            );
          })}

          {/* عرض باقي البيانات (data) */}
          {data?.map((d, index) => {
            const value = operation?.[d];
            return (
              <div key={`data-${index}`}>
                <label>{d}</label>
                {Array.isArray(value) ? (
                  value.map((item, i) => (
                    <div key={`item-${i}`}>
                      {item?.name
                        ? typeof item.name === "object"
                          ? item.name[currentLang] || item.name["en"]
                          : item.name
                        : item?.id}
                    </div>
                  ))
                ) : (
                  <div>
                    {value?.name
                      ? typeof value.name === "object"
                        ? value.name[currentLang] || value.name["en"]
                        : value.name
                      : value?.id || "N/A"}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="operation-notes-dashboard">
          <label>{t("Additional Notes")}</label>
          <p>{operation?.notes || "No notes available"}</p>
        </div>
      </div>
    </div>
  );
};

export default OperationDetailsModal;
