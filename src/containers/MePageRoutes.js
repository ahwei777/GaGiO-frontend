import React from "react";
import { Switch, Route } from "react-router-dom";
import Me from "../components/MePage/Me";
import UpdateNickname from "../components/UpdateUser/UpdateNickname";
import UpdatePassword from "../components/UpdateUser/UpdatePassword";
import UpdateEmail from "../components/UpdateUser/UpdateEmail";

export default function MePageRoutes() {
  return (
    <Switch>
      <Route exact path={`/me`}>
        <Me />
      </Route>
      <Route path={`/me/update/nickname/:id`}>
        <UpdateNickname />
      </Route>
      <Route path={`/me/update/password/:id`}>
        <UpdatePassword />
      </Route>
      <Route path={`/me/update/email/:id`}>
        <UpdateEmail />
      </Route>
    </Switch>
  );
}
