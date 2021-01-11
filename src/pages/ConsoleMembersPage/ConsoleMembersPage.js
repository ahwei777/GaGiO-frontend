import React from "react";
import styled from "styled-components";
import { Layout, Breadcrumb, Button, Table, Tag, Space } from "antd";
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_MOBILE_L,
  MEDIA_QUERY_TABLET,
} from "../../constants/breakpoint";
import MembersTable from "../../components/MembersTable";
const { Content } = Layout;

const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TableContainer = styled(Content)`
  padding: 24px;
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
