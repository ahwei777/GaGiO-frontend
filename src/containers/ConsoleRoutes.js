import React from "react";
import { Switch, Route } from "react-router-dom";
import ConsoleCoursesPage from "../pages/ConsoleCoursesPage";
import NewCoursePage from "../pages//NewCoursePage";
import ConsoleMembersPage from "../pages//ConsoleMembersPage";
import SpecificCoursePage from "../pages/SpecificCoursePage";
import CourseSettingPage from "../pages/CourseSettingPage";
import MemberDetailPage from "../pages//MemberDetailPage";
import EditUnitPage from "../pages//EditUnitPage";

export default function ConsoleRoutes() {
  return (
    <Switch>
      <Route exact path="/console/courses">
        <ConsoleCoursesPage />
      </Route>
      <Route exact path="/console/courses/new-course">
        <NewCoursePage />
      </Route>
      <Route exact path="/console/courses/:id">
        <SpecificCoursePage />
      </Route>
      <Route exact path="/console/courses/:id/course-setting">
        <CourseSettingPage />
      </Route>
      <Route exact path="/console/courses/:id/unit/:unitId">
        <EditUnitPage />
      </Route>
      <Route exact path="/console/members">
        <ConsoleMembersPage />
      </Route>
      <Route exact path="/console/members/:id">
        <MemberDetailPage />
      </Route>
    </Switch>
  );
}
