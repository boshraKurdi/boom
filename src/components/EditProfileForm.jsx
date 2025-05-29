import React from "react";
import { useForm } from "react-hook-form";
import ButtonLoading from "./ButtonLoading";

const EditProfileForm = ({ defaultValues, onSubmit, onCancel , loading }) => {
  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
      <div className="form-group">
        <label>Name</label>
        <input {...register("name")} />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" {...register("email")} />
      </div>

      <div className="form-group">
        <label>Field Experience</label>
        <input {...register("field_experiance")} />
      </div>

      <div className="form-group">
        <label>image</label>
        <input type="file" {...register("media")} />
      </div>

      <button type="submit" className="btn save-btn">
        {loading == "pending"  ? <ButtonLoading /> : "Save"}
      </button>
      <button type="button" onClick={onCancel} className="btn cancel-btn">
        Cancel
      </button>
    </form>
  );
};

export default EditProfileForm;
