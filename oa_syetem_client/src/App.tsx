import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/index";
import ApprovalDetails from "./pages/aprDet/aprDetOne";
import Category from "./pages/category/index";
import Revision from "./pages/comps/revision";
import DragHorMul from "./pages/drag/dragHorMul";
import SingleColumn from "./pages/drag/SingleColumn";
import LineCharts from "./pages/simples/lineCharts";
import Home from "./pages/home/index";
import Login from "./pages/login";
import Product from "./pages/product/index";
import Role from "./pages/role/index";
import StageDash from "./pages/stage/stageOne";
import User from "./pages/user";
import TodoList from "./pages/stage/todoList";
import BigScreen1 from "./pages/bigScreen/bigScreen1";
import DNDdragDrop from "./pages/drag/DNDdragDrop";
import LazyImg from "./pages/simples/lazyImg";
import IndicatorTwo from "./pages/simples/indicator2";
import Clipboard from "./pages/simples/clipboard/index";
import CssAdsorb from "./pages/simples/CssAdsorb/index";
import SwitchTheme from "./pages/simples/SwitchTheme/index";
import AnimationDelay from "./pages/simples/AnimationDelay/index";
import CrossTagMsg from "./pages/simples/CrossTagMsg";
import AddCount from "./pages/simples/CrossTagMsg/addCount";
import SvgAnm from "./pages/simples/SvgAnm";
import ElectronicSignature from "./pages/simples/ElectronicSignature/index";
import AttributeDrag from "./pages/drag/AttributeDrag";
import AdvanceFilter from "./pages/simples/AdvanceFilter/index";
import LowCode from "./pages/lowCode";
import EchartsComp from "./pages/simples/Echarts";
// import ReactSortableComp from "./pages/drag/ReactSortable";

const App = () => {
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
          {/* <Route path="/low_code" element={<LowCode />} /> */}
          <Route path="/drag_horizontal_multiple" element={<DragHorMul />} />
          <Route path="/single_vertical_column" element={<SingleColumn />} />
          <Route path="/DND_dragDrop" element={<DNDdragDrop />} />
          <Route path="/attribute_dragDrop" element={<AttributeDrag />} />
          {/* <Route path="/react_sortable" element={<ReactSortableComp />} /> */}
          <Route path="/echarts_simples" element={<EchartsComp />} />
          <Route path="/advance_filter" element={<AdvanceFilter />} />
          <Route path="/question_indicator" element={<IndicatorTwo />} />
          <Route path="/lazy_img" element={<LazyImg />} />
          <Route path="/clipboard" element={<Clipboard />} />
          <Route path="/css_adsorb" element={<CssAdsorb />} />
          <Route path="/switch_theme" element={<SwitchTheme />} />
          <Route path="/animation_delay" element={<AnimationDelay />} />
          <Route path="/cross_tag_msg" element={<CrossTagMsg />} />
          <Route path="/cross_tag_msg_addCount" element={<AddCount />} />
          <Route
            path="/electronic_signature"
            element={<ElectronicSignature />}
          />
          <Route path="/svg_animation" element={<SvgAnm />} />
          {/* <Route path="/comps_library_sortablejs" element={<Revision />} /> */}
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
