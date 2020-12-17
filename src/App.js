import "antd/dist/antd.css";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routes from "./containers/Routes";

const { Content } = Layout;
const AntLayout = styled(Layout)`
  min-height: 100vh;
`;

function App() {
  console.log("render app");
  return (
    <Router>
      <AntLayout>
        <Header />
        <Content className="site-layout">
          {/* Routes */}
          <Routes />
        </Content>
        <Footer />
      </AntLayout>
    </Router>
  );
}

export default App;
