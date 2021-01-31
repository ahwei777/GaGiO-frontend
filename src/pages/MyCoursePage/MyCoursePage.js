import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import CourseCard from '../../components/CourseCard';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectIsGettingCourse,
  selectMyCourseList,
  getMyCourseList,
  setMyCourseList,
} from '../../redux/reducers/courseReducer';

const PageWrapper = styled.div`
  padding: ${(props) => props.padding}px;
`;

export default function MyCourseListPage({ padding }) {
  const myCourseList = useSelector(selectMyCourseList);
  const isGettingCourse = useSelector(selectIsGettingCourse);
  const dispatch = useDispatch();
  // component mount 時執行(初始化)
  useEffect(() => {
    dispatch(getMyCourseList());
    // unmount 時先 clean up 避免下次回來時因為仍有舊資料而短暫顯示
    return () => {
      dispatch(setMyCourseList(null));
    };
  }, [dispatch]);

  return (
    <PageWrapper padding={padding}>
      {isGettingCourse && <Loading />}
      {!isGettingCourse && (
        <>
          {!myCourseList && (
            <center>
              <h1>我的課程是空的，看看課程？</h1>
              <h1>
                <Link to="/">探索課程</Link>
              </h1>
            </center>
          )}
          {myCourseList && myCourseList.length > 0 && (
            <Row gutter={[{ xs: 16, sm: 20, md: 24, lg: 32 }, 36]}>
              {myCourseList.map((course) => (
                <Col key={course.id} xs={12} md={8} lg={6}>
                  <CourseCard course={course} isBought={true}/>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </PageWrapper>
  );
}
