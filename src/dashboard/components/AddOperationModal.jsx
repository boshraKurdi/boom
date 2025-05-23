import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ButtonLoading from "../../components/ButtonLoading";

const AddOperationModal = ({
  isOpen,
  onClose,
  onSave,
  input,
  select,
  value,
  loading,
  handleUpdate,
  media,
  relationship_input = [],
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [relationships, setRelationships] = useState({});

  // ⚠️ useEffect بعد التعديل - يعتمد فقط على isOpen
  useEffect(() => {
    if (!isOpen) return;

    if (value) {
      input?.forEach((field) => setValue(field, value[field] || ""));
      select?.forEach((sel) => setValue(sel.label, value[sel.label] || ""));
    } else {
      reset();
    }

    // إعداد العلاقات عند الفتح فقط
    const relInitial = {};
    relationship_input?.forEach(({ label }) => {
      if (value && value[label]) {
        relInitial[label] = value[label];
      } else {
        relInitial[label] = [{}];
      }
    });
    setRelationships(relInitial);
  }, [isOpen]);

  const handleRelationshipChange = (relLabel, index, field, val) => {
    const updated = [...(relationships[relLabel] || [])];
    updated[index] = { ...updated[index], [field]: val };
    setRelationships({ ...relationships, [relLabel]: updated });
  };

  const addRelationshipRow = (relLabel) => {
    const updated = [...(relationships[relLabel] || []), {}];
    setRelationships({ ...relationships, [relLabel]: updated });
  };

  const removeRelationshipRow = (relLabel, index) => {
    const updated = [...(relationships[relLabel] || [])];
    updated.splice(index, 1);
    setRelationships({ ...relationships, [relLabel]: updated });
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    // Add text inputs
    input?.forEach((field) => {
      formData.append(field, data[field]);
    });

    // Add select values
    select?.forEach((sel) => {
      formData.append(sel.label, data[sel.label]);
    });

    // Add media (image)
    if (media && data.media?.[0]) {
      formData.append("media", data.media[0]);
    }

    // Add relationship inputs
    relationship_input?.forEach(({ label }) => {
      const rows = relationships[label] || [];
      formData.append(label, JSON.stringify(rows));
    });

    if (value) {
      formData.append("id", value.id);
      handleUpdate(value.id, formData);
    } else {
      onSave(formData);
    }

    onClose();
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay-dashboard">
      <div className="modal-container-dashboard">
        <div className="modal-header-dashboard">
          <h2>{value ? "Edit Operation" : "Add New Operation"}</h2>
          <button className="modal-close-btn-dashboard" onClick={onClose}>
            ×
          </button>
        </div>

        <p className="modal-subtitle-dashboard">
          {value
            ? "Update the operation details."
            : "Enter the details for the new operation."}
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Text Inputs */}
          {input?.map((fieldName) => (
            <div className="modal-field-dashboard" key={fieldName}>
              <label>{fieldName}</label>
              <input
                type="text"
                placeholder={`Operation ${fieldName}`}
                {...register(fieldName, {
                  required: `${fieldName} is required`,
                })}
              />
              {errors[fieldName] && (
                <p className="error-msg">{errors[fieldName].message}</p>
              )}
            </div>
          ))}

          {/* Select Dropdowns */}
          {select?.map((selectItem) => (
            <div className="modal-field-dashboard" key={selectItem.label}>
              <label>{selectItem.label}</label>
              <select
                {...register(selectItem.label, {
                  required: `${selectItem.label} is required`,
                })}
              >
                <option value="">Select level</option>
                {selectItem?.data.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name || option.id}
                  </option>
                ))}
              </select>
              {errors[selectItem.label] && (
                <p className="error-msg">
                  {errors[selectItem.label].message}
                </p>
              )}
            </div>
          ))}

           {/* Media Upload */}
          {media && (
            <div className="modal-field-dashboard">
              <label>Image</label>
              <input type="file" {...register("media")} accept="image/*" />
            </div>
          )}

          {/* Relationship Inputs */}
          {relationship_input?.map(({ label, input: fields }) => (
            <div key={label} className="relationship-section">
              <h4>{label}</h4>
              {(relationships[label] || []).map((row, idx) => (
                <div key={idx} className="relationship-row">
                  {fields.map((f) => (
                    <div className="modal-field-dashboard" key={f}>
                      <label>{f}</label>
                      <input
                        type="text"
                        value={row[f] || ""}
                        onChange={(e) =>
                          handleRelationshipChange(label, idx, f, e.target.value)
                        }
                        placeholder={`Enter ${f}`}
                      />
                    </div>
                  ))}
                  <button
                  className="error"
                    type="button"
                    onClick={() => removeRelationshipRow(label, idx)}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addRelationshipRow(label)}
                className="modal-add-row-btn-dashboard"
              >
                + Add {label}
              </button>
            </div>
          ))}

         

          <div className="modal-actions-dashboard">
            <button
              type="button"
              className="modal-cancel-btn-dashboard"
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="modal-save-btn-dashboard">
              {loading !== "pending" ? (
                value ? "Update" : "Save"
              ) : (
                <ButtonLoading />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOperationModal;
