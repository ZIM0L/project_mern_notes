import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { themePallete } from "./themes/themes.ts";
import { ThemeProvider } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={themePallete}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
