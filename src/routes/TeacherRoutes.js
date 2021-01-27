import React from "react";
import { Switch, Route } from "react-router-dom";
import MyTeachCoursePage from "../pages/TeacherPage/MyTeachCoursePage";
import NewCourseForm from '../pages/TeacherPage/NewCourseForm'
import TeacherSetting from '../pages/TeacherPage/TeacherSettingForm'
import UpdateCourseForm from '../pages/TeacherPage/UpdateCourseForm'
import EditUnitForm from '../pages/TeacherPage/EditUnitForm'

export default function MeRoutes() {
  return (
    <Switch>
      <Route exact path={`/teacher`}>
        <div></div>
      </Route>
      <Route path={`/teacher/info`}>
        <TeacherSetting/>
      </Route>
      <Route exact path={`/teacher/courses`}>
        <MyTeachCoursePage />
      </Route>
      <Route exact path={`/teacher/courses/new`}>
        <NewCourseForm />
      </Route>
      <Route exact path="/teacher/courses/:id">
        <UpdateCourseForm />
      </Route>
      <Route exact path="/teacher/courses/:id/unit/:unitId">
        <EditUnitForm />
      </Route>
    </Switch>
  );
}
