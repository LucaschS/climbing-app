import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ModalProvider from "./store/ModalProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ModalProvider>
    <App />
  </ModalProvider>
);
