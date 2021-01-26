import React from "react";
import { Switch, Route } from "react-router-dom";
import AccountSetting from "../pages/MePage/AccountSetting/";
import OrderHistory from "../pages/MePage/OrderHistory/";

export default function MeRoutes() {
  return (
    <Switch>
      <Route exact path={`/me`}>
        <div></div>
      </Route>
      <Route path={`/me/info`}>
        <AccountSetting />
      </Route>
      <Route path={`/me/orders`}>
        <OrderHistory />
      </Route>
    </Switch>
  );
}
