import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { AppKitProvider } from "./utils/AppKitProvider";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppKitProvider>
      <TonConnectUIProvider
        manifestUrl='./tonconnect-manifest.json'
        actionsConfiguration={{ returnStrategy: "back" }}
      >
        <App />
      </TonConnectUIProvider>
    </AppKitProvider>
  </React.StrictMode>,
);
