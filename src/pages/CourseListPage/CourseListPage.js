import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Select, Typography } from 'antd';
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

const { Title } = Typography;
const { Option } = Select;
const PageWrapper = styled.div`
  padding: ${(props) => props.padding}px;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
const SearchInfo = styled.div`
  font-size: 20px;
`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function CourseListPage({ padding }) {
  const dispatch = useDispatch();
  const query = useQuery();
  const keyword = query.get('keyword') || '';
  const courseList = useSelector(selectCourseList);
  const isGettingCourseList = useSelector(selectIsGettingCourse);
  const [selected, setSelected] = useState('latest')

  // component mount 時執行(初始化)
  useEffect(() => {
    dispatch(getCourseList({ keyword, order: 'DESC' }));
    // unmount 時先 clean up 避免下次回來時因為仍有舊資料而短暫顯示
    return () => {
      setSelected('latest')
      dispatch(setCourseList([]));
    };
  }, [dispatch, keyword]);

  const handleSelectChange = (value) => {
    if (isGettingCourseList) return;
    setSelected(value)
    switch (value) {
      case 'latest':
        return dispatch(getCourseList({ keyword, sort: 'id', order: 'DESC' }));
      case 'highPrice':
        return dispatch(
          getCourseList({ keyword, sort: 'price', order: 'DESC' })
        );
      case 'lowPrice':
        return dispatch(
          getCourseList({ keyword, sort: 'price', order: 'ASC' })
        );
      default:
        return;
    }
  };

  return (
    <>
      <PageWrapper padding={padding}>
        <SearchWrapper>
          <SearchInfo>
            {keyword && <span>關鍵字:<strong>「{keyword}」, </strong></span>}
            <span>共有 {courseList.length} 堂課程</span>
          </SearchInfo>
          <div>
            排序方式：
            <Select
              value={selected}
              style={{ width: 180 }}
              onChange={handleSelectChange}
            >
              <Option value="latest">最新上架(預設)</Option>
              <Option value="highPrice">價格高 → 低</Option>
              <Option value="lowPrice">價格低 → 高</Option>
            </Select>
          </div>
        </SearchWrapper>
        {isGettingCourseList && <Loading />}
        {!isGettingCourseList && courseList.length === 0 ? (
          <Title level={3}>
            <center>查無課程</center>
          </Title>
        ) : (
          <Row gutter={[{ xs: 16, sm: 20, md: 24, lg: 32 }, 36]}>
            {courseList
              .filter((course) => course.isPublic)
              .map((course) => (
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
