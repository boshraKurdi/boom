// LoginPage.js
import React from "react";
import { ShieldCheck, Lock, Mail, ShieldAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ActAuthLogin } from "../store/Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ButtonLoading from "../components/ButtonLoading";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(ActAuthLogin(data))
      .unwrap()
      .then(() => {
        nav("/", { replace: true });
        toast.success(`login successfuly!`);
      })
      .catch(() => {
        toast.error(`login faild!`);
      });
  };

  return (
    <div className="login-container padding_page">
      <div className="alert-box">
        <ShieldAlert size={18} style={{ marginRight: 8 }} />
        {t("Secure access required. Only authorized personnel may proceed.")}
      </div>

      <div className="login-card">
        <h2 className="login-title">
          {t("Secure Login")} <Lock size={20} style={{ marginLeft: 6 }} />
        </h2>
        <p className="login-subtext">
          {t("Enter your credentials to access the MineSafe system")}
          <ShieldCheck size={18} style={{ marginLeft: 6 }} />
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group-login">
            <label htmlFor="email">
              {t("Email Address")} <Mail size={14} className="icon" />
            </label>
            <input
              type="email"
              id="email"
              placeholder="mine.expert@example.com"
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

          <div className="form-group-login">
            <label htmlFor="password">
              {t("Password")} <Lock size={14} className="icon" />
            </label>
            <div className="password-row">
              <input
                type="password"
                id="password"
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                })}
              />
            </div>
            {errors.password && (
              <p className="error-msg">{errors.password.message}</p>
            )}
            <a href="#" className="forgot-link">
              {t("Forgot password?")}
            </a>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading === "pending" ? true : false}
          >
            {loading === "pending" ? (
              <ButtonLoading />
            ) : (
              "Login to Secure System"
            )}
          </button>
        </form>

        <div className="divider">{t("OR CONTINUE WITH")}</div>

        <div className="login-providers">
          <button className="provider-btn google">Google</button>
          <button className="provider-btn github">GitHub</button>
        </div>

        <p className="register-link">
          {t("Don’t have an account?")}{" "}
          <Link to={"/Register"}>{t("Register Now")}</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
