import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/admin";
import Login from "./pages/login";

const App = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
