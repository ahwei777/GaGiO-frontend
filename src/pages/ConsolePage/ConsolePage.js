import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/userReducer";
import styled from "styled-components";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import { BookOutlined, ContactsOutlined } from "@ant-design/icons";
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_MOBILE_L,
  MEDIA_QUERY_TABLET,
} from "../../constants/breakpoint";
import ConsoleRoutes from "../../containers/ConsoleRoutes";
import Loading from "../../components/Loading";
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
  const user = useSelector(selectUser);

  return (
    <>
      {/* 沒有登入就導向首頁 */ !user && history.push("/")}
      {
        /* 權限不對就導向首頁 */
        user && user.auth_type !== 3 && history.push("/")
      }

      {user && user.auth_type === 3 && (
        <ConsoleContainer>
          {
            /* 進入後台預設導向課程列表 */
            location.pathname === "/console" && history.push("/console/courses")
          }

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
      )}
    </>
  );
}
