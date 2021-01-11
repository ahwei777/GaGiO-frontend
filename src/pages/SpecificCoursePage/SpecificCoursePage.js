import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUnitListByCourse,
  updateLocalUnitList,
  updateUnitList,
  selectUnit,
  selectUnitList,
  selectCourse,
  selectIsLoading,
} from "../../redux/reducers/unitReducer";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { Layout, Breadcrumb, Button, Typography, Divider, Space } from "antd";
import {
  MEDIA_QUERY_MOBILE_M,
  MEDIA_QUERY_MOBILE_L,
  MEDIA_QUERY_TABLET,
} from "../../constants/breakpoint";
import CourseUnitsList from "../../components/CourseUnitsList";
import Loading from "../../components/Loading";
const { Content } = Layout;
const { Title, Text } = Typography;

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
  const history = useHistory();
  const course = useSelector(selectCourse);
  const unitList = useSelector(selectUnitList);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getUnitListByCourse(id));
    console.log(course);

    return () => {};
  }, [dispatch, id]);

  function handleOnDragEnd(result) {
    if (!result) return;

    if (result.destination.index === result.source.index) {
      return;
    }

    const units = reorder(
      unitList,
      result.source.index,
      result.destination.index
    );

    dispatch(updateLocalUnitList(units));
  }

  const handleAddUnit = () => {
    const unitId = nanoid();
    console.log(unitId);
    const unit = { id: unitId, title: "新課程" };

    dispatch(updateLocalUnitList([...unitList, unit]));
  };

  const handleDelete = (id) => {
    const newUnitList = unitList.filter((item) => item.id !== id);
    dispatch(updateLocalUnitList(newUnitList));
  };

  const handleSaveUnitList = () => {
    dispatch(updateUnitList(id, unitList));
  };

  const handleClickEditCourseButton = () => {
    dispatch(updateUnitList(id, unitList)); // 先 save 當前 unit list
    history.push(`/console/courses/${id}/course-setting`); // 把頁面導向單元編輯頁
  };

  const handleClickEditUnitButton = (unitId) => {
    dispatch(updateUnitList(id, unitList)); // 先 save 當前 unit list
    history.push(`/console/courses/${id}/unit/${unitId}`); // 把頁面導向單元編輯頁
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && course && (
        <>
          <InfoHeader>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <Link to="/console/courses">課程列表</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>課程管理({course.title})</Breadcrumb.Item>
            </Breadcrumb>
            <Space size="middle">
              <div>
                <Text>目前課程狀態：</Text>
                <Text mark>{course.isPublic ? "已公開" : "未公開"}</Text>
              </div>
              <Button type="primary" onClick={handleSaveUnitList}>
                儲存變更
              </Button>
              <Button type="primary" onClick={handleClickEditCourseButton}>
                課程設定
              </Button>
            </Space>
          </InfoHeader>
          <CourseContent>
            <>
              <Title>{course.title}</Title>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="courseContent">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <CourseUnitsList
                        unitList={unitList}
                        placeholder={provided.placeholder}
                        handleAddUnit={handleAddUnit}
                        handleDelete={handleDelete}
                        handleClickEditUnitButton={handleClickEditUnitButton}
                      />
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </>
          </CourseContent>
        </>
      )}
    </>
  );
}
