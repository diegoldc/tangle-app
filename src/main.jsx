import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./context/auth.context.jsx";
import { ThemeProvider } from "./context/theme.context.jsx";

createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </AuthWrapper>
);

