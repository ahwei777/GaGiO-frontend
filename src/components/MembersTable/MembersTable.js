import React from "react";
import { Space, Table } from "antd";
import { dummyData as data } from "./dummyData";

export const columns = [
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

export default function MembersTable() {
  return <Table columns={columns} dataSource={data} />;
}
