import "./App.css";
import RotateCore from "./rubik/components/RotateCore";
import { HashRouter, Routes, Route } from "react-router-dom";
import Desk from "./Desk/Desk";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RotateCore />} />
        <Route path="/rubik" element={<RotateCore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </HashRouter>
  );
}

function PageNotFound() {
  return <h1>Page not Found</h1>;
}

export default App;
