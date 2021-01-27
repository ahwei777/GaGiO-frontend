import React from "react";
import { Switch, Route } from "react-router-dom";
import ConsoleCoursesPage from "../pages/ConsoleCoursesPage";
import ConsoleMembersPage from "../pages//ConsoleMembersPage";
import MemberDetailPage from "../pages//MemberDetailPage";

export default function ConsoleRoutes() {
  return (
    <Switch>
      <Route exact path="/console/courses">
        <ConsoleCoursesPage />
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
