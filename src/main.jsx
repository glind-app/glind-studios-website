import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import App from "./App.jsx";

// Register GSAP React plugin globally
gsap.registerPlugin(useGSAP);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
);
