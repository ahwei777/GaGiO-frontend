import React from "react";
import { Switch, Route } from "react-router-dom";
import ConsoleCoursesPage from "../pages/ConsoleCoursesPage";
import NewCoursePage from "../pages//NewCoursePage";
import ConsoleMembersPage from "../pages//ConsoleMembersPage";

export default function ConsoleRoutes() {
  return (
    <Switch>
      <Route exact path="/console/courses">
        <ConsoleCoursesPage />
      </Route>
      <Route exact path="/console/courses/new-course">
        <NewCoursePage />
      </Route>
      <Route exact path="/console/members">
        <ConsoleMembersPage />
      </Route>
    </Switch>
  );
}
