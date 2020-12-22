import React from "react";
import { Switch, Route } from "react-router-dom";
import Me from "../components/MePage/Me";
import UpdateName from "../components/UpdateUser/UpdateName";
import UpdateNickname from "../components/UpdateUser/UpdateNickname";
import UpdatePayment from "../components/UpdateUser/UpdatePayment";
import UpdatePhone from "../components/UpdateUser/UpdatePhone";
import UpdateEmail from "../components/UpdateUser/UpdateEmail";

export default function MePageRoutes() {
  return (
    <Switch>
      <Route exact path={`/me`}>
        <Me />
      </Route>
      <Route path={`/me/update/name`}>
        <UpdateName />
      </Route>
      <Route path={`/me/update/nickname`}>
        <UpdateNickname />
      </Route>
      <Route path={`/me/update/phone-number`}>
        <UpdatePhone />
      </Route>
      <Route path={`/me/update/email`}>
        <UpdateEmail />
      </Route>
      <Route path={`/me/update/payment`}>
        <UpdatePayment />
      </Route>
    </Switch>
  );
}
