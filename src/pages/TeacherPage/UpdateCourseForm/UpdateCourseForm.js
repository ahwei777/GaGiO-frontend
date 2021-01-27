import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsGettingCourse,
  getDetailCourse,
  setDetailCourse,
  updateCourse,
  selectDetailCourse,
} from '../../../redux/reducers/courseReducer';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Layout, Breadcrumb, Button, message } from 'antd';
import CourseUnitsList from '../../../components/CourseUnitsList';
import CourseSettingForm from '../../../components/CourseSettingForm';
import Loading from '../../../components/Loading';
const { Content } = Layout;

const PageWrapper = styled.div`
  padding: 24px;
  text-align: center;
`;
const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CourseContent = styled(Content)`
  padding: 24px;
  background-color: ${(props) => props.theme.colors.white};
`;
const ButtonWrapper = styled.div`
  margin: 18px auto;
  text-align: center;
`;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export default function UpdateCoursePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isGettingCourse = useSelector(selectIsGettingCourse);
  const history = useHistory();
  const course = useSelector(selectDetailCourse);
  //console.log('course detail', course);
  const ChildRef = useRef();

  useEffect(() => {
    dispatch(getDetailCourse(id));
    return () => {
      dispatch(setDetailCourse(null));
    };
  }, [dispatch, id]);

  function handleOnDragEnd(result) {
    // 無動作或是目的地=原本位置 > 返回
    if (!result || result.destination.index === result.source.index) return;
    const reorderedUnitList = reorder(
      course.unit_list,
      result.source.index,
      result.destination.index
    );
    dispatch(setDetailCourse({ ...course, unit_list: reorderedUnitList }));
  }

  const handleAddUnit = () => {
    const oldUnitList = course.unit_list;
    const lastUnitId =
      oldUnitList.length > 0
        ? Number(oldUnitList[oldUnitList.length - 1].id)
        : 0;
    const unitId = lastUnitId + 1;
    const unit = { id: unitId, title: '新課程' };
    // 更新當前資料
    dispatch(
      setDetailCourse({ ...course, unit_list: [...course.unit_list, unit] })
    );
  };

  const handleDeleteUnit = (id) => {
    const newUnitList = course.unit_list.filter((item) => item.id !== id);
    // 更新當前資料
    dispatch(setDetailCourse({ ...course, unit_list: newUnitList }));
  };

  const getFormValue = async () => {
    const value = await ChildRef.current
      .getFieldsValue()
      .then((values) => values)
      .catch((error) => console.log(error));
    if (!value) return;
    value.isPublic = value.isPublic === '公開' ? true : false;
    value.unit_list = course.unit_list;
    value.imgUrl = value.upload;
    //console.log('getFormValue', value);
    return value;
  };

  const handleClickSave = async () => {
    const value = await getFormValue();
    // 沒變化時就不 call API
    if (!value) return;
    // courseId
    dispatch(updateCourse(id, value)).then((json) => {
      // 把頁面導向單元編輯頁
      if (json.ok === 1) {
        message.success('更新課程成功', 5)
        return history.push(`/teacher/courses/`);
      }
      return message.error(json.errorMessage, 5)
    });
  };

  const handleClickEditUnitButton = async (unitId) => {
    const value = await getFormValue();
    if (!value) return;
    // courseId
    dispatch(updateCourse(id, value)).then((json) => {
      // 把頁面導向單元編輯頁
      if (json.ok === 1) {
        message.success('更新課程成功', 5)
        return history.push(`/teacher/courses/${id}/unit/${unitId}`);
      }
      return message.error(json.errorMessage, 5)
    });
  };

  return (
    <>
      {isGettingCourse && <Loading />}
      {!isGettingCourse && course && (
        <PageWrapper>
          <InfoHeader>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>
                <Link to="/teacher/courses">課程列表</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>課程管理({course.title})</Breadcrumb.Item>
            </Breadcrumb>
          </InfoHeader>
          <CourseContent>
            {/* 課程資訊 */}
            <CourseSettingForm ref={ChildRef} course={course} />
            {/* dnd */}
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="courseContent">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <CourseUnitsList
                      unitList={course.unit_list}
                      placeholder={provided.placeholder}
                      handleAddUnit={handleAddUnit}
                      handleDeleteUnit={handleDeleteUnit}
                      handleClickEditUnitButton={handleClickEditUnitButton}
                    />
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </CourseContent>
          <ButtonWrapper>
            <Button type="primary" size="large" onClick={handleClickSave}>
              儲存變更
            </Button>
          </ButtonWrapper>
        </PageWrapper>
      )}
    </>
  );
}
