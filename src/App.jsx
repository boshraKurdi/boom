import { useTranslation } from "react-i18next";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const direction = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = direction;
    document.body.dir = direction;
  }, [i18n.language]);
  return (
    <>
      {/* <BrowserRouter> */}
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            padding: "16px",
            borderRadius: "8px",
          },
          success: {
            style: {
              background: "#0f5132",
              color: "#d1e7dd",
            },
          },
          error: {
            style: {
              background: "#842029",
              color: "#f8d7da",
            },
          },
        }}
      />
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
