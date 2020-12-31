import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCourse } from "../../redux/reducers/courseReducer";
import styled from "styled-components";
import { Layout, Breadcrumb, Button, Table, Tag, Space } from "antd";
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_MOBILE_L,
  MEDIA_QUERY_TABLET,
} from "../../constants/breakpoint";
import CourseSettingForm from "../../components/CourseSettingForm";
const { Content } = Layout;

const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormContainer = styled(Content)`
  padding: 24px;
  background-color: ${(props) => props.theme.colors.white};
`;

export default function NewCoursePage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(addCourse(values));
    history.push("/console/courses"); // 把頁面導向課程列表
  };

  return (
    <>
      <InfoHeader>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/console/courses">課程列表</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>新增課程</Breadcrumb.Item>
        </Breadcrumb>
      </InfoHeader>
      <FormContainer>
        <CourseSettingForm onFinish={onFinish} />
      </FormContainer>
    </>
  );
}
