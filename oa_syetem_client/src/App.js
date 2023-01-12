import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "./pages/admin";
import Category from "./pages/category";
import Revision from "./pages/comps/revision";
import DragHorMul from "./pages/drag/dragHorMul";
import SingleColumn from "./pages/drag/SingleColumn";
import ProjectIndicator from "./pages/echarts/projectIndicator";
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
          <Route path="/drag_horizontal_multiple" element={<DragHorMul />} />
          <Route path="/single_vertical_column" element={<SingleColumn />} />
          <Route path="/project_indicator" element={<ProjectIndicator />} />
          <Route path="/comps_library_sortablejs" element={<Revision />} />
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
