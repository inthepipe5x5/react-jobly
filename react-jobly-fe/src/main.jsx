import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { FlashMessageProvider, useFlashMessage } from "./FlashMessageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FlashMessageProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </FlashMessageProvider>
);
