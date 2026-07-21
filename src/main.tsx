import React from "react";
import ReactDOM from "react-dom/client";
import { MyApp } from "./MyApp";
import "./styles/colorPalette.css";
import "./styles/localFonts.css";
import "./styles/globalStyles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>
);
