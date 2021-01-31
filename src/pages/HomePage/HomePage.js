import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Typography } from 'antd';
import CourseCard from '../../components/CourseCard';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  selectCourseList,
  selectIsGettingCourse,
  getCourseList,
  setCourseList,
} from '../../redux/reducers/courseReducer';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import carousel_1 from '../../img/carousel_1.jpg';
import carousel_2 from '../../img/carousel_2.jpg';
import carousel_3 from '../../img/carousel_3.jpg';

const PageWrapper = styled.div``;
const Intro = styled.div`
  color: ${(props) => props.theme.colors.primary.main};
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 12px;
`;

const CoursesWrapper = styled.div`
  padding: 0px 24px;
`;
const TitleLatestCourse = styled.div`
  color: ${(props) => props.theme.colors.primary.main};
  font-size: 28px;
  font-weight: bold;
  text-align: left;
  padding: 12px;
`

export default function CourseListPage() {
  const dispatch = useDispatch();
  const courseList = useSelector(selectCourseList);
  const isGettingCourseList = useSelector(selectIsGettingCourse);

  // component mount 時執行(初始化)
  useEffect(() => {
    // 取得最新上架課程
    dispatch(
      getCourseList({
        page: 1,
        limit: 8,
        order: 'DESC',
      })
    );
    // unmount 時先 clean up 避免下次回來時因為仍有舊資料而短暫顯示
    return () => {
      dispatch(setCourseList([]));
    };
  }, [dispatch]);

  return (
    <>
      <PageWrapper>
        <Intro>
          <div>不受時間與空間限制，自由享受學習與教學</div>
        </Intro>
        {/* Carousel */}
        <Carousel
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          infiniteLoop={true}
        >
          <div>
            <img src={carousel_1} alt="img" />
          </div>
          <div>
            <img src={carousel_2} alt="img" />
          </div>
          <div>
            <img src={carousel_3} alt="img" />
          </div>
        </Carousel>
        {isGettingCourseList && <Loading />}
        {!isGettingCourseList && courseList.length === 0 ? (
          <Intro>查無課程</Intro>
        ) : (
          <CoursesWrapper>
            <TitleLatestCourse>最新上架課程</TitleLatestCourse>
            <Row gutter={[{ xs: 16, sm: 20, md: 24, lg: 32 }, 36]}>
              {courseList
                .filter((course) => course.isPublic)
                .map((course) => (
                  <Col key={course.id} xs={12} md={8} lg={6}>
                    <CourseCard course={course} />
                  </Col>
                ))}
            </Row>
          </CoursesWrapper>
        )}
      </PageWrapper>
    </>
  );
}
