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

const ListContainer = styled.div`
  margin-bottom: 24px;
`;

const ListContent = styled(List.Item)`
  display: flex;
  justify-content: space-between;
`;

const ListFooter = styled(List.Item)`
  background-color: ${(props) => props.theme.colors.secondary.dark};
`;

const UnitText = styled.span`
  font-size: 16px;
  line-height: 24px;
`;

const id = 1;

function Unit({ item, dragHandleProps, handleDelete }) {
  return (
    <ListContent>
      <Space align="center" size={10}>
        <Tooltip title="拖拉">
          <MenuOutlined style={{ color: "#999" }} {...dragHandleProps} />
        </Tooltip>
        <UnitText>{item.unitTitle}</UnitText>
      </Space>
      <Space>
        <Tooltip title="編輯">
          <Link to={`/console/courses/${id}/unit/${item.id}`}>
            <Button icon={<EditOutlined />}></Button>
          </Link>
        </Tooltip>
        <Tooltip title="刪除">
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(item.id)}
          />
        </Tooltip>
      </Space>
    </ListContent>
  );
}

export default function CourseUnitsList({
  content,
  placeholder,
  handleOnClick,
  handleDelete,
}) {
  return (
    <ListContainer>
      <List size="large" bordered>
        {content.map((item, index) => (
          <Draggable key={item.id} draggableId={`id: ${item.id}`} index={index}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.draggableProps}>
                <Unit
                  item={item}
                  dragHandleProps={provided.dragHandleProps}
                  handleDelete={handleDelete}
                />
              </div>
            )}
          </Draggable>
        ))}
        {placeholder}
        <ListFooter>
          <Space
            align="center"
            size={10}
            style={{ cursor: "pointer" }}
            onClick={handleOnClick}
          >
            <PlusOutlined />
            <UnitText>新增課程</UnitText>
          </Space>
        </ListFooter>
      </List>
    </ListContainer>
  );
}
