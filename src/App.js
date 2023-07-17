import "./App.css";
import RotateCore from "./rubik/components/RotateCore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Desk from "./Desk/Desk";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Desk />} />
        <Route path="rubik" element={<RotateCore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function PageNotFound() {
  return <h1>Page not Found</h1>;
}

export default App;
