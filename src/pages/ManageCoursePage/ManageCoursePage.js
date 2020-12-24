import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Layout, Breadcrumb, Button, Typography, Divider, Space } from "antd";
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_MOBILE_L,
  MEDIA_QUERY_TABLET,
} from "../../constants/breakpoint";
import CourseUnitsList from "../../components/CourseUnitsList";
import { dummyData } from "../../components/CourseUnitsList/dummyData";
const { Content } = Layout;
const { Title } = Typography;

const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CourseContent = styled(Content)`
  padding: 24px;
  background-color: ${(props) => props.theme.colors.white};
`;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const id = 1;

export default function ManageCoursePage() {
  const dispatch = useDispatch();

  const [courseContent, setCourseContent] = useState(dummyData);
  // function handleOnDragEnd(result) {
  //   console.log(result);
  //   if (!result) return;

  //   if (
  //     destination.droppableId === SourceBuffer.droppableId &&
  //     destination.index === SourceBuffer.index
  //   ) {
  //     return;
  //   }

  // const column = courseContent[SourceBuffer.droppableId];

  // const items = Array.from(courseContent);
  // const [reorderedItem] = items.splice(result.source.index, 1);
  // items.splice(result.destination.index, 0, reorderedItem);

  // setCourseContent(items);
  // }

  return (
    <>
      <InfoHeader>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/console/courses">課程列表</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>課程管理</Breadcrumb.Item>
        </Breadcrumb>
        <Space>
          <Button type="primary">新增章節</Button>
          <Link to={`/console/courses/${id}/course-setting`}>
            <Button type="primary">課程設定</Button>
          </Link>
        </Space>
      </InfoHeader>
      <DragDropContext>
        <Droppable droppableId="courseSections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <CourseContent>
                {courseContent.map((section) => (
                  <CourseUnitsList section={section} provided={provided} />
                ))}
              </CourseContent>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
