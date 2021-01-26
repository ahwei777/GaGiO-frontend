import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { Badge, Button, Menu as AntMenu, Drawer, Grid, Input } from 'antd';
import { MEDIA_QUERY_TABLET } from '../../constants/breakpoint';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../redux/reducers/userReducer';
import { selectCartList } from '../../redux/reducers/cartReducer';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;
const { Search } = Input;
const Menu = styled(AntMenu)`
  font-size: 18px;
  background: transparent;
  border: none;
`;
const HeaderContainer = styled.div`
  background: white;
  color: ${(props) => props.theme.colors.primary.text};
  padding: 5px 20px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  z-index: 1;
  top: 0;
`;
const Logo = styled(Link)`
  width: 180px;
  text-align: center;
  & > img {
    height: 52px;
  }
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

const LeftMenu = ({ searchValue, setSearchValue, onSearch }) => {
  //const { md } = useBreakpoint();
  return (
    <Search value={searchValue} onChange={(e)=> setSearchValue(e.value)} placeholder="搜尋課程" onSearch={onSearch} style={{ width: 160 }} />
  );
};

const RightMenu = ({ user, handleLogout, handleClose }) => {
  const { md } = useBreakpoint();
  return (
    <Menu mode={md ? 'horizontal' : 'inline'} onClick={handleClose}>
      {user && (
        <>
          {user.authTypeId === 1 && (
            <Menu.Item key="applyTeacher">
              <Link to="/teacher-apply">申請開課</Link>
            </Menu.Item>
          )}
          <Menu.Item key="myCourse">
            <Link to="/my-course">我的課程</Link>
          </Menu.Item>
          <Menu.Item key="myAccount">
            <Link to="/me">帳號設定</Link>
          </Menu.Item>
          {user.authTypeId === 2 && (
            <Menu.Item key="teacher">
              <Link to="/teacher">老師後台</Link>
            </Menu.Item>
          )}
          {user.authTypeId === 3 && (
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
  const history = useHistory();
  const cartList = useSelector(selectCartList);
  const user = useSelector(selectUser);
  const [searchValue, setSearchValue] = useState('')

  const onSearch = (value) => {
    if (value) {
      setSearchValue('')
      history.push(`/courses?keyword=${value}`)
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

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
      <Logo to="/courses">
        <img src="/img/LOGO.png" alt="img not found" />
      </Logo>
      <NavContainer>
        <NavToggleGroup>
          <LeftMenu searchValue={searchValue} onSearch={onSearch} setSearchValue={setSearchValue}/>
        </NavToggleGroup>
        <NavRightPart>
          <Badge count={cartList.length} offset={[10]}>
            <Link to="/cart">
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
          title="GaGiO"
          placement="top"
          closable={false}
          onClose={handleClose}
          visible={state.visible}
        >
          <LeftMenu searchValue={searchValue} onSearch={onSearch} setSearchValue={setSearchValue}/>
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
