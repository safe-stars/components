import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { PopupProvider } from "./widgets";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PopupProvider>
      <App />
    </PopupProvider>
  </React.StrictMode>,
);
