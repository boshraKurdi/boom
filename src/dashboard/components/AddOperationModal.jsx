import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const AddOperationModal = ({
  isOpen,
  onClose,
  onSave,
  input,
  select,
  value,
  loading,
  input_date,
  handleUpdate,
  input_value,
  media,
  relationship_select,
  input_lang = [],
  relationship_input = [],
}) => {
  const { t } = useTranslation();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [relationships, setRelationships] = useState({});
  const [selectedRelationships, setSelectedRelationships] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    reset();

    if (value) {
      input?.forEach((field) => setValue(field, value[field] || ""));
      input_value?.forEach(({ label, value: inputVal }) => {
        // إذا كانت القيمة موجودة من record.id أو من value[label]
        const finalVal = value?.[label] ?? inputVal ?? "";
        setValue(label, finalVal);
      });
      input_date?.forEach((field) => {
        const val = value[field];
        if (val) setValue(field, val.slice(0, 10));
      });
      relationship_select?.forEach(({ label }) => {
        const val = value?.[label] || [];
        setSelectedRelationships((prev) => ({
          ...prev,
          [label]: val.map((v) => v.id),
        }));
      });

      input_lang?.forEach((field) => {
        const val = value[field] || {};
        setValue(`${field}_ar`, val.ar || "");
        setValue(`${field}_en`, val.en || "");
      });

      select?.forEach((sel) => setValue(sel.label, value[sel.label] || ""));

      const relInitial = {};
      relationship_input?.forEach(({ label, input_lang, input }) => {
        const relationData = value[label] || [];
        const rows = relationData.map((item) => {
          const formatted = {};
          if (input_lang) {
            input_lang.forEach((f) => {
              formatted[f] = {
                ar: item[f]?.ar || "",
                en: item[f]?.en || "",
              };
            });
          }
          if (input) {
            input.forEach((f) => {
              formatted[f] = item[f] || "";
            });
          }
          return formatted;
        });
        relInitial[label] = rows.length > 0 ? rows : [{}];
      });
      setRelationships(relInitial);
    } else {
      reset();
      setRelationships({});
    }
  }, [isOpen, JSON.stringify(value)]);

  const handleRelationshipChange = (relLabel, index, field, val) => {
    const updated = [...(relationships[relLabel] || [])];
    updated[index] = {
      ...updated[index],
      [field]: val,
    };
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
    const hasMedia = media && data.media?.[0];

    if (hasMedia) {
      const formData = new FormData();

      input?.forEach((field) => formData.append(field, data[field]));
      input_value?.forEach((field) =>
        formData.append(field.label, field.value)
      );
      input_date?.forEach((field) => formData.append(field, data[field]));

      input_lang?.forEach((field) => {
        formData.append(
          field,
          JSON.stringify({
            ar: data[`${field}_ar`] || "",
            en: data[`${field}_en`] || "",
          })
        );
      });
      relationship_select?.forEach(({ label }) => {
        formData.append(
          label,
          JSON.stringify(selectedRelationships[label] || [])
        );
      });

      select?.forEach((sel) => formData.append(sel.label, data[sel.label]));
      formData.append("media", data.media[0]);

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
    } else {
      const plainData = {};

      input?.forEach((field) => (plainData[field] = data[field]));
      input_value?.forEach((field) => (plainData[field.label] = field.value));
      input_date?.forEach((field) => (plainData[field] = data[field]));
      relationship_select?.forEach(({ label }) => {
        plainData[label] = selectedRelationships[label] || [];
      });

      input_lang?.forEach((field) => {
        plainData[field] = JSON.stringify({
          ar: data[`${field}_ar`] || "",
          en: data[`${field}_en`] || "",
        });
      });
      select?.forEach((sel) => (plainData[sel.label] = data[sel.label]));

      relationship_input?.forEach(({ label }) => {
        plainData[label] = relationships[label] || [];
      });

      if (value) {
        plainData["id"] = value.id;
        handleUpdate(value.id, plainData);
      } else {
        onSave(plainData);
      }
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
          {/* نصوص عادية */}
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

          {/* نصوص ثابتة */}
          {input_value?.map((fieldName) => {
            console.log(fieldName.value);
            return (
              <div className="modal-field-dashboard" key={fieldName.label}>
                <label>{fieldName.label}</label>
                <input
                  type="text"
                  value={watch(fieldName.label) || ""}
                  readOnly
                  {...register(fieldName.label)}
                />
              </div>
            );
          })}

          {/* تواريخ */}
          {input_date?.map((fieldName) => (
            <div className="modal-field-dashboard" key={fieldName}>
              <label>{fieldName}</label>
              <input
                type="date"
                {...register(fieldName, {
                  required: `${fieldName} is required`,
                })}
              />
              {errors[fieldName] && (
                <p className="error-msg">{errors[fieldName].message}</p>
              )}
            </div>
          ))}

          {/* نصوص متعددة اللغة */}
          {input_lang?.map((field) => (
            <div className="input_lang" key={field}>
              <div className="modal-field-dashboard">
                <label>{field} (English)</label>
                <input
                  type="text"
                  {...register(`${field}_en`, {
                    required: `${field} English is required`,
                  })}
                />
                {errors[`${field}_en`] && (
                  <p className="error-msg">{errors[`${field}_en`].message}</p>
                )}
              </div>
              <div className="modal-field-dashboard">
                <label>{field} (Arabic)</label>
                <input
                  type="text"
                  {...register(`${field}_ar`, {
                    required: `${field} Arabic is required`,
                  })}
                />
                {errors[`${field}_ar`] && (
                  <p className="error-msg">{errors[`${field}_ar`].message}</p>
                )}
              </div>
            </div>
          ))}

          {/* القوائم */}
          {select?.map((selectItem) => (
            <div className="modal-field-dashboard" key={selectItem.label}>
              <label>{selectItem.label}</label>
              <select
                {...register(selectItem.label, {
                  required: `${selectItem.label} is required`,
                })}
              >
                <option value="">{selectItem.label}</option>
                {selectItem?.data?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name || option.id}
                  </option>
                ))}
              </select>
              {errors[selectItem.label] && (
                <p className="error-msg">{errors[selectItem.label].message}</p>
              )}
            </div>
          ))}

          {/* الوسائط */}
          {media && (
            <div className="modal-field-dashboard">
              <label>{t("Image")}</label>
              <input type="file" {...register("media")} accept="image/*" />
            </div>
          )}

          {/* علاقات */}
          {relationship_input?.map(({ label, input_lang, input }) => (
            <div key={label} className="relationship-section">
              <h4>{label}</h4>
              {(relationships[label] || []).map((row, idx) => (
                <div key={idx} className="relationship-row">
                  {input_lang?.map((f) => (
                    <div key={f} className="input_lang">
                      <div className="modal-field-dashboard">
                        <label>{f} (English)</label>
                        <input
                          type="text"
                          value={row[f]?.en || ""}
                          onChange={(e) =>
                            handleRelationshipChange(label, idx, f, {
                              ...row[f],
                              en: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="modal-field-dashboard">
                        <label>{f} (Arabic)</label>
                        <input
                          type="text"
                          value={row[f]?.ar || ""}
                          onChange={(e) =>
                            handleRelationshipChange(label, idx, f, {
                              ...row[f],
                              ar: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  ))}
                  {input?.map((f) => (
                    <div className="modal-field-dashboard" key={f}>
                      <label>{f}</label>
                      <input
                        type="text"
                        value={row[f] || ""}
                        onChange={(e) =>
                          handleRelationshipChange(
                            label,
                            idx,
                            f,
                            e.target.value
                          )
                        }
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
                + {t("Add")} {label}
              </button>
            </div>
          ))}
          {relationship_select?.map(({ label, data }) => (
            <div key={label} className="modal-field-dashboard">
              <label>{label}</label>

              <div className="checkbox-list">
                {data.map((item) => {
                  const isChecked = (
                    selectedRelationships[label] || []
                  ).includes(item.id);
                  return (
                    <label key={item.id} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          setSelectedRelationships((prev) => {
                            const prevSelected = prev[label] || [];
                            const newSelected = isChecked
                              ? prevSelected.filter((id) => id !== item.id) // إزالة
                              : [...prevSelected, item.id]; // إضافة
                            return { ...prev, [label]: newSelected };
                          });
                        }}
                      />
                      {item.name}
                    </label>
                  );
                })}
              </div>

              {/* عرض الحملات المختارة بتنسيق جميل */}
              <div className="selected-tags">
                {(selectedRelationships[label] || []).map((id) => {
                  const item = data.find((d) => d.id === id);
                  return (
                    <span key={id} className="selected-tag">
                      {item?.name || id}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}

          {/* أزرار */}
          <div className="modal-actions-dashboard">
            <button
              type="button"
              className="modal-cancel-btn-dashboard"
              onClick={() => {
                onClose();
                reset();
              }}
            >
              {t("Cancel")}
            </button>
            <button type="submit" className="modal-save-btn-dashboard">
              {loading !== "pending"
                ? value
                  ? "Update"
                  : "Save"
                : "Saving..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOperationModal;
