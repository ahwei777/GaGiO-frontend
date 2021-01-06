import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MePage from "../pages/MePage";
import ConsolePage from "../pages/ConsolePage";
//  引入各分頁
import CartListPage from "../pages/CartListPage";
import CheckoutPage from '../pages/CheckoutPage';
import CourseListPage from "../pages/CourseListPage";
import MyCoursePage from '../pages/MyCoursePage';
import CourseInfoPage from "../pages/CourseInfoPage";
import TeacherInfoPage from "../pages/TeacherInfoPage";
import UnitPage from "../pages/UnitPage";

const padding = 32;

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        {/* 首頁(課程列表) */}
        <CourseListPage padding={padding} />
      </Route>
      <Route exact path="/courseList">
        {/* 課程列表 */}
        <CourseListPage padding={padding} />
      </Route>
      <Route exact path="/courseInfo/:id">
        {/* 單一課程介紹 */}
        <CourseInfoPage />
      </Route>
      <Route exact path="/teacherInfo/:id">
        {/* 老師介紹 */}
        <TeacherInfoPage />
      </Route>
      <Route exact path="/cartList">
        {/* 購物車 */}
        <CartListPage padding={padding} />
      </Route>
      <Route exact path="/checkout/:id?">
        {/* 結帳 */}
        <CheckoutPage padding={padding} />
      </Route>
      <Route exact path="/myCourse">
        {/* 我的課程 */}
        <MyCoursePage padding={padding} />
      </Route>
      <Route path="/learn/:id/">
        {/* 上課頁面 */}
        <UnitPage />
      </Route>
      <Route path="/me">
        <MePage />
        {/* 我的帳號 */}
      </Route>
      <Route path="/console">
        {/* 管理後台 */}
        <ConsolePage />
      </Route>
      <Route exact path="/register">
        {/* 註冊 */}
        <RegisterPage />
      </Route>
      <Route path="/login">
        {/* 登入 */}
        <LoginPage />
      </Route>
    </Switch>
  );
}

export default Routes;
