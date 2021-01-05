import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import CourseCard from '../../components/CourseCard';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../../redux/reducers/userReducer';
import {
  selectIsGettingMyCourseList,
  selectMyCourseList,
  getMyCourseList,
  setMyCourseList,
} from '../../redux/reducers/courseReducer';

const PageWrapper = styled.div`
  padding: ${(props) => props.padding}px;
`;

export default function MyCourseListPage({ padding }) {
  const user = useSelector(selectUser);
  const myCourseList = useSelector(selectMyCourseList);
  const isGettingMyCourseList = useSelector(selectIsGettingMyCourseList);
  console.log('user', user);
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
    <>
      <PageWrapper padding={padding}>
        {!user && (
          <center>
            <h1>請先註冊或登入</h1>
            <h1>
              <Link to="/login">登入</Link>
              <br />
              <Link to="/register">註冊</Link>
            </h1>
          </center>
        )}
        {user && (
          <>
            {isGettingMyCourseList && <Loading />}
            {!isGettingMyCourseList && myCourseList && (
              <>
                {myCourseList.length === 0 && (
                  <center>
                    <h1>我的課程是空的，看看課程？</h1>
                    <h1>
                      <Link to="/">探索課程</Link>
                    </h1>
                  </center>
                )}
                {myCourseList.length > 0 && (
                  <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                    {myCourseList.map((el) => (
                      <Col key={el.Course.id} xs={12} md={8}>
                        <CourseCard course={el.Course} />
                      </Col>
                    ))}
                  </Row>
                )}
              </>
            )}
          </>
        )}
      </PageWrapper>
    </>
  );
}
