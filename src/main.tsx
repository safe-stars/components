import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { BuyDrawerProvider } from "./widgets";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BuyDrawerProvider>
      <App />
    </BuyDrawerProvider>
  </React.StrictMode>,
);
