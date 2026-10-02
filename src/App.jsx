import { useEffect } from "react";
import legacyMarkup from "./legacy-markup.html?raw";
import "./styles.css";

export default function App() {
  useEffect(() => {
    // Mantém a lógica atual funcionando enquanto os recursos migram para componentes React.
    void import("./legacy.js");
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: legacyMarkup }} />;
}
