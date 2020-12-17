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

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a>Edit</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    id: 1,
    name: "從零開始學習 HTML",
    updatedAt: "2020-12-16",
  },
  {
    key: "2",
    id: 2,
    name: "從零開始學習 CSS",
    updatedAt: "2020-12-16",
  },
  {
    key: "3",
    id: 3,
    name: "從零開始學習 JavaScript",
    updatedAt: "2020-12-16",
  },
  {
    key: "4",
    id: 4,
    name: "從零開始學習 JavaScript",
    updatedAt: "2020-12-16",
  },
  {
    key: "5",
    id: 5,
    name: "從零開始學習 JavaScript",
    updatedAt: "2020-12-16",
  },
  {
    key: "6",
    id: 6,
    name: "從零開始學習 JavaScript",
    updatedAt: "2020-12-16",
  },
  {
    key: "7",
    id: 7,
    name: "從零開始學習 JavaScript",
    updatedAt: "2020-12-16",
  },
  {
    key: "8",
    id: 8,
    name: "從零開始學習 JavaScript",
    updatedAt: "2020-12-16",
  },
];

const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TableContainer = styled(Content)`
  padding: 24px;
  background-color: ${(props) => props.theme.colors.white};
`;

export default function CourseManagement() {
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
