import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import { persistStoree, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NextUIProvider } from "@nextui-org/react";

// Create a QueryClient instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <GoogleOAuthProvider
        clientId={
          "647477425639-0400rhpf2q89n1c7f33c4p0scclioq96.apps.googleusercontent.com"
        }
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistStoree}></PersistGate>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Provider>
      </GoogleOAuthProvider>
    </NextUIProvider>
  </React.StrictMode>
);
