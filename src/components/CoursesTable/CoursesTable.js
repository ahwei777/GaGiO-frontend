import React from "react";
import { Link } from "react-router-dom";
import { Space, Table } from "antd";
import { dummyData as data } from "./dummyData";

export const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "課程名稱",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "更新於",
    dataIndex: "updatedAt",
    key: "updatedAt",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Link to={`/console/courses/${record.id}`}>編輯</Link>
      </Space>
    ),
  },
];

export default function CoursesTable() {
  return <Table columns={columns} dataSource={data} />;
}
