import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { FlashMessageProvider } from "./FlashMessageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <FlashMessageProvider> */}
        <App />
      {/* </FlashMessageProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
