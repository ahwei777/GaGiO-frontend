import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import { BookOutlined, ContactsOutlined } from "@ant-design/icons";
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_MOBILE_L,
  MEDIA_QUERY_TABLET,
} from "../../constants/breakpoint";
import ConsoleRoutes from "../../containers/ConsoleRoutes";
const { Content, Sider } = Layout;

const ConsoleContainer = styled(Layout)`
  min-height: calc(100vh - 64px);
`;

const Sidebar = styled(Sider)`
  width: 200px;
  background-color: ${(props) => props.theme.colors.white};
`;

const StyledMenu = styled(Menu)`
  height: 100%;
  border-right: 0;
`;

export default function ConsolePage() {
  const location = useLocation();
  const history = useHistory();

  return (
    <ConsoleContainer>
      {location.pathname === "/console" && history.push("/console/courses")}
      <Sidebar>
        <StyledMenu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
        >
          <Menu.Item key="1" icon={<BookOutlined />}>
            <Link to="/console/courses">課程列表</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ContactsOutlined />}>
            <Link to="/console/members">會員列表</Link>
          </Menu.Item>
        </StyledMenu>
      </Sidebar>
      <Layout style={{ padding: "0 24px 24px" }}>
        <ConsoleRoutes />
      </Layout>
    </ConsoleContainer>
  );
}
