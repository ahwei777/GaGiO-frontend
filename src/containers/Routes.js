import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Me from "../Pages/Me";
//  引入各分頁
import Cart from '../components/Cart'
import CourseList from '../components/CourseList'
import Console from "../components/Console";


function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        {/* 首頁(課程列表) */}
        <CourseList/>
      </Route>
      <Route exact path="/courseList">
        {/* 課程列表 */}
        <CourseList/>
      </Route>
      <Route exact path="/cart">
        {/* 購物車 */}
        <Cart/>
      </Route>
      <Route exact path="/">
        {/* 我的課程 */}
      </Route>
      <Route exact path="/me">
        <Me />
        {/* 我的帳號 */}
      </Route>
      <Route path="/console">
        {/* 管理後台 */}
        <Console />
      </Route>
      <Route exact path="/register">
        <Register />
        {/* 註冊 */}
      </Route>
      <Route path="/login">
        <Login />

        {/* 登入 */}
      </Route>
    </Switch>
  );
}

export default Routes;
