import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Button, List, Typography, Space, Tooltip } from "antd";
import {
  MenuOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
// import { dummyData } from "./dummyData";

const ListContainer = styled.div`
  margin-bottom: 24px;
`;

const ListContent = styled(List.Item)`
  display: flex;
  justify-content: space-between;
`;

const ListHeader = styled(List.Item)`
  background-color: ${(props) => props.theme.colors.secondary.dark};
`;

const ListFooter = styled(List.Item)`
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

const id = 1;
const unitId = 1;

function Section({ sectionName }) {
  return (
    <ListHeader>
      <Space align="center" size={10}>
        <Tooltip title="拖拉">
          <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />
        </Tooltip>
        <SectionText>{sectionName}</SectionText>
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
  );
}

function Unit({ item, index }) {
  return (
    <ListContent>
      <Space align="center" size={10}>
        <Tooltip title="拖拉">
          <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />
        </Tooltip>
        <UnitText>{item.text}</UnitText>
      </Space>
      <Space>
        <Tooltip title="編輯">
          <Link to={`/console/courses/${id}/unit/${unitId}`}>
            <Button icon={<EditOutlined />}></Button>
          </Link>
        </Tooltip>
        <Tooltip title="刪除">
          <Button icon={<DeleteOutlined />} />
        </Tooltip>
      </Space>
    </ListContent>
  );
}

function NewUnitButton() {
  return (
    <ListFooter>
      <Space
        align="center"
        size={10}
        style={{ cursor: "pointer" }}
        onClick={() => console.log("click")}
      >
        <PlusOutlined />
        <UnitText>新增課程</UnitText>
      </Space>
    </ListFooter>
  );
}

export default function CourseUnitsList({ section, provided }) {
  const { sectionName, units } = section;

  return (
    <ListContainer>
      <List size="large" bordered>
        <Section sectionName={sectionName} />
        {units.map((item, index) => (
          <Draggable key={item.id} draggableId={item.text} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Unit item={item} index={index} />
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
        <NewUnitButton />
      </List>
    </ListContainer>
  );
}
