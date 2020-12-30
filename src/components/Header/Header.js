import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Badge, Button, Menu as AntMenu, Drawer, Grid } from 'antd';
import { MEDIA_QUERY_TABLET } from '../../constants/breakpoint';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../redux/reducers/userReducer';
import { selectCartList, getCartList } from '../../redux/reducers/cartReducer';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;

const Menu = styled(AntMenu)`
  font-size: 18px;
  background: transparent;
  border: none;
`;

const HeaderContainer = styled.div`
  background: ${(props) => props.theme.colors.primary.main};
  color: ${(props) => props.theme.colors.primary.text};
  padding: 0 20px;
  border-bottom: solid 1px #e8e8e8;
  box-shadow: 0 0 30px #f3f1f1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  z-index: 1;
  top: 0;
`;

const Logo = styled(Link)`
  color: ${(props) => props.theme.colors.primary.text};
  :hover {
    color: ${(props) => props.theme.colors.primary.text};
  }
  font-size: 32px;
  width: 180px;
  text-align: center;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${MEDIA_QUERY_TABLET} {
    flex: 1;
  }
`;

const NavToggleGroup = styled.div`
  display: none;
  ${MEDIA_QUERY_TABLET} {
    display: block;
  }
`;
const NavRightPart = styled.div`
  display: flex;
  align-items: center;
`;

const NavToggler = styled(Button)`
  height: 32px;
  padding: 6px;
  display: inline-block;
  background: none;
  margin-left: 30px;
  ${MEDIA_QUERY_TABLET} {
    display: none;
  }
`;
const NavTogglerBody = styled.div`
  display: block;
  width: 20px;
  height: 2px;
  background: ${(props) => props.theme.colors.primary.light};
  position: relative;
  ::after,
  ::before {
    content: attr(x);
    width: 20px;
    position: absolute;
    top: -6px;
    left: 0;
    height: 2px;
    background: ${(props) => props.theme.colors.primary.light};
  }
  ::after {
    top: auto;
    bottom: -6px;
  }
`;

const CartIcon = styled(ShoppingCartOutlined)`
  color: ${(props) => props.theme.colors.primary.text};
  font-size: 24px;
  :hover {
    color: ${(props) => props.theme.colors.primary.light};
  }
`;

const LeftMenu = () => {
  const { md } = useBreakpoint();
  return (
    <Menu mode={md ? 'horizontal' : 'inline'}>
      <Menu.Item key="searchCourse">
        <Link to="/searchCourse">搜尋課程</Link>
      </Menu.Item>
    </Menu>
  );
};

const RightMenu = ({ user, handleLogout, handleClose }) => {
  const { md } = useBreakpoint();
  return (
    <Menu mode={md ? 'horizontal' : 'inline'} onClick={handleClose}>
      {user && (
        <>
          <Menu.Item key="myCourse">
            <Link to="/myCourse">我的課程</Link>
          </Menu.Item>
          <Menu.Item key="myAccount">
            <Link to="/me">帳號設定</Link>
          </Menu.Item>
          {user.auth_type === 3 && (
            <Menu.Item key="console">
              <Link to="/console">管理後台</Link>
            </Menu.Item>
          )}
          <Menu.Item key="logout" onClick={handleLogout}>
            <Link to="/">登出</Link>
          </Menu.Item>
        </>
      )}
      {!user && (
        <>
          <Menu.Item key="mail">
            <Link to="/register">註冊</Link>
          </Menu.Item>
          <Menu.Item key="app">
            <Link to="/login">登入</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default function Header() {
  const dispatch = useDispatch();
  const cartList = useSelector(selectCartList);
  const user = useSelector(selectUser);

  // component mount 時執行(初始化)
  useEffect(() => {
    if (user) {
      dispatch(getCartList());
    }
    // unmount 時先 clean up 避免下次回來時因為仍有舊資料而短暫顯示
    return () => {};
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };
  console.log('render header');
  // component mount 時執行(初始化)

  const [state, setState] = useState({ visible: false });

  const handleClick = () => {
    setState({
      visible: true,
    });
  };
  const handleClose = () => {
    setState({
      visible: false,
    });
  };

  return (
    <HeaderContainer>
      <Logo to="/courseList">Teach Table</Logo>
      <NavContainer>
        <NavToggleGroup>
          <LeftMenu />
        </NavToggleGroup>
        <NavRightPart>
          <Badge count={cartList.length} size="small" offset={[10]}>
            <Link to="/cartList">
              <CartIcon />
            </Link>
          </Badge>
          <NavToggleGroup>
            <RightMenu
              user={user}
              cartList={cartList}
              handleLogout={handleLogout}
            />
          </NavToggleGroup>
        </NavRightPart>
        <NavToggler onClick={handleClick}>
          <NavTogglerBody />
        </NavToggler>
        <Drawer
          title="Teach Table"
          placement="top"
          closable={false}
          onClose={handleClose}
          visible={state.visible}
        >
          <LeftMenu />
          <RightMenu
            user={user}
            cartList={cartList}
            handleLogout={handleLogout}
            handleClose={handleClose}
          />
        </Drawer>
      </NavContainer>
    </HeaderContainer>
  );
}
