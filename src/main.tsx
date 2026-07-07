import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HashRouter} from "react-router-dom";
import { CartProvider } from "./context/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  < HashRouter >
    <CartProvider>
      <App />
    </CartProvider>
  </ HashRouter>
);