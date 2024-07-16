import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { FlashMessageProvider } from "./FlashMessageContext";
import { UserContextProvider } from "./UserContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <FlashMessageProvider>
          <App />
        </FlashMessageProvider>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
);
