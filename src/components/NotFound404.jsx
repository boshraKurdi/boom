// pages/NotFound404.jsx
import React from "react";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound404 = () => {
  return (
    <div className="notfound-page">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
      >
        <div className="notfound-content">
          <AlertTriangle size={64} className="alert-icon" />
          <h1>404 - {`Page Not Found`}</h1>
          <p>
            This area is uncharted or might contain danger. Proceed with caution
            – or better yet, return to a safer zone.
          </p>
          <Link to="/" className="back-home-button">
            Back to Safe Zone
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound404;
