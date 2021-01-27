import React, { useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { BookOutlined, ContactsOutlined } from '@ant-design/icons';
import ConsoleRoutes from '../../routes/ConsoleRoutes';

const { Sider } = Layout;
const FixedSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
`
const StyledMenu = styled(Menu)`
  height: 100%;
  border-right: 0;
`;
const StyledMenuItem = styled(Menu.Item)`
  font-size: 20px;
`;

export default function ConsolePage() {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    // 進入後台預設導向課程列表
    if (location.pathname === '/console') {
      history.push('/console/courses');
    }
  }, [history, location.pathname]);

  return (
    <Layout>
      <FixedSider>
        <StyledMenu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
        >
          <StyledMenuItem key="1" icon={<BookOutlined style={{fontSize: 20}}/>}>
            <Link to="/console/courses">課程列表</Link>
          </StyledMenuItem>
          <StyledMenuItem key="2" icon={<ContactsOutlined style={{fontSize: 20}}/>}>
            <Link to="/console/members">會員列表</Link>
          </StyledMenuItem>
        </StyledMenu>
      </FixedSider>
      <Layout style={{ padding: '0 24px', marginLeft: '200px' }}>
        <ConsoleRoutes />
      </Layout>
    </Layout>
  );
}
