import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_MOBILE_L,
  MEDIA_QUERY_TABLET,
} from "../../constants/breakpoint";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/reducers/userReducer";

const HeaderContainer = styled.div`
  position: sticky;
  z-index: 1;
  top: 0;
`;
const NavBarContainer = styled.div`
  text-align: center;
  background: ${(props) => props.theme.colors.primary.main};
  color: ${(props) => props.theme.colors.primary.text};
  display: flex;
  padding: 5px 20px;
  ${MEDIA_QUERY_MOBILE_M} {
    flex-direction: column;
  }
  ${MEDIA_QUERY_MOBILE_L} {
    flex-direction: row;
  }
`;
const Brand = styled(Link)`
  font-weight: bold;
  margin: 10px auto;
  color: ${(props) => props.theme.colors.primary.text};
  :hover {
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary.light};
  }
  ${MEDIA_QUERY_MOBILE_M} {
    font-size: 24px;
  }
  ${MEDIA_QUERY_MOBILE_L} {
    width: 150px;
    font-size: 24px;
    margin: auto 10px;
  }
  ${MEDIA_QUERY_TABLET} {
    width: 350px;
    font-size: 34px;
  }
`;
const NavbarListContainer = styled.div`
  ${MEDIA_QUERY_MOBILE_M} {
    width: 100%;
    & + & {
      margin-top: 6px;
    }
  }
  ${MEDIA_QUERY_MOBILE_L} {
    margin: auto 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
const NavbarList = styled.div`
  display: flex;
  ${MEDIA_QUERY_MOBILE_M} {
    font-size: 24px;
    flex-direction: column;
    align-items: center;
    & + & {
      margin-top: 6px;
    }
  }
  ${MEDIA_QUERY_MOBILE_L} {
    font-size: 18px;
    flex-direction: row;
    & + & {
      margin-top: 0px;
    }
  }
`;
const Nav = styled(Link)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  color: black;
  text-decoration: none;
  :hover {
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary.light};
  }
  ${MEDIA_QUERY_MOBILE_M} {
    width: 100%;
    & + & {
      margin-top: 6px;
    }
  }
  ${MEDIA_QUERY_MOBILE_L} {
    padding: 5px 10px;
    width: auto;
    & + & {
      margin-top: 0px;
      margin-left: 6px;
    }
  }
`;
const Button = styled.input`
  background-color: ${(props) => props.theme.colors.primary.main};
  border: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  color: black;
  text-decoration: none;
  :hover {
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary.light};
  }
  :active {
    border: 0;
  }

  ${MEDIA_QUERY_MOBILE_M} {
    width: 100%;
    & + & {
      margin-top: 6px;
    }
  }
  ${MEDIA_QUERY_MOBILE_L} {
    padding: 5px 10px;
    width: auto;
    & + & {
      margin-top: 0px;
      margin-left: 6px;
    }
  }
`;

export default function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <HeaderContainer>
      <NavBarContainer>
        <Brand to="/courseList">Teach Table</Brand>
        <NavbarListContainer>
          <NavbarList>
            <Nav to="/">搜尋課程</Nav>
          </NavbarList>
          <NavbarList>
            <Nav to="/cart">購物車</Nav>
            <Nav to="/">我的課程</Nav>
            <Nav to="/me">帳號設定</Nav>
            <Nav to="/console">管理後台</Nav>
            {!user.email && <Nav to="/register">註冊</Nav>}
            {!user.email && <Nav to="/login">登入</Nav>}
            {user.email && (
              <Button type="button" value="登出" onClick={handleLogout} />
            )}
          </NavbarList>
        </NavbarListContainer>
      </NavBarContainer>
    </HeaderContainer>
  );
}
