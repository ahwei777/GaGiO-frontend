import React from "react";
import MePageRoutes from "../../containers/MePageRoutes";
import styled from "styled-components";
import { Layout, Menu, Breadcrumb, Button } from 'antd';

const { Sider } = Layout;
const MeLayout = styled(Layout)`
  max-width: 1000px;
  margin: 10px auto;
  background-color: #ffffff;
`;

export default function MePage() {
  return (
    <MeLayout>
      <MePageRoutes />
    </MeLayout>
  );
}
