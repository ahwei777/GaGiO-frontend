import React from 'react';
import { Switch, Route } from 'react-router-dom';
//  引入各分頁


function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        {/* 首頁(課程列表) */}

      </Route>
      <Route exact path="/">
        {/* 課程列表 */}

      </Route>
      <Route exact path="/">
        {/* 購物車 */}

      </Route>
      <Route exact path="/">
        {/* 我的課程 */}

      </Route>
      <Route exact path="/">
        {/* 我的帳號 */}

      </Route>
      <Route exact path="/">
        {/* 管理後台 */}

      </Route>
      <Route exact path="/">
        {/* 註冊 */}

      </Route>
      <Route path="/">
        {/* 登入 */}

      </Route>
    </Switch>
  );
}

export default Routes;
