import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Breadcrumb, Button } from "antd";
import MyTeachCourseTable from "./MyTeachCourseTable";

const PageWrapper = styled.div`
  padding: 24px;
`;
const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export default function MyTeachCoursePage() {
  return (
    <PageWrapper>
      <InfoHeader>
        <Breadcrumb>
          <Breadcrumb.Item>課程列表</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary">
          <Link to="/teacher/courses/new">新增課程</Link>
        </Button>
      </InfoHeader>
        <MyTeachCourseTable />
    </PageWrapper>
  );
}
