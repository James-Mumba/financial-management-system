import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Signup from "./Page/Signup";
import Signin from "./Page/Signin";
import Dashboard from "./Page/Dashboard";
import Income from "./Page/Income";
import Expenses from "./Page/Expenses";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Experriment from "./Page/Experriment";
function App() {
  return (
    <div className="Main">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Income" element={<Income />} />
          <Route path="/Expenses" element={<Expenses />} />
          <Route path="/Experriment" element={<Experriment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
