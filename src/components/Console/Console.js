import React from "react";
import { Switch, Route, Link, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import { BookOutlined, ContactsOutlined } from "@ant-design/icons";
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_MOBILE_L,
  MEDIA_QUERY_TABLET,
} from "../../constants/breakpoint";
import ConsoleCourseList from "../ConsoleCourseList";
import NewCourse from "../NewCourse";
import ConsoleMemberList from "../ConsoleMemberList";
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

const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TableContainer = styled(Content)`
  padding: 24px;
  background-color: ${(props) => props.theme.colors.white};
`;

export default function Console() {
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
            <Link to="/console/member">會員列表</Link>
          </Menu.Item>
        </StyledMenu>
      </Sidebar>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Switch>
          <Route exact path="/console/courses">
            <ConsoleCourseList />
          </Route>
          <Route exact path="/console/courses/new-course">
            <NewCourse />
          </Route>
          <Route exact path="/console/member">
            <ConsoleMemberList />
          </Route>
        </Switch>
      </Layout>
    </ConsoleContainer>
  );
}
