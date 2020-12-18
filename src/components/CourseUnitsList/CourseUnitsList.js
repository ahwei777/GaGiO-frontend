import React from "react";
import styled from "styled-components";
import { Button, List, Typography, Space, Tooltip } from "antd";
import {
  MenuOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { dummyData } from "./dummyData";

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  ${"" /* background-color: ${(props) => props.theme.colors.secondary.dark}; */}
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  ${"" /* background-color: ${(props) => props.theme.colors.secondary.dark}; */}
`;

const SectionText = styled.span`
  font-size: 24px;
  line-height: 32px;
`;

const UnitText = styled.span`
  font-size: 16px;
  line-height: 24px;
`;

export default function CourseUnitsList() {
  return (
    <List
      size="large"
      header={
        <ListHeader>
          <Space align="center" size={10}>
            <Tooltip title="拖拉">
              <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />
            </Tooltip>
            <SectionText>新章節</SectionText>
          </Space>
          <Space>
            <Tooltip title="編輯">
              <Button icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip title="刪除">
              <Button icon={<DeleteOutlined />} />
            </Tooltip>
          </Space>
        </ListHeader>
      }
      footer={
        <Space
          align="center"
          size={10}
          style={{ cursor: "pointer" }}
          onClick={() => console.log("click")}
        >
          <PlusOutlined />
          <UnitText>新增課程</UnitText>
        </Space>
      }
      bordered
      dataSource={dummyData}
      renderItem={(item) => (
        <List.Item>
          <Space align="center" size={10}>
            <Tooltip title="拖拉">
              <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />
            </Tooltip>
            <UnitText>{item}</UnitText>
          </Space>
          <Space>
            <Tooltip title="編輯">
              <Button icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip title="刪除">
              <Button icon={<DeleteOutlined />} />
            </Tooltip>
          </Space>
        </List.Item>
      )}
    />
  );
}
