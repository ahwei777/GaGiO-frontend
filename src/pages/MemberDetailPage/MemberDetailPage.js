import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  Layout,
  Breadcrumb,
  Button,
  Typography,
  Divider,
  Space,
  Table,
  Tag,
  Descriptions,
} from "antd";
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_MOBILE_L,
  MEDIA_QUERY_TABLET,
} from "../../constants/breakpoint";
const { Content } = Layout;
const { Title } = Typography;

const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MemberContent = styled(Content)`
  padding: 24px;
  background-color: ${(props) => props.theme.colors.white};
`;

const columns = [
  {
    title: "課程 ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "課程名稱",
    key: "name",
    dataIndex: "name",
  },
];

const data = [
  {
    key: "1",
    id: "a192rrc",
    name: "一週上手 HTML/CSS",
  },
  {
    key: "2",
    id: "a192rrc",
    name: "一週上手 HTML/CSS",
  },
];

export default function MemberDetailPage() {
  const dispatch = useDispatch();

  return (
    <>
      <InfoHeader>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/console/members">會員列表</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>會員資料</Breadcrumb.Item>
        </Breadcrumb>
      </InfoHeader>
      <MemberContent>
        <Descriptions title="會員資料" bordered>
          <Descriptions.Item label="會員暱稱">AAA</Descriptions.Item>
          <Descriptions.Item label="會員信箱" span={2}>
            cc@gmail.com
          </Descriptions.Item>
          <Descriptions.Item label="註冊時間">
            2018-04-24 18:00:00
          </Descriptions.Item>
          <Descriptions.Item label="最近一次登入時間" span={2}>
            2018-04-24 18:00:00
          </Descriptions.Item>
          <Descriptions.Item label="目前身份" span={3}>
            會員
          </Descriptions.Item>
          <Descriptions.Item label="購買課程清單" span={3}>
            <Table columns={columns} dataSource={data} />
          </Descriptions.Item>
        </Descriptions>
      </MemberContent>
    </>
  );
}
