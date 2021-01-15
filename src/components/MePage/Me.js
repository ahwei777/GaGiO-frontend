import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountSetting from "./AccountSetting";
import OrderHistory from "./OrderHistory";
import MeSider from "./MeSider";
import { selectUser } from "../../redux/reducers/userReducer";
import { Layout } from "antd";
const { Content } = Layout;

export default function Me() {
  const history = useHistory();
  const user = useSelector(selectUser);

  useEffect(() => {
    // 權限管理
    if (!user || user.auth_type !== 3) {
      history.push('/');
    }
  }, [history, user]);

  return (
    <>
      <MeSider />
      <Content>
        <AccountSetting />
        <OrderHistory />
      </Content>
    </>
  );
}
