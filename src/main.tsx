import React from "react";
import ReactDOM from "react-dom/client";
import { MyApp } from "./MyApp";
import "./styles/colorPalette.css";
import "./styles/localFonts.css";
import "./styles/globalStyles.css";

const myGaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (myGaMeasurementId) {
  const myScript = document.createElement("script");
  myScript.async = true;
  myScript.src = `https://www.googletagmanager.com/gtag/js?id=${myGaMeasurementId}`;
  document.head.appendChild(myScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...myArgs: unknown[]) {
    window.dataLayer!.push(myArgs);
  };
  window.gtag("js", new Date());
  window.gtag("config", myGaMeasurementId);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>
);
