import React from "react";
import AboutMe from "./AboutMe";
import AccountSetting from "./AccountSetting";
import OrderHistory from "./OrderHistory";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Anchor, Avatar, Divider } from "antd";
const { Sider, Content } = Layout;
const { Link } = Anchor;

const MeLayout = styled(Layout)`
  max-width: 1000px;
  margin: 20px auto;
  background-color: #ffffff;
`;
const MeSiderWrapper = styled(Sider)`
  align-items: center;
  text-align: center;
  border: 1px solid #f0f0f0;
`;
const UserInfoSide = styled.div`
  margin: 24px 0;
`;
const AvatarDiv = styled.div``;
const UserTitle = styled.div`
  padding-top: 12px;
  font-weight: bold;
  font-size: 18px;
`;
const SideDivider = styled(Divider)`
  margin: 0;
`;

const MeSider = () => {
  return (
    <MeSiderWrapper theme="light" width="20%">
      <UserInfoSide>
        <AvatarDiv>
          <Avatar size={100} icon={<UserOutlined />} />
        </AvatarDiv>
        <UserTitle>ChengWei Huang</UserTitle>
      </UserInfoSide>
      <SideDivider />
      <Anchor>
        <Link href="#aboutMe" title="個人檔案" />
        <Link href="#accountSetting" title="帳號設定" />
        <Link href="#orderHistory" title="訂單記錄" />
      </Anchor>
    </MeSiderWrapper>
  );
};
export default function Me() {
  return (
    <MeLayout>
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
    </MeLayout>
  );
}
