import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "./store/index";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="744082164546-ttq667h3pipn4l4fkk1o6oa06u68bvmn.apps.googleusercontent.com">
      <App />
      <Toaster
        toastOptions={{
          position: "top-right",
          style: {
            background: "white",
            color: "black",
          },
        }}
      />
    </GoogleOAuthProvider>
  </Provider>
);

reportWebVitals();
