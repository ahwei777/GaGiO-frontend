import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Breadcrumb, Button, Table, Tag, Space } from "antd";
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_MOBILE_L,
  MEDIA_QUERY_TABLET,
} from "../../constants/breakpoint";
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

export default function CourseManagementPage() {
  const dispatch = useDispatch();

  return (
    <>
      <InfoHeader>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>課程列表</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary">新增課程</Button>
      </InfoHeader>
      <TableContainer>
        <Table columns={columns} dataSource={data} />
      </TableContainer>
    </>
  );
}
