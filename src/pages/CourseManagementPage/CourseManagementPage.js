import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Breadcrumb, Button, Typography, Divider, Space } from "antd";
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_MOBILE_L,
  MEDIA_QUERY_TABLET,
} from "../../constants/breakpoint";
import CourseUnitsList from "../../components/CourseUnitsList";
const { Content } = Layout;
const { Title } = Typography;

const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CourseUnits = styled(Content)`
  padding: 24px;
  background-color: ${(props) => props.theme.colors.white};
`;

const ListContainer = styled.div`
  margin-bottom: 24px;
`;

export default function CourseManagementPage() {
  const dispatch = useDispatch();

  return (
    <>
      <InfoHeader>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/console/courses">課程列表</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>課程名稱</Breadcrumb.Item>
        </Breadcrumb>
        <Space>
          <Button type="primary">新增章節</Button>
          <Button type="primary">課程設定</Button>
        </Space>
      </InfoHeader>
      <CourseUnits>
        <ListContainer>
          <CourseUnitsList />
        </ListContainer>
      </CourseUnits>
    </>
  );
}
