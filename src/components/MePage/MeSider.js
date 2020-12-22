import React from "react";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Anchor, Avatar, Divider } from "antd";
const { Sider } = Layout;
const { Link } = Anchor;

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

export default function MeSider() {
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
}
