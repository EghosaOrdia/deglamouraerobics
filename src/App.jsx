import "./App.css";
import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import Landing from "./pages/Landing";

function App() {
  return (
    <ReactLenis root>
      <Landing />
    </ReactLenis>
  );
}

export default App;
