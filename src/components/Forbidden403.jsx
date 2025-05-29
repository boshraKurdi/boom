import React from "react";
import Lottie from "lottie-react";
import { ShieldOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const Forbidden403 = () => {
  const navigate = useNavigate();

  return (
    <div className="forbidden-container">
      {/* <div className="animation">
        <Lottie animationData={forbiddenAnimation} loop />
      </div> */}
      <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
        >
      <div className="text-content">
        <ShieldOff size={48} color="#b91c1c" />
        <h1>403 - Access Forbidden</h1>
        <p>
          You’ve entered a restricted area. This section is off-limits for
          unauthorized personnel — just like a minefield.
        </p>
        <button onClick={() => navigate("/")} className="back-button">
          Return to Safety (Home)
        </button>
      </div>
           </motion.div>
    </div>
  );
};

export default Forbidden403;
