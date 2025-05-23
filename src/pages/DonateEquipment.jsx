import React from "react";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import donateAnimation from "../lottiefiles/alarm.json";
import { ShieldAlert, Handshake, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const DonateEquipment = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Donation Data:", data);
    alert(
      "Your donation has been submitted successfully! Thank you for your contribution."
    );
    reset();
  };

  return (
    <div className="donate-page padding_page">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="big_title">
          <h2 className="title">{t("Donation Department")}</h2>
          <p className="subtitle">
            {t(
              "The donation page shows your impact to the community and features an equipment entry field."
            )}
          </p>
        </div>
        <div className="donate-wrapper">
          <div className="impact-boxes">
            <div className="impact-box">
              <ShieldAlert size={36} color="#b91c1c" />
              <h3>{t("Equipment Donation")}</h3>
              <p>
                {t(
                  "Donate detection equipment, protective gear, or specialized tools used directly in field operations."
                )}
              </p>
            </div>
            <div className="impact-box">
              <Handshake size={36} color="#b91c1c" />
              <h3>{t("Volunteer")}</h3>
              <p>
                {t(
                  "Share your time and skills with us, whether in the field or in support roles."
                )}
              </p>
            </div>
            <div className="impact-box">
              <HelpCircle size={36} color="#b91c1c" />
              <h3>{t("Expertise")}</h3>
              <p>
                {t(
                  "Contribute your expertise in areas such as engineering, medicine, logistics, or education."
                )}
              </p>
            </div>
          </div>
          <div className="d_flex">
            <div className="donate-header-flex">
              <div className="animation-wrapper">
                <Lottie
                  style={{ width: "20rem" }}
                  animationData={donateAnimation}
                  loop={true}
                />
              </div>
              <div className="donate-header">
                <h2>{t("Donate Safety Equipment")}</h2>
                <p>
                  {t(
                    "Your donation could save lives. Contribute equipment that helps protect our field teams and supports the safety of affected communities."
                  )}
                </p>
              </div>
            </div>
            <form className="donate-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name")}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("email")}
                  required
                />
              </div>
              <div className="form-row">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  {...register("phone")}
                  required
                />
                <input
                  type="text"
                  placeholder="Type of Equipment"
                  {...register("equipmentType")}
                  required
                />
              </div>
              <textarea
                placeholder="Describe the equipment you want to donate..."
                rows="4"
                {...register("equipmentDescription")}
                required
              ></textarea>
              <textarea
                placeholder="Describe the condition of the equipment..."
                rows="3"
                {...register("equipmentCondition")}
                required
              ></textarea>
              <button type="submit" className="donate-button">
                {t("Submit Donation")}
              </button>
              <p className="donation-note">
                {t("Every donation makes a difference. Thank you!")}
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DonateEquipment;
