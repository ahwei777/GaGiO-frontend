import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import CourseCard from '../../components/CourseCard';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCourseList,
  selectIsGettingCourse,
  getCourseList,
  setCourseList
} from '../../redux/reducers/courseReducer';

const PageWrapper = styled.div`
  padding: ${(props) => props.padding}px;
`;

export default function CourseListPage({ padding }) {
  const dispatch = useDispatch();
  const courseList = useSelector(selectCourseList);
  const isGettingCourseList = useSelector(selectIsGettingCourse);

  // component mount 時執行(初始化)
  useEffect(() => {
    dispatch(getCourseList());
    // unmount 時先 clean up 避免下次回來時因為仍有舊資料而短暫顯示
    return () => {dispatch(setCourseList([]));};
  }, [dispatch]);

  return (
    <>
      <PageWrapper padding={padding}>
        {isGettingCourseList && <Loading />}
        {!isGettingCourseList && courseList.length > 0 && (
          <Row gutter={[{ xs: 16, sm: 20, md: 24, lg: 32 }, 36]}>
            {courseList.filter((course) => course.isPublic).map((course) => (
              <Col key={course.id} xs={12} md={8} lg={6}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
        )}
      </PageWrapper>
    </>
  );
}
