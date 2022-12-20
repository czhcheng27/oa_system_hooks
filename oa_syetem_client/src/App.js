import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/admin";
import Category from "./pages/category";
import Home from "./pages/home";
import Login from "./pages/login";
import Product from "./pages/product";
import Role from "./pages/role";
import User from "./pages/user";

const App = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Admin />}>
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product" element={<Product />} />
          <Route path="/role" element={<Role />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
