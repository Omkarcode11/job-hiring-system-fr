import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Error from "./pages/error/Error";
import User from "./pages/user/User";
import Company from "./pages/company/Company";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/error" element={<Error />} />
          <Route path="/customer" element={<User />} />
          <Route path="/engineer" element={<Company />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
