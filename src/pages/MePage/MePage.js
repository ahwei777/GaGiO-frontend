import React from "react";
import MePageRoutes from "../../containers/MePageRoutes";
import styled from "styled-components";
import { Layout } from "antd";

const MeLayout = styled(Layout)`
  max-width: 1000px;
  margin: 0px auto;
  background-color: #ffffff;
`;

export default function MePage() {
  return (
    <MeLayout>
      <MePageRoutes />
    </MeLayout>
  );
}
