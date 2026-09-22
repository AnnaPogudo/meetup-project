import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider} from "@clerk/react"

const PUSHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if(!PUSHABLE_KEY) {
  throw new Error("Missing PUSHABLE_KEY. Make sure to set VITE_CLERK_PUBLISHABLE_KEY in your .env file.");
}

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUSHABLE_KEY} afterSignOutUrl="/login">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>,
);
