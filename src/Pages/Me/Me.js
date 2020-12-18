import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
const { Sider, Content } = Layout;

const MeWrapper = styled(Layout)`
  padding: 0;
  margin: 0;
`;

export default function Me() {
  return (
    <MeWrapper>
      <Sider>sider</Sider>
      <Content>content</Content>
    </MeWrapper>
  );
}
