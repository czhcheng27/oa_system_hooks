import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "./pages/admin";
import ApprovalDetails from "./pages/aprDet/aprDetOne";
import Category from "./pages/category";
import Revision from "./pages/comps/revision";
import DragHorMul from "./pages/drag/dragHorMul";
import SingleColumn from "./pages/drag/SingleColumn";
import LineCharts from "./pages/echarts/lineCharts";
import ProjectIndicator from "./pages/echarts/projectIndicator";
import Home from "./pages/home";
import Login from "./pages/login";
import Product from "./pages/product";
import Role from "./pages/role";
import StageDash from "./pages/stage/stageOne";
import User from "./pages/user";
import TodoList from "./pages/stage/todoList";
import BigScreen1 from "./pages/bigScreen/bigScreen1";
import DNDdragDrop from "./pages/drag/DNDdragDrop";
import LazyImg from "./pages/echarts/lazyImg";

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
          <Route path="/DND_dragDrop" element={<DNDdragDrop />} />
          <Route path="/project_indicator" element={<ProjectIndicator />} />
          <Route path="/lazy_img" element={<LazyImg />} />
          <Route path="/comps_library_sortablejs" element={<Revision />} />
          <Route path="/line_charts" element={<LineCharts />} />
          <Route path="/apr_det_one" element={<ApprovalDetails />} />
          <Route path="/stage_display" element={<StageDash />} />
          <Route path="/todo_list" element={<TodoList />} />
          <Route path="/big_screen_1" element={<BigScreen1 />} />
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
