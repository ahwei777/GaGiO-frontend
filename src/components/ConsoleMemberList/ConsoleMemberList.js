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
    title: "信箱",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "會員身份",
    dataIndex: "auth",
    key: "auth",
  },
  {
    title: "最近一次上線於",
    dataIndex: "latestLogin",
    key: "latestLogin",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a>more</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    id: 1,
    email: "abc123@gmail.com",
    auth: "一般",
    latestLogin: "2020-12-11",
  },
  {
    key: "2",
    id: 2,
    email: "a1239999@gmail.com",
    auth: "管理員",
    latestLogin: "2020-12-16",
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

export default function ConsoleMemberList() {
  const dispatch = useDispatch();

  return (
    <>
      <InfoHeader>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>會員列表</Breadcrumb.Item>
        </Breadcrumb>
      </InfoHeader>
      <TableContainer>
        <Table columns={columns} dataSource={data} />
      </TableContainer>
    </>
  );
}
