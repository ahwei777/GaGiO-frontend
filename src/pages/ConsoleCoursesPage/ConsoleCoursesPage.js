import React from "react";
import styled from "styled-components";
import { Layout, Breadcrumb } from "antd";
import CoursesTable from "./CoursesTable.js";

const { Content } = Layout;
const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function ConsoleCoursesPage() {
  return (
    <>
      <InfoHeader>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>課程列表</Breadcrumb.Item>
        </Breadcrumb>
      </InfoHeader>
      <Content>
        <CoursesTable />
      </Content>
    </>
  );
}
