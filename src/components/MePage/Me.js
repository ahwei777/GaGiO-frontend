import React from "react";
import AboutMe from "./AboutMe";
import AccountSetting from "./AccountSetting";
import OrderHistory from "./OrderHistory";
import MeSider from "./MeSider";
import styled from "styled-components";
import { Layout, Divider } from "antd";
const { Content } = Layout;

const SideDivider = styled(Divider)`
  margin: 0;
`;

export default function Me() {
  return (
    <>
      <MeSider />
      <Content>
        <div id="aboutMe">
          <AboutMe />
        </div>
        <SideDivider />
        <div id="accountSetting">
          <AccountSetting />
        </div>
        <div id="orderHistory">
          <OrderHistory />
        </div>
      </Content>
    </>
  );
}
