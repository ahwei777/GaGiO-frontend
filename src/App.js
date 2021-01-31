import React, { useEffect } from "react";
import "./App.css";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routes from "./routes/Routes";
import { useDispatch } from "react-redux";
import { getMe } from "./redux/reducers/userReducer";

const { Content } = Layout;
const AntLayout = styled(Layout)`
  min-height: 100vh;
  height: ${(props) => props.$fixedsider && `100vh`};
`;

const consolePage = ["console", "me", "classroom", "teacher/"];
const fixedSiderPage = ["classroom"];

function App() {
  //console.log("render app");
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  //console.log(pathname);
  const checkIsConsolePage = consolePage.some((el) => pathname.includes(el));
  const checkIsFixedSiderPage = fixedSiderPage.some((el) =>
    pathname.includes(el)
  );

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <AntLayout $fixedsider={checkIsFixedSiderPage}>
      {/* optional header */}
      <Header />
      <Content>
        {/* Routes */}
        <Routes />
      </Content>
      {/* optional footer */}
      {!checkIsConsolePage && <Footer />}
    </AntLayout>
  );
}

export default App;
