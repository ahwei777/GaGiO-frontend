import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
//  引入各分頁
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MePage from '../pages/MePage';
import ConsolePage from '../pages/ConsolePage';
import CartListPage from '../pages/CartListPage';
import CheckoutPage from '../pages/CheckoutPage';
import CourseListPage from '../pages/CourseListPage';
import MyCoursePage from '../pages/MyCoursePage';
import CourseInfoPage from '../pages/CourseInfoPage';
import TeacherInfoPage from '../pages/TeacherInfoPage';
import UnitPage from '../pages/UnitPage';

import { useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/userReducer';

const padding = 36;

const NoLoggingMessage = () => (
  <center>
    <br />
    <h1>請先註冊或登入</h1>
    <h1>
      <Link to="/register">註冊</Link>
      <br />
      <Link to="/login">登入</Link>
    </h1>
  </center>
);

const UnauthorizedMessage = () => (
  <center>
    <br />
    <h1>您未授權訪問此頁面</h1>
  </center>
);

function Routes() {
  const user = useSelector(selectUser);
  return (
    <Switch>
      {/* ------------- 任何身分 ------------- */}
      {/* 首頁(課程列表) */}
      <Route exact path="/">
        <CourseListPage padding={padding} />
      </Route>
      {/* 註冊 */}
      <Route exact path="/register">
        <RegisterPage />
      </Route>
      {/* 登入 */}
      <Route path="/login">
        <LoginPage />
      </Route>
      {/* 課程列表 */}
      <Route exact path="/courseList">
        <CourseListPage padding={padding} />
      </Route>
      {/* 單一課程介紹 */}
      <Route exact path="/courseInfo/:id">
        <CourseInfoPage />
      </Route>
      {/* 老師介紹 */}
      <Route exact path="/teacherInfo/:id">
        <TeacherInfoPage padding={padding} />
      </Route>

      {/* ------------- 一般會員 ------------- */}
      {/* 購物車 */}
      <Route exact path="/cartList">
        {user ? <CartListPage padding={padding} /> : <NoLoggingMessage />}
      </Route>
      {/* 結帳 */}
      <Route exact path="/checkout/:id?">
        {user ? <CheckoutPage padding={padding} /> : <NoLoggingMessage />}
      </Route>
      {/* 我的課程 */}
      <Route exact path="/myCourse">
        {user ? <MyCoursePage padding={padding} /> : <NoLoggingMessage />}
      </Route>
      {/* 上課頁面 */}
      <Route path="/learn/:id/">
        <UnitPage />
      </Route>
      {/* 我的帳號 */}
      <Route path="/me">{user ? <MePage /> : <NoLoggingMessage />}</Route>

      {/* ------------- 管理員 ------------- */}
      {/* 管理後台 */}
      <Route path="/console">
        {user  ? <ConsolePage /> : <UnauthorizedMessage />}
      </Route>

      {/* 其餘網址一律導至首頁 */}
      <Route path="/">
        <CourseListPage padding={padding} />
      </Route>
    </Switch>
  );
}

export default Routes;
