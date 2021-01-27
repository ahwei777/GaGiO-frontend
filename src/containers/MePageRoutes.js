import React from "react";
import { Switch, Route } from "react-router-dom";
import UpdateNickname from "../components/UpdateUser/UpdateNickname";
import UpdatePassword from "../components/UpdateUser/UpdatePassword";

export default function MePageRoutes() {
  return (
    <Switch>
      <Route path={`/me/update/nickname/:id`}>
        <UpdateNickname />
      </Route>
      <Route path={`/me/update/password/:id`}>
        <UpdatePassword />
      </Route>
    </Switch>
  );
}
