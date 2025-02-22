import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Configure base URL for assets and API calls
const isDev = import.meta.env.MODE === 'development';
const baseUrl = isDev ? '/' : './';
document.documentElement.style.setProperty('--base-url', baseUrl);

// Mount the app
const root = document.getElementById("root");
if (!root) throw new Error('Root element not found');
createRoot(root).render(<App />);