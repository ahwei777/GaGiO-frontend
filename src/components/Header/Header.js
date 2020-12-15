import React from 'react';
import styled from 'styled-components';
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Spinner,
} from 'react-bootstrap';

const PrimaryNavbar = styled(Navbar)`
  background: ${(props) => props.theme.colors.primary.main};
  color: ${(props) => props.theme.colors.primary.text};
`;
const SecondaryButton = styled(Button)`
  background: ${(props) => props.theme.colors.secondary.main};
  color: ${(props) => props.theme.colors.secondary.text};
  border: ${(props) => props.theme.colors.secondary.main};
  :hover {
    background: ${(props) => props.theme.colors.secondary.dark};
    color: ${(props) => props.theme.colors.secondary.text};
  }
`;

export default function Header() {
  return (
    <>
      <PrimaryNavbar collapseOnSelect expand="lg" sticky="top">
        <Navbar.Brand href="courseList">Teach Table</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="courseList">課程列表</Nav.Link>
            <Form inline>
              <FormControl
                type="text"
                placeholder="找課程嗎?"
                className="mr-sm-2"
              />
              <SecondaryButton>搜尋</SecondaryButton>
            </Form>
          </Nav>
          <Nav>
            <Nav.Link href="cart">購物車</Nav.Link>
            <Nav.Link href="myCourse">#我的課程</Nav.Link>
            <NavDropdown title="#我的帳號" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#">帳號設定</NavDropdown.Item>
              <NavDropdown.Item href="#">個人檔案</NavDropdown.Item>
              <NavDropdown.Item href="#">訂單紀錄</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">登出</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="#管理後台" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#">課程管理</NavDropdown.Item>
              <NavDropdown.Item href="#">會員管理</NavDropdown.Item>
              <NavDropdown.Item href="#">Q&A管理</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">登出</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">註冊</Nav.Link>
            <Nav.Link href="#">登入</Nav.Link>
            <Spinner animation="border" variant="info" />
          </Nav>
        </Navbar.Collapse>
      </PrimaryNavbar>
    </>
  );
}
