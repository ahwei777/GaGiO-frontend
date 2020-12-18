import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Layout, Breadcrumb, Button, Tag } from "antd";
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_MOBILE_L,
  MEDIA_QUERY_TABLET,
} from "../../constants/breakpoint";
import CoursesTable from "../../components/CoursesTable";
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

export default function ConsoleCoursesPage() {
  const dispatch = useDispatch();

  return (
    <>
      <InfoHeader>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>課程列表</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary">
          <Link to="/console/courses/new-course">新增課程</Link>
        </Button>
      </InfoHeader>
      <TableContainer>
        <CoursesTable />
      </TableContainer>
    </>
  );
}
