import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <PayPalScriptProvider deferLoad={true}>
      <App />
    </PayPalScriptProvider>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
