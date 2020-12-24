import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  Layout,
  Breadcrumb,
  Button,
  Table,
  Tag,
  Space,
  Typography,
} from "antd";
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_MOBILE_L,
  MEDIA_QUERY_TABLET,
} from "../../constants/breakpoint";
import UnitForm from "./UnitForm";
const { Content } = Layout;
const { Text } = Typography;

const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormContainer = styled(Content)`
  ${"" /* display: flex; */}
  ${"" /* justify-content: center; */}

  padding: 24px;
  background-color: ${(props) => props.theme.colors.white};
`;

const id = 1;

export default function EditUnitPage() {
  const dispatch = useDispatch();

  return (
    <>
      <InfoHeader>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/console/courses">課程列表</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/console/courses/${id}`}>課程管理</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>編輯單元</Breadcrumb.Item>
        </Breadcrumb>
      </InfoHeader>
      <FormContainer>
        <UnitForm />
      </FormContainer>
    </>
  );
}
