import React, { useEffect } from 'react';
import TeacherRoutes from '../../routes/TeacherRoutes';
import styled from 'styled-components';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserOutlined, ReadOutlined } from '@ant-design/icons';
import { selectUser } from '../../redux/reducers/userReducer';
import { useSelector, useDispatch } from 'react-redux';

const { Sider } = Layout;
const FixedSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
`;
const StyledMenu = styled(Menu)`
  height: 100%;
`;
const StyledMenuItem = styled(Menu.Item)`
  font-size: 20px;
`;
const AvatarWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledImg = styled.img`
  height: 130px;
  border-radius: 50%;
`

export default function TeacherPage() {
  const location = useLocation();
  const history = useHistory();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (location.pathname === '/teacher') {
      history.push('/teacher/info');
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
          <AvatarWrapper>
            <StyledImg alt='avatar' src={user.Teacher.avatarUrl} />
          </AvatarWrapper>
          <StyledMenuItem
            key="1"
            icon={<UserOutlined style={{ fontSize: 20 }} />}
          >
            <Link to="/teacher/info">老師資料</Link>
          </StyledMenuItem>
          <StyledMenuItem
            key="2"
            icon={<ReadOutlined style={{ fontSize: 20 }} />}
          >
            <Link to="/teacher/courses">課程管理</Link>
          </StyledMenuItem>
        </StyledMenu>
      </FixedSider>
      <Layout style={{ marginLeft: '200px' }}>
        <TeacherRoutes />
      </Layout>
    </Layout>
  );
}
