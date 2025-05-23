// RegisterForm.js
import React from "react";
import {
  ShieldAlert,
  User,
  Building2,
  Mail,
  Lock,
  Radiation,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ActAuthSignUp } from "../store/Auth/AuthSlice";
import ButtonLoading from "../components/ButtonLoading";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
      const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(ActAuthSignUp(data))
      .unwrap()
      .then(() => {
        nav("/", { replace: true });
        toast.success(`login successfuly!`);
      })
      .catch(() => {
        toast.error(`login faild!`);
      });
  };

  const password = watch("password");

  return (
    <div className="register-container padding_page">
      <div className="alert-box">
        <ShieldAlert size={18} style={{ marginRight: 8 }} />
        {t('Registration for MineSafe requires verification and approval.')}
      </div>

      <div className="register-form">
        <h2>
          {t('Create Secure Account')}{" "}
          <Radiation size={20} style={{ marginLeft: 8, color: "#d32f2f" }} />
        </h2>
        <p className="form-description">
          {t('Register for access to the MineSafe platform for mine awareness and clearance')}
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <div className="form-row">
              <label>
                {t('Name')}
                <User size={16} className="form-icon" />
              </label>
              <input
                type="text"
                placeholder="John Doe"
                {...register("name", { required: "Full Name is required" })}
              />
              {errors.name && (
                <p className="error-msg">{errors.name.message}</p>
              )}
            </div>

            <div className="form-row">
              <label>
                {t('Gender')}
                <User size={16} className="form-icon" />
              </label>
              <div className="select-wrapper">
                <select
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t('Select Gender')}
                  </option>
                  <option value="male">{t('Male')}</option>
                  <option value="female">{t('Female')}</option>
                </select>
              </div>
              {errors.gender && (
                <p className="error-msg">{errors.gender.message}</p>
              )}
            </div>
          </div>
          <div className="form-row">
            <label>
              {t('Email Address')}
              <Mail size={16} className="form-icon" />
            </label>
            <input
              type="email"
              placeholder="you@organization.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="error-msg">{errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <div className="form-row">
              <label>
                {t('Password')}
                <Lock size={16} className="form-icon" />
              </label>
              <input
                type="password"
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="error-msg">{errors.password.message}</p>
              )}
            </div>

            <div className="form-row">
              <label>
                {t('Confirm Password')}
                <Lock size={16} className="form-icon" />
              </label>
              <input
                type="password"
                placeholder="********"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="error-msg">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="terms"
              {...register("terms", {
                required: "You must agree to the terms",
              })}
            />
            <label htmlFor="terms">
              {t('I agree to the')} <a href="#">{t('Terms of Service')}</a> {t('and')}{" "}
              <a href="#">{t('Privacy Policy')}</a>
            </label>
          </div>

          <div className="form-checkbox">
            <input type="checkbox" id="updates" {...register("updates")} />
            <label htmlFor="updates">
              {t('I want to receive updates about mine safety alerts and clearance operations')}
            </label>
          </div>
          {errors.terms && <p className="error-msg">{errors.terms.message}</p>}
          <button
            type="submit"
            className="submit-btn"
            disabled={loading === "pending" ? true : false}
          >
            {loading === "pending" ? (
              <ButtonLoading />
            ) : (
              "  Register for Access"
            )}
          </button>
        </form>

        <p className="login-link">
          {t('Already have an account?')} <Link to={"/Login"}>{t('Login here')}</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
