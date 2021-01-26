import React from "react";
import styled from "styled-components";
import { Layout, Breadcrumb } from "antd";
import MembersTable from "./MembersTable.js";

const { Content } = Layout;
const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TableContainer = styled(Content)`
  background-color: ${(props) => props.theme.colors.white};
`;

export default function ConsoleMembersPage() {
  return (
    <>
      <InfoHeader>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>會員列表</Breadcrumb.Item>
        </Breadcrumb>
      </InfoHeader>
      <TableContainer>
        <MembersTable />
      </TableContainer>
    </>
  );
}
