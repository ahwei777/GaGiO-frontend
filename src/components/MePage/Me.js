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
  const user = useSelector(selectUser);
  const history = useHistory();
  useEffect(() => {
    if (!user) return history.push("/");
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
