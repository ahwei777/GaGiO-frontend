import React, { useEffect } from 'react';
import MeRoutes from '../../routes/MeRoutes';
import styled from 'styled-components';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserOutlined, FileDoneOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const FixedSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
`;
const StyledMenu = styled(Menu)`
  height: 100%;
  border-right: 0;
`;
const StyledMenuItem = styled(Menu.Item)`
  font-size: 20px;
`;
const IconWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UseIcon = styled(UserOutlined)`
  font-size: 80px;
  border-radius: 50%;
  padding: 16px;
  border: 1px dotted black;
`;

export default function MePage() {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    // 進入後台預設導向課程列表
    if (location.pathname === '/me') {
      history.push('/me/info');
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
          <IconWrapper>
            <UseIcon />
          </IconWrapper>
          <StyledMenuItem
            key="1"
            icon={<UserOutlined style={{ fontSize: 20 }} />}
          >
            <Link to="/me/info">個人資料</Link>
          </StyledMenuItem>
          <StyledMenuItem
            key="2"
            icon={<FileDoneOutlined style={{ fontSize: 20 }} />}
          >
            <Link to="/me/orders">訂單紀錄</Link>
          </StyledMenuItem>
        </StyledMenu>
      </FixedSider>
      <Layout style={{ marginLeft: '200px' }}>
        <MeRoutes />
      </Layout>
    </Layout>
  );
}
