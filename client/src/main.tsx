import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Use the base URL from environment variables
const baseUrl = import.meta.env.VITE_BASE_URL || '/';
window.__BASE_URL__ = baseUrl;

createRoot(document.getElementById("root")!).render(<App />);