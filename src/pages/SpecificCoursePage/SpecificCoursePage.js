import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { nanoid } from "nanoid";
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

export default function SpecificCoursePage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [courseContent, setCourseContent] = useState(dummyData);

  function handleOnDragEnd(result) {
    if (!result) return;

    if (result.destination.index === result.source.index) {
      return;
    }

    const units = reorder(
      courseContent,
      result.source.index,
      result.destination.index
    );

    setCourseContent(units);
  }

  const handleOnClick = (e) => {
    const unitId = nanoid();
    const unit = { id: unitId, unitTitle: "新課程" };
    setCourseContent([...courseContent, unit]);
  };

  const handleDelete = (id) => {
    const newCourseContent = courseContent.filter((item) => item.id !== id);
    setCourseContent(newCourseContent);
  };

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
          <Button type="primary">儲存變更</Button>
          <Link to={`/console/courses/${id}/course-setting`}>
            <Button type="primary">課程設定</Button>
          </Link>
        </Space>
      </InfoHeader>
      <CourseContent>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="courseContent">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <CourseUnitsList
                  content={courseContent}
                  placeholder={provided.placeholder}
                  handleOnClick={handleOnClick}
                  handleDelete={handleDelete}
                />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CourseContent>
    </>
  );
}
