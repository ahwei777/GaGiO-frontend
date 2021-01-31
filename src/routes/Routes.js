import React from 'react';
import { Switch, Route, Link, useParams } from 'react-router-dom';
//  引入各分頁
import HomePage from '../pages/HomePage';
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
import ClassroomPage from '../pages/ClassroomPage';

import TeacherApplyPage from '../pages/TeacherApplyPage';

import TeacherPage from '../pages/TeacherPage';

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
  console.log('route user', user);
  return (
    <Switch>
      {/* ------------- 任何身分 ------------- */}
      {/* 首頁 */}
      <Route exact path="/">
        <HomePage />
      </Route>
      {/* 註冊 */}
      <Route exact path="/register">
        <RegisterPage />
      </Route>
      {/* 登入 */}
      <Route exact path="/login">
        <LoginPage />
      </Route>
      {/* 課程列表 */}
      <Route exact path="/courses">
        <CourseListPage padding={padding} />
      </Route>
      {/* 單一課程介紹 */}
      <Route exact path="/courses/:id">
        <CourseInfoPage />
      </Route>
      {/* 老師介紹 */}
      <Route exact path="/teacher-info/:id">
        <TeacherInfoPage padding={padding} />
      </Route>

      {/* ------------- 一般會員 ------------- */}
      {/* 購物車 */}
      <Route exact path="/cart">
        {user ? <CartListPage padding={padding} /> : <NoLoggingMessage />}
      </Route>
      {/* 結帳 */}
      <Route exact path="/checkout/:id?">
        {user ? <CheckoutPage padding={padding} /> : <NoLoggingMessage />}
      </Route>
      {/* 我的課程 */}
      <Route exact path="/my-course">
        {user ? <MyCoursePage padding={padding} /> : <NoLoggingMessage />}
      </Route>
      {/* 上課頁面  底下還有子路由時不可設 exact */}
      <Route path="/classroom/:id/">
        {user ? <ClassroomPage /> : <NoLoggingMessage />}
      </Route>
      {/* 我的帳號 底下還有子路由時不可設 exact */}
      <Route path="/me">{user ? <MePage /> : <NoLoggingMessage />}</Route>

      {/* 註冊老師 */}
      <Route path="/teacher-apply">
        {user ? (
          user.authTypeId === 1 ? (
            <TeacherApplyPage />
          ) : (
            <UnauthorizedMessage />
          )
        ) : (
          <NoLoggingMessage />
        )}
      </Route>

      {/* ------------- 老師 ------------- */}
      <Route path="/teacher">
        {user && user.authTypeId === 2 ? <TeacherPage /> : <NoLoggingMessage />}
      </Route>

      {/* ------------- 管理員 ------------- */}
      {/* 管理後台 */}
      <Route path="/console">
        {user &&
          (user && user.authTypeId === 3 ? (
            <ConsolePage />
          ) : (
            <UnauthorizedMessage />
          ))}
      </Route>

      {/* 其餘網址一律導至首頁 */}
      <Route path="/">
        <CourseListPage padding={padding} />
      </Route>
    </Switch>
  );
}

export default Routes;
